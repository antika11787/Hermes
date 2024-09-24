import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  const getChats = async () => {
    try {
      const response = await axios.get("/api/chats");
      setChats(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    getChats();
  }, []);

  console.log(chats);

  return (
    <div>
      {chats.length === 0 ? (
        <p>No Chats</p>
      ) : (
        chats.map((chat) => <p key={chat._id}>{chat.chatName}</p>)
      )}
    </div>
  );
};

export default ChatPage;
