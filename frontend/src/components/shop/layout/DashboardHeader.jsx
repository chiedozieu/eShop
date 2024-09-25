import React from "react";
import { CiShop } from "react-icons/ci";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiOutlineGift } from "react-icons/ai";
import { MdOutlineLocalOffer } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { BiChat } from "react-icons/bi";
import { backend_url } from "../../../server";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  
  return (
    <div className="w-full bg-white h-[80px] sticky top-0 left-0 z-30 flex  items-center justify-between px-4">
      <div className="logo px-4">
        <Link to="/dashboard" className="flex relative">
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
      <div className="flex items-center">
        <div className="flex items-center">
          <Link to='/dashboard/coupons' className="md:block hidden">
              <AiOutlineGift
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
                title="Discounts"
              />
          </Link>
          <Link to='/dashboard-events' className="md:block hidden" >
              <MdOutlineLocalOffer
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
                title="All events"
              />
          </Link>
          <Link to='/dashboard-products' className="md:block hidden" >
              <HiOutlineShoppingBag
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
                title="All products"
              />
          </Link>
          <Link to='/dashboard-messages' className="md:block hidden" >
              <BiChat
                color="#555"
                size={30}
                className="mx-5 cursor-pointer"
                title="messages"
              />
          </Link>
          <Link to={`/shop/${seller._id}`}>
             <img src={`${backend_url}${seller.avatar.url}`} alt="" className="w-12 h-12 rounded-full object-cover" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
