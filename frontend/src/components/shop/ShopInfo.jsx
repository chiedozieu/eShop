import React from "react";
import { useSelector } from "react-redux";
import { backend_url, server } from "../../server";
import styles from "../../styles/style";
import axios from "axios";

const ShopInfo = ({ isOwner }) => {
  const { seller } = useSelector((state) => state.seller);


  const handleLogout = async () => {
     axios.get(`${server}/product/logout`, {withCredentials: true})
     window.location.reload();
  }

  return (
    <div className=" ">
      <div className="w-full py-5">
        <div className="w-full flex items-center justify-center">
          <img
            src={`${backend_url}${seller?.avatar.url}`}
            alt=""
            className="w-[150px] h-[150px] rounded-full object-cover"
          />
        </div>
        <h3 className="text-center py-2 text-[20px] capitalize">
          {seller.name}
        </h3>
        <p className="text-[16px] p-[10px] flex text-[#000000a6] items-center">
          {seller.description}
        </p>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Address</h5>
        <h4 className="text-[#000000a6]">{seller.address}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Phone Number</h5>
        <h4 className="text-[#000000a6]">{seller.phoneNumber}</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Total Products</h5>
        <h4 className="text-[#000000a6]">10</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Shop Rating</h5>
        <h4 className="text-[#000000a6]">4.6</h4>
      </div>
      <div className="p-3">
        <h5 className="font-semibold">Joined On</h5>
        <h4 className="text-[#000000a6]">{seller.createdAt.slice(0, 10)}</h4>
      </div>
      {
        isOwner && (
            <div className="py-3 px-4 ">
                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`}>
                    <span className="text-white">Edit Shop </span>
                </div>
                <div className={`${styles.button} !w-full !h-[42px] !rounded-[5px]`} onClick={handleLogout}>
                    <span className="text-white">Logout</span>
                </div>
            </div>
        )
      }
    </div>
  );
};

export default ShopInfo;
