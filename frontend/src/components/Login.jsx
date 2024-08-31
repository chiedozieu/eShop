import React, { useState } from "react";
import { TbEyeCheck } from "react-icons/tb";
import { TbEyeClosed } from "react-icons/tb";
import styles from "../styles/style.js";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../server.js";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(
        `${server}/user/login-user`,
        {
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {  
        navigate("/");
        window.location.reload(true);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "An error occurred");
      });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm :mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* form starts */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="">
              <label
                htmlFor="email"
                className="block text-sm text-gray-700 font-medium"
              >
                Email address
              </label>
              <div className="mt-2 p-2 ">
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
              <div className="mt-2 relative p-2">
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
            <div className={`${styles.noramlFlex} justify-between`}>
              <div className={`${styles.noramlFlex}`}>
                <input
                  type="checkbox"
                  name="remember-me"
                  id="remember-me"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href=".forgot-password"
                  className="font-medium text-blue-600 hover:underline"
                >
                  Forgot your password?
                </a>
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
              <h4 className="text-gray-700">Don't have account</h4>
              <Link
                to="/sign-up"
                className="text-blue-600 pl-2 hover:underline"
              >
                Sign Up
              </Link>
            </div>
          </form>
          {/* form ends */}
        </div>
      </div>
    </div>
  );
};

export default Login;
