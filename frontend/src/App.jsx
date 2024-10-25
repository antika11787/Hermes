import { Route, Routes } from "react-router-dom";
import ChatPage from "./pages/ChatPage";
import { useSelector } from "react-redux";
import ProfilePage from "./pages/ProfilePage";
import { Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import "./App.css";

function App() {
  const { token } = useSelector((state) => state.user);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/profile"
          element={token ? <ProfilePage /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/chats"
          element={token ? <ChatPage /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
