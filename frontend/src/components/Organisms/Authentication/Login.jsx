import { useForm } from "react-hook-form";
import Form from "../../Molecules/Form";
import Button from "../../Atoms/Button";
import { LoginApi } from "../../../apiEndpoints/auth";
import { useDispatch } from "react-redux";
import { saveLogin } from "../../../redux/slices/userSlice";

const Login = () => {
  const dispatch = useDispatch();
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
      dispatch(saveLogin(response));
      console.log(response);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div>
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

        <Button type="submit" value="Login"></Button>
      </form>
    </div>
  );
};

export default Login;