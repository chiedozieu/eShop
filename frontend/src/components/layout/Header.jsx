import React, { useEffect, useState } from "react";
import styles from "../../styles/style";
import { Link } from "react-router-dom";
import { categoriesData, productData } from "../../static/data.js";
import { CiSearch } from "react-icons/ci";
import { IoIosArrowForward } from "react-icons/io";
import { BiMenuAltLeft } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import DropDown from "./DropDown.jsx";
import Navbar from "./Navbar.jsx";
import { PiHeartThin } from "react-icons/pi";
import { PiHandbagThin } from "react-icons/pi";
import { PiUserCircleThin } from "react-icons/pi";

const Header = ({ activeHeading }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState("");
  const [active, setActive] = useState(false);
  const [dropDown, setDropDown] = useState(false);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      setSearchData([]); // Clear search results when the input is empty
    } else {
      const filteredProducts = productData.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchData(filteredProducts);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.screenY > 70) {
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
            <Link to="/">
              <img
                src="https://shopo.quomodothemes.website/assets/images/logo.svg"
                alt=""
              />
            </Link>
          </div>
          <div className="search-box w-1/2 relative">
            <input
              type="text"
              placeholder="Search Products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="h-10 w-full px-2 border-2 border-[#ffbb38] rounded-md"
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
          <div className={`${styles.button}`}>
            <Link to="/seller">
              <h1 className="text-white flex items-center">
                Become Seller <IoIosArrowForward />
              </h1>
            </Link>
          </div>
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
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-4">
                <PiHeartThin size={30} />
                <span className="absolute top-0 right-0 rounded-full bg-white w-4 h-4 p-0 m-0 text-orange-500 text-xs leading-tight text-center">
                  0
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-4">
                <PiHandbagThin size={30} />
                <span className="absolute top-0 right-0 rounded-full bg-white w-4 h-4 p-0 m-0 text-orange-500 text-xs leading-tight text-center">
                  1
                </span>
              </div>
            </div>
            <div className={`${styles.normalFlex}`}>
              <div className="relative cursor-pointer mr-4">
                <Link to={'/login'} >
                  <PiUserCircleThin size={30} />
                </Link>
                 
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* last */}
    </>
  );
};

export default Header;
