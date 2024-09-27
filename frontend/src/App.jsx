import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import Login from "./components/Organisms/Authentication/Login";
import { useSelector } from "react-redux";
import Signup from "./components/Organisms/Authentication/Signup";

function App() {
  const { isLogin } = useSelector((state) => state.commonData);
  console.log("lo", isLogin);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLogin ? <Login /> : <Signup />} exact />
        <Route path="/chats" element={<ChatPage />} />
      </Routes>
    </div>
  );
}

export default App;
