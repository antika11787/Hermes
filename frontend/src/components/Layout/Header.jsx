import React from "react";
import Button from "../Atoms/Button";
const Header = ({ showLogin, showSignup }) => {
  return (
    <div>
      <Button value="Login" type="button" onClick={showLogin} />
      <Button value="Sign Up" type="button" onClick={showSignup} />
    </div>
  );
};

export default Header;
