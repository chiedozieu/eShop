import React from "react";
import { useNavigate } from "react-router-dom";
import { PiUserThin } from "react-icons/pi";
import { GoInbox } from "react-icons/go";
import { PiAddressBookThin } from "react-icons/pi";
import { IoLogOutOutline } from "react-icons/io5";
import { server } from "../../server";
import axios from "axios";
import { CiLock } from "react-icons/ci";
import { useSelector } from "react-redux";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { totalUnseenCount } = useSelector((state) => state.messages);

  const handleLogout = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        window.location.reload(true);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div className="w-full bg-white shadow-sm rounded-[10px] pt-8 p-4">
      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(1)}
      >
        <PiUserThin size={20} color={active === 1 ? "red" : ""} />
        <span
          className={`${
            active === 1 ? "text-[red]" : ""
          } pl-3 font-thin hidden md:block`}
        >
          Profile
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(2) || navigate("/inbox")}
      >
        <div className="">
          {totalUnseenCount > 0 ? (
            <div className="relative">
              <div className="absolute -top-1 -right-1 bg-red-500 rounded-full w-4 h-4 flex items-center justify-center">
                <span className="text-white text-xs">
                  {totalUnseenCount > 99 ? "99+" : totalUnseenCount}
                </span>
              </div>
              <GoInbox size={20} color={active === 2 ? "red" : ""} />
            </div>
          )
          : (
            <GoInbox size={20} color={active === 2 ? "red" : ""} />
          
          )}
        </div>
        <span
          className={`${
            active === 2 ? "text-[red]" : ""
          } pl-3 font-thin hidden md:block`}
        >
          Inbox
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(3)}
      >
        <PiAddressBookThin size={20} color={active === 3 ? "red" : ""} />
        <span
          className={`${
            active === 3 ? "text-[red]" : ""
          } pl-3 font-thin hidden md:block`}
        >
          Address
        </span>
      </div>
      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(4)}
      >
        <CiLock size={20} color={active === 4 ? "red" : ""} />
        <span
          className={`${
            active === 4 ? "text-[red]" : ""
          } pl-3 font-thin hidden md:block`}
        >
          Change Password
        </span>
      </div>

      <div
        className="flex items-center cursor-pointer w-full mb-5"
        onClick={() => setActive(5) || handleLogout()}
      >
        <IoLogOutOutline size={20} color={active === 5 ? "red" : ""} />
        <span
          className={`${
            active === 5 ? "text-[red]" : ""
          } pl-3 font-thin hidden md:block `}
        >
          Logout
        </span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
