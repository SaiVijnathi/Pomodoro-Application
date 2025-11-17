import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const signupData = async () => {
    const dataToSend = {
      name,
      email,
      password,
    };
    const reqOptions = {
      body: JSON.stringify(dataToSend),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const JSONData = await fetch("http://localhost:4567/signup", reqOptions);
      const JSOData = await JSONData.json();
      console.log(JSOData.status);
      console.log("name", name);
      console.log("email", email);
      console.log("password", password);
      console.log("Response Data", JSOData);
      console.log("JSON Data", JSONData.status);
      alert(JSOData.msg);
      if (JSOData.status === "success") {
        navigate("/login");
      }
    } catch (err) {
      console.log("Data is not sent or received", err);
    }
  };

  return (
    <div className="signup-div">
      <div className="logo" style={{ margin: "20px" }}>
        <Link to="/" style={{ fontSize:"25px", color:"white" }}>
          Pomodoro
        </Link>
      </div>
      <div className="signup">
        <div style={{ fontSize: "17.5px", fontWeight: "600", color:"#333232ff" }}>Create Account</div>
        <form className="signup-form">
          <div>
            <label>Name</label>
            <input onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)} />
          </div>
          <button onClick={() => signupData()} type="button" style={{color:"white"}}>
            Signup
          </button>
        </form>
      </div>
      <span className="signup-span">
            Already have an account?{" "}
            <Link
              to="/login"
              style={{ textDecoration: "underline", color: "white" }}
            >
              Login
            </Link>
          </span>
    </div>
  );
};
