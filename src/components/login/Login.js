import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Services/firebase";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
    error: "",
  });

  const { email, password, error } = user;

  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChange = (e) => {
    e.preventDefault();

    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();

    setUser({ ...user, error: "" });

    if (!email || !password) {
      setUser({
        ...user,
        error: "All Fields are compulsory!",
      });
    }
    try {
      const data = await signInWithEmailAndPassword(auth, email, password);
      await updateDoc(doc(db, "users", data.user.uid), {
        isOnline: true,
      });
      setUser({
        email: "",
        password: "",
        error: "",
      });

      navigate("/chatlist");
    } catch (error) {
      setUser({ ...user, error: error.message });
      alert(error.message)
    }
  };
  return (
    <div className="login_container">
      <div className="login_container-box">
        <div className="login_icon">
          <p>Tele</p>
        </div>
        <div className="login_content">
          <div className="login_heading">
            <h3>Integrated Communications</h3>
          </div>

          <form action="">
            <div className="login_credentials-username">
              <input
                type="text"
                name="email"
                placeholder="Email"
                id=""
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="login_credentials-pwd">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                id=""
                value={password}
                onChange={handleChange}
              />
              {showPassword ? (
                <AiFillEye onClick={togglePassword} />
              ) : (
                <AiFillEyeInvisible onClick={togglePassword} />
              )}
            </div>
            {/*<div className="error ">
            <p>Forgot Password?</p>
              </div>*/}
            <div className="login_button">
              <input type="button" onClick={submit} value="Login" />
            </div>
          </form>
          
          <div className="signup_btn">
          <span>Not have an account </span>
          <Link to="/" className="link">SignUp Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
