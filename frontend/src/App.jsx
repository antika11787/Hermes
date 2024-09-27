import { Route, Routes } from "react-router-dom";
import "./App.css";
import ChatPage from "./pages/ChatPage";
import Login from "./components/Organisms/Authentication/Login";
import { useSelector } from "react-redux";
import Signup from "./components/Organisms/Authentication/Signup";
import ProfilePage from "./pages/ProfilePage";
import { Navigate } from "react-router-dom";

function App() {
  const { isLogin } = useSelector((state) => state.commonData);
  const { token } = useSelector((state) => state.user);
  console.log("lo", isLogin);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={isLogin ? <Login /> : <Signup />} exact />
        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <Navigate to="/" replace />}
        />
        <Route
          path="/chats"
          element={token ? <ChatPage /> : <Navigate to="/" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
