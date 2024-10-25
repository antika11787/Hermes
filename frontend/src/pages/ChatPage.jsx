import { useEffect, useState } from "react";
import { GetAllChatsApi } from "../apiEndpoints/chat";

const ChatPage = () => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      const response = await GetAllChatsApi();
      setChats(response);
    };

    fetchChats();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <h1>Chat Page</h1>
      <div style={{ display: "flex" }}>
        <div style={{ width: "30%", display: "flex", flexDirection: "column", gap: "20px" }}>
          {chats?.map((chat) => {
            return (
              <div key={chat._id}>
                <p>{chat.chatName}</p>
                <p>{chat.latestMessage?.content}</p>
              </div>
            );
          })}
        </div>
        <div
          style={{
            width: "70%",
          }}
        ></div>
      </div>
    </div>
  );
};

export default ChatPage;
