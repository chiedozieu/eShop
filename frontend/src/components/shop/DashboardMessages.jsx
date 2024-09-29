import axios from "axios";
import React, { useEffect, useState } from "react";
import { server } from "../../server";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import styles from "../../styles/style";
import { BsSend } from "react-icons/bs";
import { PiImageLight } from "react-icons/pi";

// parent: ShopInboxPage
const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    axios
      .get(`${server}/conversation/get-all-conversation-seller/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setConversations(res.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seller]);

  return (
    <div className="w-[90%] bg-white m-5 h-[calc(100vh-100px)] overflow-y-scroll rounded ">
      {!open && (
        <>
          {/* All messages list */}
          <h1 className="text-center text-[30px] font-Poppins py-3 text-[#011c229a]">
            All messages
          </h1>
          {conversations?.map((conversation, index) => (
            <MessageList
              data={conversation}
              key={index}
              index={index}
              setOpen={setOpen}
            />
          ))}
        </>
      )}
      {open && <SellerInbox setOpen={setOpen} />}
    </div>
  );
};

const MessageList = ({ data, index, setOpen }) => {
  const [active, setActive] = useState(0);

  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  return (
    <div>
      <div
        className={`flex w-full cursor-pointer p-3 ${
          active === index ? "bg-[#d491263b]" : "bg-transparent"
        }`}
        onClick={(e) => setActive(index) || handleClick(data._id)}
      >
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="w-4 h-4 bg-green-500 rounded-full absolute bottom-0 right-0" />
        </div>
        <div className="pl-3 ">
          <h1 className=" text-[18px]">John Doe</h1>
          <p className="text-[16px] text-[#011c229a]">
            You: Lorem ipsum dolor sit{" "}
          </p>
        </div>
      </div>
    </div>
  );
};
//https://img.icons8.com/color/512/github.png
const SellerInbox = ({ setOpen }) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="flex w-full p-3 items-center justify-between bg-[#c3bd1038]">
        <div className="flex">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="w-12 h-12 rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-semibold">John Doe</h1>
            <h1>Active now</h1>
          </div>
        </div>
        <div className="">
          <RiArrowGoBackFill
            size={20}
            onClick={() => setOpen(false)}
            className="cursor-pointer"
            title="Back"
          />
        </div>
      </div>
      {/* message body */}
      <div className="px-3 h-[70vh] py-3 overflow-y-scroll">
        <div className="flex w-full my-2">
          <img
            src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
            alt=""
            className="w-10 h-10 rounded-full"
          />
          <div className="w-max p-2  bg-[#15a052] text-[#fff] h-min rounded-sm ml-3 ">
            <p>Lorem ipsum dolor sit amet.</p>
          </div>
        </div>
        <div className="flex w-full my-2 justify-end">
         
          <div className="w-max p-2  bg-[#15a052] text-[#fff] h-min rounded-sm ml-3 ">
            <p>Lorem </p>
          </div>
        </div>
      </div>
      {/* send message input */}
      <form className="p-4 flex justify-between items-center">
        <div className="w-[3%]">
          <PiImageLight className="cursor-pointer text-[#0a1b06b8]" size={25} />
        </div>
        <div className="relative w-[97%]">
          <input
            type="text"
            placeholder="Type a message"
            className={`${styles.input} !p-2`}
            required
          />

          <input type="submit" value="send" className="hidden " id="send" />
          <label htmlFor="send" className="absolute right-5 bottom-2">
            <BsSend
              size={25}
              className="cursor-pointer text-[#0a1b06b8] hover:text-[#1e700cd6]"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
