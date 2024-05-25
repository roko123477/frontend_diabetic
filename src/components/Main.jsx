import React, { useState, useContext } from "react";
import axios from "axios";
import Typewriter from "./Typewriter";
import FadeLoader from "react-spinners/FadeLoader";
import { Navigate, useNavigate } from "react-router-dom";
import Header from "./Header";
import { UserContext } from "./UserContext";
axios.defaults.withCredentials = true;

const FileUpload = () => {
  const [image, setImage] = useState("");
  const [imgurl, setImgurl] = useState("");
  const [load, setLoad] = useState(false);
  let [color, setColor] = useState("#60a5fa");
  const navigate = useNavigate();
  const { ready, user, setUser } = useContext(UserContext);
  if (ready && !user) {
    return <Navigate to={"/login"} />;
  }
  let formData = new FormData();

  const handleFileChange = (e) => {
    let files = e.target.files;
    setImage(files[0]);
    setImgurl(URL.createObjectURL(e.target.files[0]));
  };

  const submitFormData = (e) => {
    setLoad(true);
    // for (let i = 0; i < image.length; i++) {
    formData.append("photos", image);
    // }
    console.log(formData.get("photos"));
    axios
      .post("http://localhost:5000/senddata", formData, {
        headers: { "Content-type": "multipart/form-data" },
      })
      .then((response) => {
        //  console.log(response);
        const { data } = response;
        setLoad(false);
        navigate("/show", { state: data });
        console.log(data);
      });
  };

  return (
    // <form onSubmit={handleSubmit}>
    <>
      {load && (
        <div className="flex flex-col w-full h-screen items-center justify-center absolute backdrop-blur-xl">
          {" "}
          <FadeLoader
            color={color}
            loading={load}
            // className="flex flex-col items-center justify-center"
            size={200}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}

      <div className="py-2 flex flex-col absolute w-full p-8">
        <Header />
      </div>

      <div
        class="flex w-full h-screen items-center justify-start min-h-screen bg-slate-300"
        style={{
          backgroundImage: `url(${"https://t3.ftcdn.net/jpg/02/26/11/28/360_F_226112855_yeHzKpT5GlvblgZlibf9MvJZLVjsqGYf.jpg"})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col items-center w-[700px]">
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-xl md:text-3xl p-4 text-center">
            <span class="block">
              Use the{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-tr to-gray-400 from-blue-500">
                power of Deep learning{" "}
              </span>
              to explore the{" "}
              <span class="text-transparent bg-clip-text bg-gradient-to-tr from-indigo-400 to-gray-800">
                <Typewriter text="Diabetic Retinopathy" delay={300} />{" "}
              </span>
              prediction values
            </span>
          </h1>
          {imgurl === "" ? (
            <label class="w-[15rem] h-[15rem] flex flex-col justify-center items-center p-[70px] bg-gradient-to-tr to-gray-400 from-blue-500 rounded-full border border-blue cursor-pointer hover:from-cyan-500 hover:to-green-800%">
              <svg
                class="w-6 h-6"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
              </svg>
              <span class="mt-2 leading-normal text-white">Select a file</span>
              <input type="file" class="hidden" onChange={handleFileChange} />
            </label>
          ) : (
            <>
              <img
                onClick={() => {
                  setImgurl("");
                  setImage("");
                }}
                src={imgurl}
                class="w-[15rem] h-[15rem] items-center rounded-full"
              />
            </>
          )}
          <button
            onClick={submitFormData}
            type="submit"
            class="mt-2 p-3 text-white bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 bg-gradient-to-r from-indigo-400 to-gray-800 hover:from-cyan-500 hover:to-green-800% "
          >
            Predict
          </button>
        </div>
      </div>
    </>
  );
};

export default FileUpload;
