import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";

import styles from "./LoginPage.module.css";
import extend from "./Profile.module.css";
import avatar from "../assets/profile.png";
import convertToBase64 from "./Convert";
import Header from "./Header";
//import { number } from "prop-types";

const RegisterPage = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [file, setFile] = useState();
  const [redirect, setRedirect] = useState(false);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      // const data1={firstname,lastname,email,password,phone,file};
      // console.log(data1);
      await axios.post("http://localhost:5000/register", {
        firstname,
        lastname,
        email,
        password,
        phone,
        file,
      });
      alert(`Successfully registered now you can log in`);
      setRedirect(true);
    } catch (error) {
      alert("Registration failed. Please try again later.");
    }
  };

  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  if (redirect) {
    return <Navigate to={"/login"} />;
  }
  return (
  //   <div className="py-4 flex flex-col min-h-screen">
  //   <Header />
  // <div className="container mx-auto">
        <div className="flex justify-center items-center h-full">
          <div  style={{ width: "30%" }} className="border-2 border-[#3792cb] rounded-lg shadow-xl flex justify-center items-center flex-col">
            <div className="title flex flex-col items-center">
              <h4 className="text-3xl font-bold text-[#3792cb]">Register</h4>
              <span className="py-4 text-lg w-2/3 text-center text-gray-500">
                Provide the necessary details.
              </span>
            </div>

            <form className="py-1 w-[70%]">
              <div className="profile pb-20 flex justify-center py-4">
                <label htmlFor="profile">
                  <img
                    src={file || avatar}
                    className={`${styles.profile_img}`}
                    alt="avatar"
                  />
                </label>
                <input
                  type="file"
                  onChange={onUpload}
                  id="profile"
                  name="profile"
                />
              </div>

              <div className="textbox flex flex-col items-center gap-6 w-full">
                
                  <input
                    className="w-full"
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                    type="text"
                    placeholder="FirstName"
                  />
                  <input
                    className={`${styles.textbox} ${extend.textbox}`}
                    value={lastname}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    placeholder="LastName"
                  />
                

                
                  <input
                    className={`${styles.textbox} ${extend.textbox}`}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    placeholder="Mobile No."
                  />
                  <input
                    className={`${styles.textbox} ${extend.textbox}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Email*"
                  />
                

                <input
                  className={`${styles.textbox}${extend.textbox}`}
                  value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                />
                <button onClick={registerUser} className={styles.btn} type="submit">
                  Register
                </button>
              </div>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Already a member{" "}
                  <Link className="text-primary" to="/login">
                    Login
                  </Link>
                </span>
              </div>
            </form>
          </div>
        </div>
        // </div>
        // </div>
 
  );
};

export default RegisterPage;