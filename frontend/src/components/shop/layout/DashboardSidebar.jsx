import React from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { IoBagAddOutline } from "react-icons/io5";
import { MdOutlineLocalOffer, MdOutlineSettings } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { LuAlarmPlus } from "react-icons/lu";
import { BiChat } from "react-icons/bi";
import { AiOutlineGift } from "react-icons/ai";
import { useSelector } from "react-redux";

const DashboardSidebar = ({ active }) => {
  const { totalUnseenCountSeller } = useSelector((state) => state.messagesSeller);
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* Single item */}
      <div className="dashboard w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center">
          <RxDashboard
            size={30}
            color={`${active === 1 ? "crimson" : "#555"}`}
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 1 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link to="/dashboard-products" className="w-full flex items-center">
          <HiOutlineShoppingBag
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link
          to="/dashboard-create-product"
          className="w-full flex items-center"
        >
          <IoBagAddOutline
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Products
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link to="/dashboard-events" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link to="/dashboard-create-event" className="w-full flex items-center">
          <LuAlarmPlus
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
            title="Create Events"
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Create Event
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link to="/dashboard-messages" className="w-full flex items-center">
          <div className="">
            {totalUnseenCountSeller > 0 ? (
              <div className="relative">
                <div className="absolute -top-1 -right-1 bg-red-700 rounded-full w-4 h-4 flex items-center justify-center">
                  <span className="text-white text-xs">
                    {totalUnseenCountSeller > 99 ? "99+" : totalUnseenCountSeller}
                  </span>
                </div>
                <BiChat
                  size={30}
                  color={`${active === 6 ? "crimson" : "#555"}`}
                  title="Messages"
                />
              </div>
            )
            : (

          <BiChat
                  size={30}
                  color={`${active === 6 ? "crimson" : "#555"}`}
                  title="Messages"
                />
            )}
          </div>

          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Messages
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link to="/dashboard/coupons" className="w-full flex items-center">
          <AiOutlineGift
            size={30}
            color={`${active === 7 ? "crimson" : "#555"}`}
            title="Discounts"
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 7 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Discounts
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link to="/settings" className="w-full flex items-center">
          <MdOutlineSettings
            size={30}
            color={`${active === 8 ? "crimson" : "#555"}`}
            title="Discounts"
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 8 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default DashboardSidebar;
