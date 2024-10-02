import axios from "axios";
import React, { useEffect, useState } from "react";
import { backend_url, server } from "../../server";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import styles from "../../styles/style";
import { BsSend } from "react-icons/bs";
import { PiImageLight } from "react-icons/pi";
// import { io } from "socket.io-client";
// import { formatDateDays } from "../../utils/dateFormat";

// const ENDPOINT = "http://localhost:4000";
// const socketId = io(ENDPOINT, { transports: ["websocket"] });

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
      .then((response) => {
        setConversations(response.data.conversations);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [seller]);

  return (
    <div className="w-[90%] overflow-y-scroll bg-white rounded h-[85vh] m-5">
      {/* All Messages list */}

      {!open && (
        <>
          <h1 className="text-center text-[30px] font-Poppins py-3">
            All Messages
          </h1>
          {conversations &&
            conversations.map((item, index) => (
              <MessageList
                data={item}
                index={index}
                key={index}
                open={open}
                setOpen={setOpen}
              />
            ))}
        </>
      )}

      {/*  */}

      {open && <SellerInbox setOpen={setOpen} />}
    </div>
  );
};

const MessageList = ({ data, index, setOpen }) => {
  const [active, setActive] = useState(1);
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`?${id}`);
    setOpen(true);
  };
  return (
    <div
      className={`w-full flex p-3 bg-[#ecdc713b] cursor-pointer ${
        active === index ? "bg-[#ecdc71]" : "transparent"
      } `}
      onClick={(e) => setActive(index) || handleClick(data._id)}
    >
      <div className="relative">
        <img
          src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
          alt=""
          className="w-[50px] h-[50px] rounded-full cursor-pointer"
        />
        <div className="w-[15px] h-[15px] bg-green-500 rounded-full absolute bottom-0 right-0" />
      </div>
      <div className="pl-3">
        <h1 className="text-[18px]">Chi Nguyen</h1>
        <p className="text-[16px] text-[#555]">You: Yeah! I'm cool</p>
      </div>
    </div>
  );
};

const SellerInbox = ({ setOpen }) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between">
      {/* message header */}
      <div className="flex w-full p-3 items-center justify-between bg-[#ecdc71]">
        <div className="flex ">
          <img
            src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="pl-3">
            <h1 className="text-[18px] font-semibold">Chi Nguyen</h1>
            <h1>Active now</h1>
          </div>
        </div>
        <RiArrowGoBackFill
          size={25}
          className="cursor-pointer text-[#390d0d]"
          onClick={() => setOpen(false)}
        />
      </div>
      {/* messages/chats */}

      <div className="px-3 h-[60vh] py-3 overflow-y-scroll ">
        <div className="flex items-center w-full my-2">
          <img
            src="https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            alt=""
            className="w-[40px] h-[40px] rounded-full mr-3"
          />
          <div className="w-max bg-[#4ba006ef] h-m p-2 rounded-[4px]">
            <p className="text-white">Hello guys</p>
          </div>
        </div>
        <div className="flex items-center w-full my-2 justify-end">
          <div className="w-max bg-[#4ba006ef] h-m p-2 rounded-[4px]">
            <p className="text-white">Hi buddy</p>
          </div>
        </div>
      </div>
      {/* send message input */}
      <form action="" className="p-3 w-full">
        {/* input image here */}
        <div className="">
          <PiImageLight
            size={30}
            className="cursor-pointer hover:text-[#531a14d2] text-[#071c098a]"
          />
        </div>
        <input
          type="text"
          required
          id=""
          placeholder="Enter your message"
          className={`${styles.input} relative p-2`}
        />
        <input type="submit" className="hidden" id="send" />
        <label htmlFor="send">
          <BsSend
            size={25}
            className="absolute bottom-9 right-11 cursor-pointer hover:text-[#14531a] text-[#071c09]"
          />
        </label>
      </form>
    </div>
  );
};

export default DashboardMessages;
