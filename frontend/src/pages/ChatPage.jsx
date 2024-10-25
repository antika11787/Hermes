import { useEffect, useState } from "react";
import { GetAllChatsApi } from "../apiEndpoints/chat";
import ChatList from "../components/molecules/chatList";

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
      <ChatList chats={chats} />
    </div>
  );
};

export default ChatPage;
