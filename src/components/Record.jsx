import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useForm } from "react-hook-form";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { url } from "../utils/utils";
import Pagination from "./Pagination";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    padding: "10px 30px",
    borderRadius: "6px",
    color: "#000",
    fontWeight: 700,
    fontSize: "16px",
    border: "none",
    height: "44px",
    cursor: "pointer",
  },
  input: {
    width: "100%",
    marginTop: "10px",
    marginBottom: "20px",
    height: "40px",
    border: "1px solid #eee",
    background: "transparent",
    borderRadius: "3px",
    padding: "0px 10px",
    color: "#fff",
  },
}));
function Record() {
  const classes = useStyles();
  const [studentsRecord, setStudentsRecord] = useState();
  const [filteredRecord, setfilteredRecord] = useState([]);
  const [searchValue, setSearchValue] = useState();
  const { handleSubmit, register } = useForm();
  const [page, setPage] = useState(1);
  const [numberOfpages, setNumberOfPages] = useState(0);
  const [limit, setLimit] = useState(5);
  const [count, setCount] = useState(0);
  var [numbering, setnumbering] = useState(0);
  const onSubmit = async (data) => {
    const resp = await axios.post(url + "/student", data);

    if (resp.data.msg === "New Student added!") {
      handleShowRecord();
    }
  };
  useEffect(() => {
    handleShowRecord();
  }, []);
  useEffect(() => {
    handleShowRecord();
  }, [page]);
  const handleShowRecord = async () => {
    const res = await axios.get(
      url + `/getAllStudents?page=${page}&limit=${limit}`
    );
    console.log(res);
    setCount(res.data.count);
    setNumberOfPages(res.data.numberOfPages);
    setnumbering(res.data.currentPage * limit - limit);
    setStudentsRecord(res.data.data);
  };
  const handleSearch = async () => {
    let data = [];
    studentsRecord.some((student) => {
      if (student.age === +searchValue) {
        data.push(student);
      }
    });
    setfilteredRecord(data);
  };
  return (
    <Box py={4}>
      <Container maxWidth="sm">
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <div>
            <Box
              component="label"
              fontSize={{ xs: "12px", sm: "14px" }}
              fontWeight="500"
              for="name"
            >
              Name
            </Box>
            <input
              id="name"
              type="text"
              placeholder="Enter Name"
              className={classes.input}
              required
              {...register("name")}
            />
          </div>
          <div>
            <Box
              component="label"
              fontSize={{ xs: "12px", sm: "14px" }}
              fontWeight="500"
              for="email"
            >
              Email
            </Box>
            <input
              id="email"
              className={classes.input}
              type="email"
              placeholder="Enter Email"
              required
              {...register("email")}
            />
          </div>

          <div>
            <Box
              component="label"
              fontSize={{ xs: "12px", sm: "14px" }}
              fontWeight="500"
              for="age"
            >
              Age
            </Box>
            <input
              className={classes.input}
              required
              placeholder="Enter age"
              {...register("age")}
            />
          </div>

          <div>
            <Box
              component="label"
              fontSize={{ xs: "12px", sm: "14px" }}
              fontWeight="500"
              for="contact"
              pt={3}
            >
              Contact No.
            </Box>
            <input
              id="contact"
              type="tel"
              name="contact"
              placeholder="03127654321"
              pattern="[0-9]{11}"
              className={classes.input}
              required
              {...register("contact")}
            />
          </div>
          <Box display="flex" justifyContent="center" alignItems="center">
            <input className={classes.submit} type="submit" />
          </Box>
        </form>
        <Box display="flex" my={4}>
          <input
            value={searchValue}
            type="number"
            placeholder="Search by age..."
            style={{ margin: "0px 10px 0px 0px" }}
            className={classes.input}
            id="search"
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </Box>
        {searchValue ? (
          filteredRecord?.length !== 0 ? (
            filteredRecord.map((student, index) => {
              return (
                <Box key={index} display="flex">
                  <Box width="20%" mb={2}>
                    {student.name}
                  </Box>
                  <Box width="40%" mb={2}>
                    {student.email}
                  </Box>
                  <Box width="20%" mb={2}>
                    {student.age}
                  </Box>
                  <Box width="20%" mb={2}>
                    {student.contact}
                  </Box>
                  <button
                    width="20%"
                    style={{ margin: "5px 0px" }}
                    onClick={async () => {
                      const res = await axios.post(url + "/deleteStudent", {
                        id: student._id,
                      });
                      if (res.data.msg === "deleted") {
                        handleShowRecord();
                      }
                    }}
                  >
                    delete
                  </button>
                  <button
                    width="20%"
                    style={{ margin: "5px 0px" }}
                    onClick={async () => {
                      const res = await axios.post(url + "/updateStudent", {
                        id: student._id,
                      });
                    }}
                  >
                    Update
                  </button>
                </Box>
              );
            })
          ) : (
            <Box>no record</Box>
          )
        ) : studentsRecord ? (
          studentsRecord.map((student, index) => {
            return (
              <Box key={index} display="flex">
                <Box width="20%" mb={2}>
                  {student.name}
                </Box>
                <Box width="40%" mb={2}>
                  {student.email}
                </Box>
                <Box width="20%" mb={2}>
                  {student.age}
                </Box>
                <Box width="20%" mb={2}>
                  {student.contact}
                </Box>
                <button
                  width="20%"
                  style={{ margin: "5px 0px" }}
                  onClick={async () => {
                    const res = await axios.post(url + "/deleteStudent", {
                      id: student._id,
                    });
                    if (res.data.msg === "deleted") {
                      handleShowRecord();
                    }
                  }}
                >
                  delete
                </button>
                <button
                  width="20%"
                  style={{ margin: "5px 0px" }}
                  onClick={async () => {
                    const res = await axios.post(url + "/updateStudent", {
                      id: student._id,
                    });
                  }}
                >
                  Update
                </button>
              </Box>
            );
          })
        ) : (
          <Box>no record</Box>
        )}

        <Pagination
          count={count}
          pageNumber={page}
          limit={limit}
          numberOfpages={numberOfpages}
          setPage={setPage}
          setLimit={setLimit}
        />
      </Container>
    </Box>
  );
}

export default Record;
