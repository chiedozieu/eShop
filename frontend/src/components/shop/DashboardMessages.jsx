import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import styles from "../../styles/style";
import { BsSend } from "react-icons/bs";
import { PiImageLight } from "react-icons/pi";
import { io } from "socket.io-client";
import { formatDateDays, formatFull } from "../../utils/dateFormat";
import { displayCurrencyOnly } from "../../utils/displayCurrency";
import {
  decrementUnseenCountSeller,
  fetchTotalUnseenCountSeller,
  incrementUnseenCountSeller,
} from "../../redux/reducers/messagesSeller";

const ENDPOINT = "http://localhost:4000";
const socketId = io(ENDPOINT, { transports: ["websocket"] });

// parent: ShopInboxPage
const DashboardMessages = () => {
  const { seller } = useSelector((state) => state.seller);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [userData, setUserData] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeStatus, setActiveStatus] = useState(false);
  const dispatch = useDispatch();

  const scrollRef = useRef(null);

  // Socket listener for new messages
  useEffect(() => {
    socketId.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });

      // If the message is not from the current user, increment the unseen count
      if (data.senderId !== seller?._id) {
        // Optimistic update
        dispatch(incrementUnseenCountSeller());
        // Validate with server
        dispatch(fetchTotalUnseenCountSeller(seller?._id));
      }
    });
  }, [dispatch, seller?._id]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage?.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-seller/${seller?._id}`,
          {
            withCredentials: true,
          }
        );
        setConversations(response.data.conversations);
      } catch (error) {
        console.log(error);
      }
    };

    getConversation();
  }, [seller, messages]);

  // online users

  useEffect(() => {
    if (seller) {
      const userId = seller?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [seller]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== seller?._id);
    const online = onlineUsers.find((user) => user?.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat._id}`,
          {
            withCredentials: true,
          }
        );
        setMessages(response.data.messages);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);

  // create new message
  const sendMessageHandler = async (e) => {
    e.preventDefault();

    const message = {
      sender: seller?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find(
      (member) => member.id !== seller?._id
    );
    socketId.emit("sendMessage", {
      senderId: seller?._id,
      receiverId,
      text: newMessage,
    });

    try {
      if (newMessage !== "") {
        await axios
          .post(`${server}/message/create-new-message`, message, {
            withCredentials: true,
          })
          .then((res) => {
            setMessages([...messages, res.data.message]);
            updateLastMessage();
          })
          .catch((error) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateLastMessage = async () => {
    socketId.emit("updateLastMessage", {
      lastMessage: newMessage,
      lastMessageId: seller?._id,
    });

    await axios
      .put(
        `${server}/conversation/update-last-message/${currentChat?._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: seller?._id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        // console.log(res.data.conversation);
        setNewMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  // Handle marking messages as seen
  const handleMessageSeen = async (conversationId, unseenCount) => {
    try {
      // Optimistic update
      if (unseenCount > 0) {
        dispatch(decrementUnseenCountSeller(unseenCount));
      }
      // Update server
      await axios.put(
        `${server}/message/update-seen/${conversationId}/${seller?._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      // Validate the count with server
      dispatch(fetchTotalUnseenCountSeller(seller?._id));
    } catch (error) {
      console.log(error);
      // If there's an error, refresh the count from server to ensure accuracy
      dispatch(fetchTotalUnseenCountSeller(seller?._id));
    }
  };

  return (
    <div className="w-full overflow-y-scroll bg-white rounded h-[85vh] mx-auto">
      {/* All Messages list */}

      <div className="w-full lg:p-2 md:mx-auto flex">
        <div
          className={`w-full fixed md:static md:w-[40%] h-[50vh] ${
            open ? "hidden md:block" : "block"
          }`}
        >
          <div className="w-full flex flex-col">
            {conversations &&
              conversations.map((item, index) => (
                <MessageList
                  data={item}
                  index={index}
                  key={index}
                  open={open}
                  setOpen={setOpen}
                  setCurrentChat={setCurrentChat}
                  me={seller?._id}
                  userData={userData}
                  setUserData={setUserData}
                  online={onlineCheck(item)}
                  setActiveStatus={setActiveStatus}
                  setActiveIndex={setActiveIndex}
                  activeIndex={activeIndex}
                  onMessageSeen={(unseenCount) =>
                    handleMessageSeen(item._id, unseenCount)
                  }
                />
              ))}
          </div>
        </div>

        {/*  */}
        <div className="h-50vh md:w-[60%] w-full">
          {open && (
            <SellerInbox
              setOpen={setOpen}
              newMessage={newMessage}
              setNewMessage={setNewMessage}
              sendMessageHandler={sendMessageHandler}
              messages={messages}
              sellerId={seller?._id}
              userData={userData}
              activeStatus={activeStatus}
              scrollRef={scrollRef}
              setMessages={setMessages}
              data={currentChat}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const MessageList = ({
  data,
  index,
  setOpen,
  setCurrentChat,
  me,
  setUserData,
  online,
  setActiveStatus,
  setActiveIndex,
  activeIndex,
  onMessageSeen,
}) => {
  const [unseenCount, setUnseenCount] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const handleConversationClick = (id) => {
    setActiveIndex(index);
    setOpen(true);
    navigate(`/dashboard-messages?${id}`);
    setCurrentChat(data);
    setUserData(user);

    // Only update seen status if there are unseen messages
    if (unseenCount > 0) {
      updateSeen();
      onMessageSeen(unseenCount); // Notify parent to update total count
    }
  };

  //2
  const updateSeen = async () => {
    try {
      await axios.put(`${server}/message/update-seen/${data._id}/${me}`, {
        withCredentials: true,
      });
      setUnseenCount(0); // Reset unseen count after marking as seen
    } catch (error) {
      console.log(error);
    }
  };
  //3

  // Fetch unseen messages count
  useEffect(() => {
    const fetchUnseenMessages = async () => {
      try {
        const res = await axios.get(
          `${server}/message/get-unseen-messages/${data._id}/${me}`,
          {
            withCredentials: true,
          }
        );
        setUnseenCount(res.data.unseenMessagesCount);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUnseenMessages();

    socketId.on("updateUnseenCount", (data) => {
      if (data.conversationId === data._id && data.userId === me) {
        fetchUnseenMessages();
      }
    });
  }, [data, me]);

  useEffect(() => {
    setActiveStatus(online);
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/user/user-info/${userId}`, {
          withCredentials: true,
        });
        setUser(res.data.user);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data, online, setActiveStatus]);

  return (
    <div
      className={`w-full h-[80px] flex p-3 cursor-pointer ${
        index === activeIndex ? "bg-[#ecdb712b]" : "transparent"
      } rounded-md hover:bg-[#ecdb712b] shadow-[0px_.4px_.4px_rgba(0,0,0,0.2)]`}
      onClick={handleConversationClick}
    >
      <div className="relative">
        <img
          src={`${backend_url}${user?.avatar?.url}`}
          alt=""
          className="w-[50px] h-[50px] rounded-full cursor-pointer"
        />
        {online ? (
          <div className="w-[15px] h-[15px] bg-green-500 rounded-full absolute bottom-1 right-0" />
        ) : (
          <div className="w-[15px] h-[15px] bg-[#555555] rounded-full absolute bottom-1 right-0" />
        )}
      </div>
      <div className="flex justify-between w-full">
        <div className="pl-3">
          <h1 className="text-[18px]">{user?.name}</h1>
          <p className="text-sm font-thin lg:text-[16px] lg:font-normal text-[#555]">
            {data?.lastMessageId !== user?._id
              ? "You:"
              : user?.name?.includes(" ")
              ? user?.name.split(" ")[0] + ":"
              : user?.name + ":"}
            {""}
            {data?.lastMessage?.length > 10
              ? data.lastMessage.slice(0, 10) + "..."
              : data.lastMessage}
          </p>
        </div>

        <div className="flex flex-col items-center gap-2 ">
          <p className="text-xs font-thin">{formatFull(data?.updatedAt)}</p>
          {unseenCount === 0 ? null : (
            <div className="bg-[#16f012] w-5 h-5 rounded-full flex items-center justify-center">
              <p className="text-xs font-bold text-white">
                <span className="text-[#fff]">{unseenCount}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SellerInbox = ({
  setOpen,
  newMessage,
  setNewMessage,
  sendMessageHandler,
  messages,
  sellerId,
  scrollRef,
  data,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      {/* message header */}
      <div className="flex w-full p-3 items-center justify-between h-[80px] shadow-[0px_.4px_.4px_rgba(0,0,0,0.2)] rounded-md">
        <div className="flex ">
          {/* Product image, name & price */}
          <div className="flex items-center gap-2">
            {data?.productImage && (
              <img
                src={`${backend_url}${data?.productImage}`}
                alt=""
                className="w-[75px] h-[75px] object-contain rounded-lg"
              />
            )}
            <div className="flex flex-col">
              {data?.productName && (
                <p className="">
                  {data?.productName.length > 30
                    ? data?.productName.slice(0, 30) + "..."
                    : data?.productName}
                </p>
              )}
              {data?.productPrice && (
                <p className="">{displayCurrencyOnly(data?.productPrice)}</p>
              )}
            </div>
          </div>
        </div>
        <RiArrowGoBackFill
          size={25}
          className="cursor-pointer text-[#390d0d]"
          onClick={() => setOpen(false)}
        />
      </div>
      {/* messages/chats */}

      <div className={`px-3 h-[60vh] py-3 overflow-y-scroll w-full`}>
        {messages &&
          messages.map((item, index) => (
            <div
              className={`flex items-center w-full my-2 ${
                item.sender === sellerId ? "justify-end" : "justify-start"
              } `}
              key={index}
              ref={scrollRef}
            >
              {item.text !== "" && (
                <div className="">
                  <div
                    className={` p-2 rounded-[4px] ${
                      item.sender === sellerId
                        ? "bg-[#06a02def]"
                        : "bg-[#f67300]"
                    }`}
                  >
                    <p className="text-white">{item.text}</p>
                  </div>
                  <p className="text-[#555] text-xs font-thin pt-1">
                    {formatDateDays(item.createdAt)}
                  </p>
                </div>
              )}
            </div>
          ))}
      </div>

      {/* send message input */}
      <form
        action=""
        className="p-3 w-full relative"
        onSubmit={sendMessageHandler}
      >
        {/* input image here */}
        <div className="">
          <PiImageLight
            size={30}
            className="cursor-pointer hover:text-[#531a14d2] text-[#071c098a]"
          />
        </div>
        <div className="w-full">
          <input
            type="text"
            required
            id=""
            placeholder="Enter your message"
            className={`${styles.input} p-2 pr-12 w-full`}
            value={newMessage}
            maxLength={500}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <input type="submit" className="hidden" id="send" />
          <label htmlFor="send">
            <BsSend
              size={25}
              className="absolute bottom-5 right-5 cursor-pointer hover:text-[#14531a] text-[#071c09]"
            />
          </label>
        </div>
      </form>
    </div>
  );
};

export default DashboardMessages;
