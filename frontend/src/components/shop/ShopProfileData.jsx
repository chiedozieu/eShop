import React, { useState } from "react";
import ProductCard from "../route/productCard/ProductCard";
import { productData } from "../../static/data";
import { Link } from "react-router-dom";
import styles from "../../styles/style";

const ShopProfileData = ({ isOwner }) => {
  const [active, setActive] = useState(1);
  return (
    <div className="w-full">
      <div className="flex w-full items-center font-Poppins justify-between">
        <div className="mainWrapper w-full flex">
          <div className="flex items-center" onClick={() => setActive(1)}>
            <h5
              className={`font-semibold text-[20px] cursor-pointer ${
                active === 1 ? "text-red-500" : "text-[#333]"
              } pr-[20px]`}
            >
              Shop Products
            </h5>
          </div>
          <div
            className="flex items-center font-Poppins pr-[20px]"
            onClick={() => setActive(2)}
          >
            <h5
              className={`font-semibold text-[20px] cursor-pointer ${
                active === 2 ? "text-red-500" : "text-[#333]"
              }`}
            >
              Running Events
            </h5>
          </div>
          <div
            className="flex items-center font-Poppins"
            onClick={() => setActive(3)}
          >
            <h5
              className={`font-semibold text-[20px] cursor-pointer ${
                active === 3 ? "text-red-500" : "text-[#333]"
              }`}
            >
              Shop Reviews
            </h5>
          </div>
        </div>

        <div className="">
          {isOwner && (
            <div className="">
              <Link to='/dashboard'>
              <div className={`${styles.button} !rounded-[4px] !h-[42px]`}>
                <span className="text-[#fff]">Dashboard</span>
              </div>
              </Link>
            </div>
          )}
        </div>
      </div>
      <br />
      <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-2 lg:gap-[25px] xl:grid-cols-4 xl:gap-[20px] mb-12 border-0">
        {productData &&
          productData.map((i, index) => (
            <ProductCard data={i} key={index} isShop={true} />
          ))}
      </div>
    </div>
  );
};

export default ShopProfileData;
