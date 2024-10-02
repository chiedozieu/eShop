import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { categoriesData } from "../../static/data.js";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { PiHeartThin } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";
import { CiShop } from "react-icons/ci";
import { useSelector } from "react-redux";
import { backend_url } from "../../server.js";
import Wishlist from "../wishlist/Wishlist";
import { RxCross1 } from "react-icons/rx";

const Header = ({ activeHeading }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { isSeller } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.product);
  const { wishlist } = useSelector((state) => state.wishlist);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setSearchData([]); // Clear search results when the input is empty
    } else {
      const filteredProducts =
        allProducts &&
        allProducts.filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        );
      setSearchData(filteredProducts);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 120) {
        setActive(true);
      } else {
        setActive(false);
      }
    });
    return () => {
      window.removeEventListener("scroll", () => {});
    };
  }, []);

  return (
    <>
      <div className={`${styles.section}`}>
        <div className="hidden md:h-14 md:my-5 md:flex items-center justify-between">
          <div className="logo">
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
          <div className="search-box w-1/2 relative">
            <input
              type="text "
              placeholder="Search Products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-10 w-full px-2 border border-[#ffbb38] rounded-md"
            />
            <CiSearch
              size={30}
              className="absolute right-2 top-1.5 cursor-pointer"
            />
            {searchData && searchData.length > 0 ? (
              <div
                className={
                  "absolute min-h-[30vh] max-h-[70vh] overflow-y-scroll bg-slate-50 shadow-sm-2 z-10 p-4"
                }
              >
                {searchData &&
                  searchData.map((i, index) => {
                    return (
                      <Link to={`/product/${i._id}`} key={index}>
                        <div className={`w-full flex items-start py-3 `}>
                          <img
                            src={`${backend_url}${i.images[0]}`}
                            alt=""
                            className="w-10 h-10 mr-2.5"
                          />
                          <h1>{i.name}</h1>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            ) : null}
          </div>

          {/* // Remove & disappear */}
          <div className={`${styles.button} !rounded-md !h-10`}>
            <Link to="/shop-create">
              <h1
                className={`text-white flex items-center 
      ${isSeller ? "font-thin text-sm justify-center" : ""} 
    `}
              >
                {isSeller ? (
                  <p className="flex items-center ">
                    Profile
                    <IoIosArrowForward />
                    Dashboard
                  </p>
                ) : (
                  "Become Seller"
                )}
                <IoIosArrowForward />
              </h1>
            </Link>
          </div>
           {/* // Remove & disappear */}
        </div>
      </div>
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } transition hidden md:flex items-center justify-between w-full bg-[#ffbb38] h-[70px]`}
      >
        <div
          className={`${styles.section} relative ${styles.normalFlex} justify-between`}
        >
          {/* categories  */}
          <div className="relative h-[60px] mt-[10px] w-[270px] hidden 1000px:block">
            <BiMenuAltLeft size={30} className="absolute p-1 top-3 left-2" />
            <button
              className={`h-[100%] w-full flex justify-between items-center pl-10 bg-white font-sans text-lg font-semibold  select-none rounded-t-md `}
              onClick={() => setDropDown(!dropDown)}
            >
              All Categories
            </button>
            <IoIosArrowDown
              size={20}
              className="absolute right-2 top-4 cursor-pointer"
              onClick={() => setDropDown(!dropDown)}
            />
            {dropDown ? (
              <DropDown
                categoriesData={categoriesData}
                setDropDown={setDropDown}
              />
            ) : null}
          </div>
          {/* nav items */}
          <div className={`${styles.normalFlex}`}>
            <Navbar active={activeHeading} />
          </div>
          <div className="flex">
            <div className={`wishlist ${styles.normalFlex} `}>
              <div
                className="relative cursor-pointer mr-4"
                onClick={() => setOpenWishlist(true)}
              >
                <PiHeartThin size={30} />
                <span className="absolute top-0 right-0 rounded-full bg-white w-4 h-4 p-0 m-0 text-orange-500 text-xs leading-tight text-center">
                  {wishlist?.length}
                </span>
              </div>
            </div>
            {/* user */}
            <div className={`username ${styles.normalFlex} `}>
              <div className="relative mr-4 capitalize font-thin ">
                {user ? <h6>Hi {user?.name.split(" ")[0]}</h6> : "Hi Guest"}
              </div>
            </div>
            <div className={`user ${styles.normalFlex} `}>
              <div className="relative cursor-pointer mr-4">
                {isAuthenticated ? (
                  <Link to={"/profile"}>
                    <img
                      src={`${backend_url}${user.avatar.url}`}
                      alt=""
                      className="profile-pic h-10 w-10 rounded-full object-cover"
                    />
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <PiUserCircleThin size={30} />
                  </Link>
                )}
              </div>
            </div>
            {/* wishlist popup */}
            {openWishlist ? (
              <Wishlist setOpenWishlist={setOpenWishlist} />
            ) : null}
          </div>
        </div>
      </div>
      {/* last */}

      {/* mobile screen header  */}
      {/* mobile screen header  */}
      <div
        className={`${
          active === true ? "shadow-sm fixed top-0 left-0 z-10" : null
        } fixed w-full h-[60px] bg-[#fff] z-50 top-0 left-0 shadow-sm md:hidden`}
      >
        <div className="w-full flex items-center justify-between ">
          {/* left */}
          <div className="mt-1 ">
            <BiMenuAltLeft
              size={40}
              className="ml-4"
              onClick={() => setOpen(true)}
            />
          </div>
          {/* center */}
          <div className="logo items-center mt-3">
            <Link to="/" className="flex relative">
              <div className="bg-black rounded-full absolute p-1 -top-0 -left-3">
                <CiShop size={12} className="text-[#ffbb38]" />
              </div>
              <p className="text-xl font-bold tracking-wider">
                Shop
                <span className="text-2xl text-[#ffbb38] font-extrabold tracking-tighter">
                  4All
                </span>
              </p>
            </Link>
          </div>
          {/* right */}
          <div className="mt-3">
            <div className={`user ${styles.normalFlex} `}>
              <div className="relative cursor-pointer mr-4">
                {isAuthenticated ? (
                  <Link to={"/profile"}>
                    <img
                      src={`${backend_url}${user.avatar.url}`}
                      alt=""
                      className="profile-pic h-10 w-10 rounded-full object-cover"
                    />
                  </Link>
                ) : (
                  <Link to={"/login"}>
                    <PiUserCircleThin size={30} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* header sidebar popup */}
      
        {open && (
          <div
            className={`fixed w-full h-full bg-[#0000005f] z-20 top-0 left-0 `}
          >
            <div className="fixed w-[60%] bg-[#fff] h-screen top-0 left-0 z-10">
              <div className="w-full justify-between flex pr-3">
                <div className="">
                  <div className="relative mr-[15px]">
                    <PiHeartThin size={30} className=" mt-5 ml-3"/>
                    <span className="absolute top-0 right-0 rounded-full bg-white w-4 h-4 p-0 m-0 text-orange-500 text-xs leading-tight text-center">
                      {wishlist.length}
                    </span>
                  </div>
                </div>
                <RxCross1
                  size={25}
                  className="ml-4 mt-5 font-thin"
                  onClick={() => setOpen(false)}
                />
              </div>
              {/* search */}
              <div className="my-8 w-[92%] mx-auto h-[40px]">
                <input
                  type="search"
                  placeholder="Search Products..."
                  value={searchTerm}
                  onChange={handleSearchChange}
                  className="h-10 w-full px-2 border border-[#ffbb38] rounded-md"
                />
                {searchData && searchData.length > 0 ? (
                  <div
                    className={
                      "absolute min-h-[30vh] max-h-[70vh] overflow-y-scroll bg-slate-50 shadow-sm-2 z-10 p-4"
                    }
                  >
                    {searchData &&
                      searchData.map((i, index) => {
                        const d = i.name;
                        const product_name = d.replace(/\s+/g, "-");
                        return (
                          <Link to={`/product/${product_name}`} key={index}>
                            <div className={`w-full flex items-start py-3 `}>
                              <img
                                src={i.image_Url[0].url}
                                alt=""
                                className="w-10 h-10 mr-2.5"
                              />
                              <h1>{i.name}</h1>
                            </div>
                          </Link>
                        );
                      })}
                  </div>
                ) : null}
              </div>
              <div className={`${styles.normalFlex}`}>
                <Navbar active={activeHeading} />
              </div>
              <div className={`${styles.button} !rounded-md !h-10 ml-4`}>
                <Link to="/shop-create">
                  <h1
                    className={`text-white flex items-center 
      ${isSeller ? "font-thin text-sm justify-center" : ""} 
    `}
                  >
                    {isSeller ? (
                      <p className="flex items-center ">
                        Profile
                        <IoIosArrowForward />
                        Dashboard
                      </p>
                    ) : (
                      "Become Seller"
                    )}
                    <IoIosArrowForward />
                  </h1>
                </Link>
              </div>
              <br />
              <br />
              <br />

              {!isAuthenticated && (
                <div className="w-full justify-center flex">
                  <Link
                    to="/login"
                    className="text-[18px] text-[#000000b7] mr-2 "
                  >
                    Login /
                  </Link>
                  <Link to="/sign-up" className="text-[18px] text-[#000000b7]">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
