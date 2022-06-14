import { Box } from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { url } from "../utils/utils";

function UploadFile() {
  const [uploadedData, setUploadedData] = useState();

  const { handleSubmit, register } = useForm();
  const onSubmit = async (data) => {
    console.log(data.file[0], "data");
    data.file = data.file[0];
    let file = new FormData();
    for (let item in data) {
      file.append(item, data[item]);
    }
    console.log(file);
    let resp = await axios.post(url + "/postFile", file);
  };

  const handleShow = async () => {
    let resp = await axios.get(url + "/allFiles");
    setUploadedData(resp.data.data);
  };

  return (
    <Box my={15} textAlign="center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>upload file: </label>{" "}
        <input id="file" type="file" required {...register("file")} />
        <br />
        <button
          style={{ margin: "20px 0px", height: "40px", width: "100px" }}
          type="submit"
        >
          submit
        </button>
      </form>
      <button
        style={{ margin: "20px 0px", height: "40px", width: "100px" }}
        onClick={handleShow}
      >
        show uploaded files
      </button>
      {uploadedData
        ? uploadedData.map((file, index) => {
            console.log(file);
            return (
              <Box key={index}>
                <img src={`/${file.uploadFile}`} alt="" />
              </Box>
            );
          })
        : "no"}
    </Box>
  );
}

export default UploadFile;
