import Form from "../../Molecules/Form";
import { useForm } from "react-hook-form";
import Button from "../../Atoms/Button";
import { SignupApi } from "../../../apiEndpoints/auth";

const Signup = () => {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");

  const onSubmit = async (data) => {
    try {
      const response = await SignupApi(data);
      console.log(response);
    } catch (error) {
      console.log("Error:", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Form
          label="Username"
          type="text"
          name="username"
          control={control}
          placeholder="Enter your username"
          rules={{
            required: "Username is required",
          }}
          errors={errors}
        />
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
        <Form
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          control={control}
          placeholder="Confirm password"
          rules={{
            required: "Please confirm your password",
            validate: (value) =>
              value === password || "Passwords do not match",
          }}
          
          errors={errors}
        />

        <Button type="submit" value="Sign Up"></Button>
      </form>
    </div>
  );
};

export default Signup;