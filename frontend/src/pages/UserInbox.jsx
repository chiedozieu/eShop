import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RiArrowGoBackFill } from "react-icons/ri";
import { BsCheck, BsCheckAll, BsSend } from "react-icons/bs";
import { PiImageLight } from "react-icons/pi";
import { io } from "socket.io-client";
import { backend_url, server } from "../server";
import { formatDateDays, formatFull } from "../utils/dateFormat";
import Header from "../components/layout/Header";
import styles from "../styles/style";
import { displayCurrencyOnly } from "../utils/displayCurrency";
import {
  decrementUnseenCount,
  fetchTotalUnseenCount,
  incrementUnseenCount,
} from "../redux/reducers/messages";

const ENDPOINT = "http://localhost:4000";
const socketId = io(ENDPOINT, { transports: ["websocket"] });


const MessageStatus = ({ status }) => {
  switch (status) {
    case 'sent':
      return <BsCheck className="text-gray-500" />;
    case 'delivered':
      return <BsCheckAll className="text-gray-500" />;
    case 'seen':
      return <BsCheckAll className="text-blue-500" />;
    default:
      return null;
  }
};

const UserInbox = () => {
  const { user } = useSelector((state) => state.user);
  const [conversations, setConversations] = useState([]);
  const [open, setOpen] = useState(false);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState([]);
  const [userData, setUserData] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
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
      if (data.senderId !== user?._id) {
        // Optimistic update
        dispatch(incrementUnseenCount());
        // Validate with server
        dispatch(fetchTotalUnseenCount(user?._id));
      }
    });
  }, [dispatch, user]);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members?.includes(arrivalMessage?.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const response = await axios.get(
          `${server}/conversation/get-all-conversation-user/${user?._id}`,
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
  }, [user, messages]);

  // online users

  useEffect(() => {
    if (user) {
      const userId = user?._id;
      socketId.emit("addUser", userId);
      socketId.on("getUsers", (data) => {
        setOnlineUsers(data);
      });
    }
  }, [user]);

  const onlineCheck = (chat) => {
    const chatMembers = chat.members.find((member) => member !== user?._id);
    const online = onlineUsers.find((user) => user?.userId === chatMembers);

    return online ? true : false;
  };

  // get messages
  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await axios.get(
          `${server}/message/get-all-messages/${currentChat?._id}`,
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
      sender: user?._id,
      text: newMessage,
      conversationId: currentChat?._id,
    };

    const receiverId = currentChat?.members.find(
      (member) => member !== user?._id
    );
    socketId.emit("sendMessage", {
      senderId: user?._id,
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
      lastMessageId: user?._id,
    });

    await axios
      .put(
        `${server}/conversation/update-last-message/${currentChat?._id}`,
        {
          lastMessage: newMessage,
          lastMessageId: user?._id,
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


  const handleMessageSeen = async (conversationId, unseenCount) => {
    try {
      // Optimistic update
      if (unseenCount > 0) {
        dispatch(decrementUnseenCount(unseenCount));
      }
      // Update server
      await axios.put(
        `${server}/message/update-seen/${conversationId}/${user?._id}`,
        {},
        {
          withCredentials: true,
        }
      );
      // Validate the count with server
      dispatch(fetchTotalUnseenCount(user?._id));
    } catch (error) {
      console.log(error);
      // If there's an error, refresh the count from server to ensure accuracy
      dispatch(fetchTotalUnseenCount(user?._id));
    }
  };
  return (
    <div className="w-full mt-20 md:mt-0">
      <Header />
      <div className="md:container p-2 md:mx-auto flex w-full">
        {/* All Messages list */}
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
                  me={user?._id}
                  userData={userData}
                  setUserData={setUserData}
                  online={onlineCheck(item)}
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
              sellerId={user?._id}
              userData={userData}
              scrollRef={scrollRef}
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
  userData,
  setUserData,
  online,
  setActiveIndex,
  activeIndex,
  onMessageSeen,
}) => {
  const [unseenCount, setUnseenCount] = useState(0);
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  // Combined click handler that handles all actions when a conversation is clicked
  const handleConversationClick = () => {
    setActiveIndex(index);
    setOpen(true);
    navigate(`/inbox?${data._id}`);
    setCurrentChat(data);
    setUserData(user);

    // Only update seen status if there are unseen messages
    if (unseenCount > 0) {
      updateSeen();
      onMessageSeen(unseenCount); // Notify parent to update total count
    }
  };

  // Update seen status
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
    const userId = data.members.find((user) => user !== me);
    const getUser = async () => {
      try {
        const res = await axios.get(`${server}/shop/get-shop-info/${userId}`, {
          withCredentials: true,
        });
        setUser(res.data.shop);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [me, data]);

  return (
    <div
      className={`w-full h-[80px] flex p-3 cursor-pointer ${
        index === activeIndex ? "bg-[#ecdb712b]" : "transparent"
      } rounded-md hover:bg-[#ecdb712b] shadow-[0px_.4px_.4px_rgba(0,0,0,0.2)]`}
      onClick={handleConversationClick} // Using the combined click handler
    >
      <div className="relative mb-2">
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
      <div className="flex justify-between w-full ">
        <div className="pl-3">
          <h1 className="text-[18px]">{user?.name}</h1>
          <p className="text-sm font-thin lg:font-normal lg:text-[16px] text-[#555]">
            {data?.lastMessageId !== userData?._id
              ? "You:"
              : userData?.name?.includes(" ")
              ? userData?.name.split(" ")[0] + ":"
              : userData?.name + ":"}

            {data?.lastMessage?.length > 20
              ? data.lastMessage.slice(0, 20) + "..."
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

  useEffect(() => {
    socketId.on('messageSent', (data) => {
      // Update message status to 'sent'
      
    });
  
    socketId.on('messageDelivered', (data) => {
      // Update message status to 'delivered'
    });
  
    socketId.on('messageSeen', (data) => {
      // Update message status to 'seen'
      
    });
  
    // Don't forget to clean up
    return () => {
      socketId.off('messageSent');
      socketId.off('messageDelivered');
      socketId.off('messageSeen');
    };
  }, []);
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
              {item?.text !== "" && (
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
                  {/* Message status */}
                  {item.sender === sellerId && (
                      <MessageStatus status={item.status} />
                    )}
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

export default UserInbox;
