import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import { Navigate, Link, useParams } from "react-router-dom";
import axios from "axios";
// import PlacesPage from "./PlacesPage";
// import convertToBase64 from "./Convert";
// import AccountNav from "../AccountNav";
import Header from "./Header";
// import styles1 from "./ProfilePage.module.css";
import styles from "./LoginPage.module.css";
import extend from "./Profile.module.css";
import avatar from "../assets/profile.png";

const ProfilePage = () => {
  const { ready, user, setUser } = useContext(UserContext);

  const [redirect, setRedirect] = useState(false);
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setUserid] = useState("");

  const [phone, setPhone] = useState("");
  const [file, setFile] = useState();

  useEffect(() => {
    if (user) {
      setUserid(user._id);
      axios
        .get(`http://localhost:5000/getuserdetails/${user._id}`)
        .then((response) => {
          setFirstName(response.data.firstname);
          setLastName(response.data.lastname);
          setEmail(response.data.email);
          setPhone(response.data.phonenumber);
          setFile(response.data.file);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  //   const onUpload = async (e) => {
  //     const base64 = await convertToBase64(e.target.files[0]);
  //     setFile(base64);
  //   };
  //   const handleUpdate = async (e) => {
  //     e.preventDefault();
  //     //  console.log(firstname,lastname,email,file,phone,id);
  //     try {
  //       const { data } = await axios.put("/profileupdate", {
  //         firstname,
  //         lastname,
  //         email,
  //         file,
  //         phone,
  //         id,
  //       });
  //       console.log(data);
  //       alert("Profile updated successfully");
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  async function logout() {
    await axios.post("http://localhost:5000/logout");
    setRedirect(true);
    setUser(null);
  }

  if (!ready) {
    return "Loading...";
  }

  if (ready && !user && !redirect) {
    return <Navigate to={"/login"} />;
  }
  if (redirect) {
    window.location.href = "/login";
  }
  return (
    <div className="py-4 flex flex-col h-screen">
      <div className="py-4 flex flex-col absolute w-full p-12">
        <Header />
      </div>
      <div>
        <div className="container mx-auto ">
          <div className="flex justify-center items-center mt-64">
            <div
              className="border-2 border-[#3792cb] rounded-lg shadow-xl p-8 flex justify-center items-center flex-col"
              style={{ width: "35%" }}
            >
              <div className="title flex flex-col items-center">
                <h4 className="text-5xl font-bold text-[#3792cb]">Profile</h4>
              </div>

              <form className="py-1 w-[70%]">
                <div className="profile flex justify-center py-4 mb-16">
                  <label htmlFor="profile">
                    <img
                      src={file || avatar}
                      className={`${styles.profile_img} ${extend.profile_img}`}
                      alt="avatar"
                    />
                  </label>
                  <input type="file" id="profile" name="profile" />
                </div>

                <div className="textbox flex flex-col items-center gap-6 w-full">
                  <input
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstname}
                    placeholder="FirstName"
                  />
                  <input
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastname}
                    placeholder="LastName"
                  />

                  <input
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    placeholder="Mobile No."
                  />
                  <input
                    className={`${styles.textbox} ${extend.textbox}`}
                    type="text"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    placeholder="Email*"
                  />
                </div>

                <div className="text-center py-4">
                  <span className="text-gray-500 text-2xl">
                    come back later{" "}
                    <button
                      onClick={logout}
                      className="w-36 text-white bg-primary rounded-2xl p-2 hover:bg-gray-500"
                    >
                      Logout
                    </button>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
