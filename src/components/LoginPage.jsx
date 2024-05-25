import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";

import avatar from '../assets/profile.png';
import styles from "./LoginPage.module.css"
// import Header from "./Header";
axios.defaults.withCredentials = true;
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/login", { email, password });
      
      setUser(data);
      alert("Login Success");
      setRedirect(true);
    } catch (error) {
      console.log(error);
      alert("login failed");
    }
  };
  if(redirect){
    window.location.href="/"
  }
  return (

    // <div className="py-4 flex flex-col min-h-screen">
    //   <Header />
    // <div className="container mx-auto">
    

      <div className=' flex flex-col justify-center items-center h-[100%]'>
        <div style={{width:"30%"}} className="border-2 border-[#3792cb] rounded-lg shadow-xl flex justify-center items-center flex-col">

          <div className="title flex flex-col items-center">
            <h4 className='text-3xl font-bold text-[#3792cb]'>Login</h4>
            <span className='py-4 text-lg w-2/3 text-center text-gray-500'>
              Explore More by connecting with us.
            </span>
          </div>

          <form className='py-1 w-[80%]'>
              <div className='pb-20 profile flex justify-center py-4'>
                  <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>

              <div className="w-full textbox flex flex-col items-center gap-6">
                  <input className="w-full" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder='Email' />
                  <input className={styles.textbox} type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='Password' />
                  <button onClick={loginUser} className={styles.btn} type='submit'>Sign in</button>
              </div>

              <div className="text-center py-4">
                <span className='text-gray-500'>Not a Member <Link className='text-primary' to="/register">Register Now</Link></span>
              </div>

          </form>

        </div>
      </div>
      // </div>
      // </div>
  );
};

export default LoginPage;