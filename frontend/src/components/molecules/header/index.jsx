import Button from "../../atoms/button";
import { useNavigate } from "react-router-dom";

import "./index.scss";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="m-header">
      <Button
        value="Login"
        type="button"
        onClick={() => {
          navigate("/login");
        }}
      />
      <Button
        value="Sign Up"
        type="button"
        onClick={() => {
          navigate("/signup");
        }}
      />
    </div>
  );
};

export default Header;
