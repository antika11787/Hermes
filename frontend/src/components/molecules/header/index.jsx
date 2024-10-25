import Button from "../../atoms/button";
import { saveLoginPageState } from "../../../redux/slices/commonDataSlice";
import { useDispatch } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();
  const showLogin = () => {
    dispatch(saveLoginPageState({ isLogin: true }));
  };

  const showSignup = () => {
    dispatch(saveLoginPageState({ isLogin: false }));
  };

  return (
    <div>
      <Button value="Login" type="button" onClick={showLogin} />
      <Button value="Sign Up" type="button" onClick={showSignup} />
    </div>
  );
};

export default Header;
