import React from "react";
import { MdOutlineLocalOffer, MdOutlineSettings } from "react-icons/md";
import { RxDashboard } from "react-icons/rx";
import { Link } from "react-router-dom";
import { IoIosPeople } from "react-icons/io";
import { PiUsersFourDuotone, PiTimer } from "react-icons/pi";

const AdminSidebar = ({ active }) => {
  
  return (
    <div className="w-full h-[89vh] bg-white shadow-sm overflow-y-scroll sticky top-0 left-0 z-10">
      {/* Single item */}
      <div className="dashboard w-full flex items-center p-4">
        <Link to="/admin/dashboard" className="w-full flex items-center">
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
        <Link to="/admin-sellers" className="w-full flex items-center">
          <IoIosPeople
            size={30}
            color={`${active === 2 ? "crimson" : "#555"}`}
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 2 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Sellers
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link to="/admin-users" className="w-full flex items-center">
          <PiUsersFourDuotone
            size={30}
            color={`${active === 3 ? "crimson" : "#555"}`}
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 3 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Users
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link to="/admin-products" className="w-full flex items-center">
          <MdOutlineLocalOffer
            size={30}
            color={`${active === 4 ? "crimson" : "#555"}`}
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 4 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Products
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link to="/admin-events" className="w-full flex items-center">
          <PiTimer
            size={30}
            color={`${active === 5 ? "crimson" : "#555"}`}
            title="All Events"
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 5 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            All Events
          </h5>
        </Link>
      </div>

      <div className="dashboard w-full flex items-center p-4">
        <Link to="/profile" className="w-full flex items-center">
          <MdOutlineSettings
            size={30}
            color={`${active === 6 ? "crimson" : "#555"}`}
            title="Discounts"
          />
          <h5
            className={`md:block hidden  pl-2 text-[18px] font-normal ${
              active === 6 ? "text-[crimson]" : "text-[#555]"
            }`}
          >
            Settings
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
