import React, { useState, useEffect } from "react";
import axios from "axios";
import UploadFile from "./components/UploadFile";
import Record from "./components/Record";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import SignUp from "./components/Signup";
import Login from "./components/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    let token = localStorage.getItem("token");
    if (token != null) {
      try {
        let resp = await axios.post("/checksession", { token });
        console.log(resp.data);
        setIsAuthenticated(true);
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    }
  }, []);
  return (
    <Routes>
      <Route exact path="/uploadFile" element={<UploadFile />} />
      <Route
        exact
        path="/"
        element={isAuthenticated ? <Record /> : <Navigate to="/login" />}
      />
      <Route exact path="/signup" element={<SignUp />} />
      <Route
        exact
        path="/login"
        element={<Login setIsAuthenticated={setIsAuthenticated} />}
      />
    </Routes>
  );
}

export default App;
