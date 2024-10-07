// components/layout/RootLayout.jsx
import React, { useEffect } from "react";
import { io } from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { fetchTotalUnseenCount } from "../../redux/reducers/messages";
import { fetchTotalUnseenCountSeller } from "../../redux/reducers/messagesSeller";

const ENDPOINT = "http://localhost:4000";
const socketId = io(ENDPOINT, { transports: ["websocket"] });

const RootLayout = ({ children }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { seller } = useSelector((state) => state.seller);
  const { initialized } = useSelector((state) => state.messages);

  useEffect(() => {
    // Fetch total unseen count when the app loads and user is available
    if (user?._id && !initialized) {
      dispatch(fetchTotalUnseenCount(user._id));
    }
  }, [dispatch, user, initialized]);

  useEffect(() => {
    if (seller?._id && !initialized) {
      dispatch(fetchTotalUnseenCountSeller(seller._id));
    }
  }, [dispatch, initialized, seller]);

  // Set up socket listener for real-time updates
  useEffect(() => {
    if (user?._id) {
      socketId.on("getMessage", () => {
        // Refresh the total count when receiving new message
        dispatch(fetchTotalUnseenCount(user._id));
      });

      return () => {
        socketId.off("getMessage");
      };
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (seller?._id) {
      socketId.on("getMessage", () => {
        // Refresh the total count when receiving new message
        dispatch(fetchTotalUnseenCountSeller(seller._id));
      });

      return () => {
        socketId.off("getMessage");
      };
    }
  }, [dispatch, seller]);

  return <>{children}</>;
};

export default RootLayout;
