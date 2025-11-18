import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("sai@gmail.com");
  const [password, setPassword] = useState("honey");

  const navigate = useNavigate();

    const apiBase = import.meta.env.VITE_API_URL;


  const loginData = async () => {
    const dataToSend = {
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
      const JSONData = await fetch(`${apiBase}/login`, reqOptions);
      const JSOData = await JSONData.json();
      console.log("Data received", JSOData.status);
      alert(JSOData.msg);
      if (JSOData.status === "success") {
        navigate("/");
        const token = JSOData.token;
        localStorage.setItem("token", token);
        console.log(JSOData.data);
        localStorage.setItem("userID",JSOData.data[0]._id)
      }
    } catch (err) {
      console.log("Data not sent", err);
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
        <div style={{ fontSize: "17.5px", fontWeight: "600" }}>Login</div>
        <form className="signup-form">
          <div>
            <label>Email</label>
            <input onChange={(e) => setEmail(e.target.value)} value={email}/>
          </div>
          <div>
            <label>Password</label>
            <input onChange={(e) => setPassword(e.target.value)}  value={password}/>
          </div>
          <button onClick={() => loginData()} type="button" style={{color:"white"}}>
            Login
          </button>
        </form>
      </div>
       <span className="signup-span">
            Don't have an account?{" "}
            <Link
              to="/signup"
              style={{ textDecoration: "underline", color: "white" }}
            >
              Signup
            </Link>
          </span>
    </div>
  );
};
