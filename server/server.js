let express = require("express");
let cors = require("cors");
let mongoose = require("mongoose");
let path = require("path");
let multer = require("multer");
let FileModal = require("./models/file");
let StudentModal = require("./models/student");
let UserModal = require("./models/user");
let config = require("./config");
let jwt = require("jsonwebtoken");
const jwt_decode = require("jwt-decode");

let myApp = express();
myApp.use(cors());
myApp.use(express.json());
myApp.use(express.urlencoded({ extended: true }));
const upload = multer({ dest: "uploads/" });
mongoose.connect(
  "mongodb+srv://Sehrish:tcf381509@cluster0.hic5z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  (err, connection) => {
    console.log(err || connection);
  }
);

//checksession
myApp.post("/checksession", async function (req, res) {
  var decoded = jwt_decode(req.body.token);
  if (decoded.id) {
    UserModal.findOne({ _id: decoded.id }, function (err, docs) {
      res.send(docs);
    });
  }
});

//signup
myApp.post("/signup", async (req, res) => {
  console.log(req.body);
  let userExist = await UserModal.findOne({
    email: req.body.email,
  });
  if (userExist) {
    res.send({
      msg: "Email Already in Use",
    });
  } else {
    const user = new UserModal({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.send({
      msg: "success",
    });
  }
});

//login
myApp.post("/login", async (req, res) => {
  let user = await UserModal.findOne({
    email: req.body.email,
    password: req.body.password,
  });
  if (user) {
    let userToken = { id: user._id };
    jwt.sign(
      userToken,
      config.secret,
      {
        expiresIn: "2d",
      },
      (err, token) => {
        console.log(token, "token");
        res.json({
          token,
          success: true,
          msg: "User Found",
          _id: user._id,
          name: user.name,
          password: user.password,
          email: user.email,
        });
      }
    );
  } else {
    res.send({
      msg: "User Not Found",
    });
  }
});

//post Files
myApp.post("/postFile", upload.single("file"), async (req, res) => {
  console.log(req.file.path, "file");
  const uploadFile = new FileModal({
    uploadFile: req.file.path,
  });
  console.log(uploadFile);
  await uploadFile.save();
  res.json({
    msg: "uploaded",
  });
});

//get  uploaded files
myApp.get("/allFiles", async (req, res) => {
  const data = await FileModal.find();
  console.log(data);
  res.send({ data: data });
});

// add student record
myApp.post("/student", async (req, res) => {
  console.log(req.body);
  let student = new StudentModal({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age,
    contact: req.body.contact,
  });
  await student.save();
  res.json({
    msg: "New Student added!",
  });
});

//get students record
myApp.get("/getAllStudents", async (req, res) => {
  try {
    const { limit, page } = req.query;
    const Limit = Number(limit);
    const startIndex = (Number(page) - 1) * limit;
    const total = await StudentModal.countDocuments();
    const students = await StudentModal.find({}).limit(Limit).skip(startIndex);
    console.log(students);
    return res.status(200).json({
      data: students,
      currentPage: page,
      numberOfPages: Math.ceil(total / Limit),
      count: total,
    });
  } catch (err) {
    console.log(err);
  }
});

//delete student record
myApp.post("/deleteStudent", async (req, res) => {
  let student = await StudentModal.findById(req.body.id);
  console.log(student, "student");

  StudentModal.findOneAndDelete({ _id: req.body.id }, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted User ", docs);
    }
  });
  res.json({
    msg: "deleted",
  });
});

myApp.post("/updateStudent", async (req, res) => {
  try {
      StudentModal.findByIdAndUpdate(
      req.body.id,
      {
        name: "name",
      },
      function (req, res) {
        console.log("Updated" + res);
      }
    );
  } catch (err) {
    console.log(err);
  }
});

myApp.use((error, req, res, next) => {
  console.error(error);
  res.status(500).json({ status: false, data: error });
});
myApp.use("/uploads", express.static("./uploads"));

myApp.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./build", "index.html"));
});

myApp.listen(process.env.PORT || 7000, function () {
  console.log("Server in Working State");
});
