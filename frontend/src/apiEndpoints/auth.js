import { axiosInstance } from "../utils/axiosInstance";
import { toast } from "react-toastify";

export const SignupApi = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/signup", formData);
    const data = response.data;

    console.log("data", data);

    if (data.success === true) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message || "An unknown error occurred during signup");
    }
  }
};

export const LoginApi = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/login", formData);
    const data = response.data;

    console.log("data", data.message);

    if (data.success === true) {
      toast.success(data.message);
      return data.data;
    } else {
      toast.error(data.message);
    }
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error(error.message || "An unknown error occurred during login");
    }
  }
};
