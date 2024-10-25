import { useForm } from "react-hook-form";
import Form from "../../molecules/form";
import Button from "../../atoms/button";
import { LoginApi } from "../../../apiEndpoints/auth";
import { useDispatch } from "react-redux";
import { saveLogin } from "../../../redux/slices/userSlice";
import Header from "../../molecules/header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await LoginApi(data);
      const { email, userID, imageUrl, token } = response;

      dispatch(saveLogin({ email, userID, imageUrl, token }));
      navigate("/chats");
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form
          label="Email"
          type="email"
          name="email"
          control={control}
          placeholder="Enter your email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          }}
          errors={errors}
        />
        <Form
          isPassword={true}
          label="Password"
          type="password"
          name="password"
          control={control}
          placeholder="Enter your password"
          rules={{
            required: "Password is required",
            pattern: {
              value: /^(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{6,}$/,
              message:
                "Password must be at least 6 characters, contain at least one special characters and one number",
            },
          }}
          errors={errors}
        />
        <div>
          Don&apos;t have an account?<Button value="Sign Up"></Button>
        </div>

        <Button type="submit" value="Login"></Button>
      </form>
    </div>
  );
};

export default Login;
