import React from "react";
import { CiMail, CiShop } from "react-icons/ci";
import { Link } from "react-router-dom";
import { FaSquareWhatsapp } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import { FaInstagramSquare } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="">
      {/* Upper */}
      <div className="w-full bg-blue-300 h-[310px] mt-24 justify-center flex items-center md:static p-4 relative">
        <div className="image">
          <img
            src={
              "https://i0.wp.com/www.appletips.nl/wp-content/uploads/2023/02/iphone-ultra-concept-icoon.png"
            }
            alt=""
            className="w-[300px] h-[300px]"
          />
        </div>
        <div className="subscribe md:static absolute p-2 ">
          <span className="font-extrabold text-3xl sm:text-5xl text-white md:text-[#333]">
            Unlock exclusive benefits!
          </span>{" "}
          <br />
          <span className="font-Roboto text-2xl md:text-white text-black ">
            Subscribe
          </span>{" "}
          <span className="sm:text-2xl font-thin text-white md:text-[#333]">
            to our mailing list <br />
            for early access to new products, promotions, and more!
          </span>
          <div className="flex h-[50px] mt-4">
            <div className="h-full sm:w-[350px] relative flex">
              <label htmlFor="email" className="w-full h-full">
                <CiMail
                  size={25}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="ENTER YOUR EMAIL"
                  required
                  className="focus:outline-none placeholder:text-base h-full p-2 pl-10 w-full"
                />
              </label>
            </div>
            <button
              type="button"
              className="sm:w-[150px] w-[80px] h-full text-lg bg-[#ffbb38] hover:bg-orange-500"
            >
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* down */}

      <div className="">
        {/* 1 */}
        <div className="logo flex justify-center mb-12 mt-14">
          <Link to="/" className="flex relative">
            <div className="bg-black rounded-full absolute p-1 -top-2 -left-4">
              <CiShop size={20} className="text-[#ffbb38]" />
            </div>

            <p className="text-3xl font-bold tracking-wider">
              Shop
              <span className="text-4xl text-[#ffbb38] font-extrabold tracking-tighter">
                4All
              </span>
            </p>
          </Link>
        </div>
      </div>

      {/* 2 */}
      <div className="max-w-6xl mx-auto p-4">
        <div className="h-[1.5px] bg-[#e9e9e9] shadow-2xl mb-12"></div> {/* Top Line */ }
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-10 md:grid-cols-4 md:gap-5">
          {/* flex flex-col md:flex-row mt-12 justify-around gap-5 */}
          <div className="flex flex-col p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-6">
              About Us
            </h1>
            <p className="text-base text-gray-500">
              Welcome to Shop4All, a vibrant online marketplace dedicated to
              empowering Nigerian entrepreneurs and businesses to reach new
              heights.
            </p>
            <Link to="/about" className="text-blue-500 hover:underline">
              Learn More
            </Link>
          </div>
          <div className="p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-6">Shop</h1>
            <div className="text-base text-gray-500 flex flex-col gap-2">
              <Link to="/" className="hover:underline hover:text-black">
                Real Estate
              </Link>
              <Link to="/" className="hover:underline hover:text-black">
                Electronics
              </Link>
              <Link to="/" className="hover:underline hover:text-black">
                Furniture
              </Link>
              <Link to="/" className="hover:underline hover:text-black">
                Cars
              </Link>
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-6">
              Support
            </h1>
            <div className="text-base text-gray-500 flex flex-col gap-2">
              <Link to="/" className="hover:underline hover:text-black">
                Contact Us
              </Link>
              <Link to="/" className="hover:underline hover:text-black">
                How to buy
              </Link>
              <Link to="/" className="hover:underline hover:text-black">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="p-4">
            <h1 className="text-lg font-semibold text-gray-700 mb-6">
              Helpful
            </h1>
            <div className="text-base text-gray-500 flex flex-col gap-2">
              <Link to="/" className="hover:underline hover:text-black">
                Become a seller
              </Link>
              <Link to="/faq" className="hover:underline hover:text-black">
                FAQ
              </Link>
              <Link to="/events" className="hover:underline hover:text-black">
                Event Sales
              </Link>
              <Link to="/" className="hover:underline hover:text-black">
                Safety tips
              </Link>
            </div>
          </div>
        </div>
        <div className="h-[1.5px] bg-[#e9e9e9] shadow-2xl mt-12 mb-6"></div> {/* Bottom Line  */ }
      <div className="flex justify-between p-4">
        <p className="text-lg text-gray-500">&#169;2024 <span className="text-gray-700 font-semibold">Shop4All</span> </p>
        <div className=" text-xl flex gap-4 text-slate-600">
            <FaSquareWhatsapp className="cursor-pointer hover:text-green-500" />
            <FaFacebook className="cursor-pointer hover:text-blue-400" />
            <RiTwitterXFill className="cursor-pointer hover:text-black" />
            <FaInstagramSquare className="cursor-pointer hover:text-purple-500" />
        </div>

      </div>
    </div>
      </div>
  );
};

export default Footer;
