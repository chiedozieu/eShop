import React, { useState } from "react";
import { TbEyeCheck } from "react-icons/tb";
import { TbEyeClosed } from "react-icons/tb";
import styles from "../styles/style.js";
import { Link } from "react-router-dom";
import { RxAvatar } from "react-icons/rx";
import axios from "axios";
import { server } from "../server.js";

const SignUp = () => {
  // const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [avatar, setAvatar] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { Headers: { "content-type": "multipart/form-data" } };

    const newForm = new FormData();

    newForm.append("file", avatar);
    newForm.append("name", name);
    newForm.append("email", email.trim());
    newForm.append("password", password);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        alert(res.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="min-h-screen bg-gray-50 flex items-center flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Sign Up
        </h2>
      </div>
      <div className="mt-8 sm :mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* form starts */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="">
              <label
                htmlFor="name"
                className="block text-sm text-gray-700 font-medium"
              >
                Full Name
              </label>
              <div className="p-2">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-medium"
              >
                Email address
              </label>
              <div className="p-2">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="">
              <label
                htmlFor="password"
                className="block text-sm text-gray-700 font-medium mt-4"
              >
                Password
              </label>
              <div className="relative p-2">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm "
                />
                {showPassword ? (
                  <TbEyeClosed
                    className="absolute right-4 top-4"
                    size={25}
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <TbEyeCheck
                    className="absolute right-4 top-4"
                    size={25}
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <div className="">
              <label
                htmlFor="avatar"
                className="text-sm block font-medium text-gray-700"
              ></label>
              <div className="flex items-center mt-2 p-2">
                <span className="inline-block h-8 w-8 rounded-full overflow-hidden">
                  {avatar ? (
                    <img
                      src={URL.createObjectURL(avatar)}
                      alt="avatar"
                      className="h-full w-full object-cover rounded-full"
                    />
                  ) : (
                    <RxAvatar className="h-8 w-8" />
                  )}
                </span>
                <label
                  htmlFor="file-input"
                  className="ml-5 flex justify-center items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                  <span>Upload File</span>
                  <input
                    type="file"
                    name="avatar"
                    id="file-input"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="sr-only"
                  />
                </label>
              </div>
            </div>
            <div className="">
              <button
                type="submit"
                className="group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-md rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Submit
              </button>
            </div>
            <div className={`${styles.noramlFlex} w-full`}>
              <h4 className="text-gray-700">Have account</h4>
              <Link to="/login" className="text-blue-600 pl-2 hover:underline">
                Login
              </Link>
            </div>
          </form>
          {/* form ends */}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
