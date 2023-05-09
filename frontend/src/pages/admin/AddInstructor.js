import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import axios from "axios";
import formValidation from "../../helper/formValidation";
axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AddInstructor = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    //check if all fields are not empty
    const form = document.querySelector("form");
    const error = document.getElementById("error");
    if (formValidation(form)) {
      error.innerHTML = formValidation(form);
      return;
    } else error.innerHTML = "";
    //check about the user information
    try {
      await axios
        .post("/admin/add/instructor", { firstName, lastName, username, email, password })
        .then((res) => {
          if (res.data.msg === "User added") {
            document.getElementById("form").reset();
          } else if (res.data.msg === "Username is Taken")
            error.innerHTML = `${res.data.msg}`;
          else if (res.data.msg === "Email is Taken")
            error.innerHTML = `${res.data.msg}`;
          else error.innerHTML = "Error"; //                                                      <---redirect to a check connection page
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <p id="error" style={{ color: "red" }}></p>
      <form method="POST" id="form" onSubmit={submit}>
        <div>
          <label htmlFor="firstnameField">First Name : </label>
          <input
            type="text"
            id="firstNameField"
            name="firstName"
            onChange={(e) => setFirstName(e.target.value.trim())}
          />
        </div>
        <div>
          <label htmlFor="lastnameField">Last Name : </label>
          <input
            type="text"
            id="lastNameField"
            name="lastName"
            onChange={(e) => setLastName(e.target.value.trim())}
          />
        </div>
        <div>
          <label htmlFor="usernameField">Username : </label>
          <input
            type="text"
            id="usernameField"
            name="username"
            onChange={(e) => setUsername(e.target.value.trim())}
          />
        </div>
        <div>
          <label htmlFor="emailField">Email : </label>
          <input
            type="text"
            id="emailField"
            name="email"
            onChange={(e) => setEmail(e.target.value.trim())}
          />
        </div>
        <div>
          <label htmlFor="passwordField">Password : </label>
          <input
            type="text"
            id="passwordField"
            name="password"
            onChange={(e) => setPassword(e.target.value.trim())}
          />
        </div>
        <button>Submit</button>
      </form>
    </>
  );
};

export default AddInstructor;