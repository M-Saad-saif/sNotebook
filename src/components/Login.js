import React, {   useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useNavigate } from "react-router";

export default function Login(props) {
  const [showPassword, setShowPassword] = useState("");
  const [credential, setCredential] = useState({ email: "", password: "" });

  //   using useHistory hook for redirecting
  let history = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // loging in
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credential.email,
        password: credential.password,
      }),
    });
    const json = await response.json();
    console.log(json);

    if (json.success) {
      // save the auth and redirecting
      localStorage.setItem("token", json.authtoken);
      history("/");
      props.showAlert("LogedIn successfully", "success");
    } else {
      props.showAlert("Wrong username or password", "danger");
    }
  };

  const onChange = (e) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  return (
    <form
      action=""
      className="loginform-container d-flex justify-content-center"
      onSubmit={handleSubmit}
    >
      <div className="login-container justify-content-center">
        <h1>
          <i className="fa-solid fa-sign-in-alt small"></i> LOGIN
        </h1>

        <div className="input-group">
          <label htmlFor="email">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            value={credential.email}
            onChange={onChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="password">PASSWORD</label>
          <input
            type={showPassword ? "text" : "password"}
            id="password"
            name="password"
            placeholder="••••••••"
            value={credential.password}
            onChange={onChange}
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

        <button className="my-1" type="submit">
          LOGIN
        </button>

        <div className="divider my-1">OR</div>

        <div className="footer my-1">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </form>
  );
}
