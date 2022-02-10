import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../Services/firebase";
import { setDoc, doc, Timestamp } from "firebase/firestore";
// import { toast, ToastContainer } from "react-toastify";

import "./signup.css";

const Signup = () => {
  const [user, setUser] = useState({
    name: "",
    password: "",
    email: "",
    error: "",
  });

  const { name, password, email, error } = user;

  const handleChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const submit = async (e) => {
    e.preventDefault();

    setUser({ ...user, error: "" });
    if (!name || !email || !password) {
      setUser({ ...user, error: "All fields are required!" });
    }
    try {
      const data = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", data.user.uid), {
        uid: data.user.uid,
        name,
        email,
        createdAt: Timestamp.fromDate(new Date()),
        isOnline: true,
      });

      setUser({
        name: "",
        email: "",
        password: "",
        error: "",
      });
      navigate("/login");
    } catch (error) {
      setUser({ ...user, error: error.message });
      alert(error.message);
    }
  };

  return (
    <div className="signup_container">
      <div className="signup_container-box">
        <div className="signup_icon">
          <p>Tele</p>
        </div>
        <div className="signup_content">
          <div className="signup_heading">
            <h3>Integrated Communications</h3>
          </div>

          <form action="" onSubmit={submit}>
            <div className="signup_credentials-username">
              <input
                type="text"
                name="name"
                value={name}
                placeholder="Username"
                id=""
                onChange={handleChange}
              />
            </div>
            <div className="signup_credentials-username">
              <input
                type="email"
                name="email"
                value={email}
                placeholder="Email"
                id=""
                onChange={handleChange}
              />
            </div>
            <div className="signup_credentials-pwd">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                placeholder="Password"
                id=""
                onChange={handleChange}
              />
              {showPassword ? (
                <AiFillEye onClick={togglePassword} />
              ) : (
                <AiFillEyeInvisible onClick={togglePassword} />
              )}
            </div>

            <div className="signup_button">
              <input type="button" onClick={submit} value="Signup" />
            </div>
          </form>
          {/*<div className="error">
            <p>{error}</p>
              </div> */}
          <div className="login_btn">
            <span>Already have an account</span>
            <Link to="/login" className="link">
              Login Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
