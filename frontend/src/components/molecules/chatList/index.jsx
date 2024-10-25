const ChatList = ({ chats }) => {
  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
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
  );
};

export default ChatList;
