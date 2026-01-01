import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Signup(props) {
  let history = useNavigate();
  const [showPassword, setShowPassword] = useState("");
  const [credential, setCredential] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // verfying passwords
    if (credential.password !== credential.cpassword) {
      props.showAlert("Passwords donot match", "danger");
      return;
    }

    // Validate password length
    if (credential.password.length < 5) {
      props.showAlert("Password must be at least 5 characters", "danger");
      return;
    }

    // Validate email
    if (!credential.email || !credential.email.includes("@")) {
      props.showAlert("Please enter a valid email", "danger");
      return;
    }

    // Validate name
    if (!credential.name.trim()) {
      props.showAlert("Name is required", "danger");
      return;
    }

    const { name, email, password } = credential;
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    const response = await fetch(`${API_URL}/api/auth/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.showAlert("Created account successfully", "success");
    } else {
      props.showAlert("Invalid Credential", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  // Real-time password match indicator (optional)
  const passwordsMatch = credential.password === credential.cpassword;
  return (
    <form
      action=""
      className="loginform-container d-flex justify-content-center"
      onSubmit={handleSubmit}
    >
      <div className="login-container justify-content-center ">
        <h1>
          <small>
            <i className="fa-solid fa-user-plus small"></i>
          </small>{" "}
          SIGN UP
        </h1>

        <div className="input-group">
          <label htmlFor="username">USERNAME</label>
          <input
            type="text"
            id="username"
            name="name"
            placeholder="Enter Name"
            onChange={onChange}
            value={credential.name}
          />
        </div>

        <div className="input-group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            onChange={onChange}
            value={credential.email}
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
            onChange={onChange}
            value={credential.password}
            minLength={4}
            required
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
            onChange={onChange}
            value={credential.cpassword}
            minLength={4}
            required
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
          {credential.cpassword && (
            <div
              className={`form-text ${
                passwordsMatch ? "text-success" : "text-danger"
              }`}
            >
              {passwordsMatch ? " Passwords match" : " Passwords don't match"}
            </div>
          )}
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
