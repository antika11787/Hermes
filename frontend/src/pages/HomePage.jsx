import React from "react";
import Signup from "../components/Organisms/Authentication/Signup";
import Login from "../components/Organisms/Authentication/Login";
import { useState } from "react";
import Header from "../components/Layout/Header";

const HomePage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const showLogin = () => {
    setIsLogin(true);
  };

  const showSignup = () => {
    setIsLogin(false);
  };
  return (
    <div>
      <Header showLogin={showLogin} showSignup={showSignup} />
      {isLogin ? <Login /> : <Signup />}
    </div>
  );
};

export default HomePage;
