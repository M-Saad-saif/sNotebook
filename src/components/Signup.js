import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <form
      action=""
      className="loginform-container d-flex justify-content-center"
    >
      <div className="login-container justify-content-center">
        <h1>SIGN UP</h1>

        <div className="input-group">
          <label htmlFor="username">USERNAME</label>
          <input
            type="username"
            id="username"
            name="username"
            placeholder="Enter Name"
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="••••••••"
            style={{ paddingRight: "30px" }}
          />
          <i
            className={`fa-solid fa-eye${showPassword ? "-slash" : ""}`}
            onClick={togglePassword}
            style={{
              position: "absolute",
              right: "10px",
              top: "70%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "black",
            }}
          ></i>
        </div>

        <div className="input-group " style={{ position: "relative" }}>
          <label htmlFor="cpassword">CONFIRM PASSWORD</label>
          <input
            type={showPassword ? "text" : "password"} // toggle type
            id="cpassword"
            name="cpassword"
            placeholder="••••••••"
            style={{ paddingRight: "30px" }} // space for the eye icon
          />
          <i
            className={`fa-solid fa-eye${showPassword ? "-slash" : ""}`}
            onClick={togglePassword}
            style={{
              position: "absolute",
              right: "10px",
              top: "70%",
              transform: "translateY(-50%)",
              cursor: "pointer",
              color: "black",
            }}
          ></i>
        </div>

        <button className="my-1" type="submit">
          SIGN IN
        </button>

        <div className="divider my-1">OR</div>

        <div className="footer my-1">
          Already have an accoount? <Link to="/login">Login</Link>
        </div>
      </div>
    </form>
  );
}
