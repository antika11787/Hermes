import { axiosInstance } from "../utils/axiosInstance";
import {
  handleApiResponse,
  handleApiError,
} from "../utils/apiResponseHandler";

// Sign up API
export const SignupApi = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/signup", formData);
    return handleApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

// Login API
export const LoginApi = async (formData) => {
  try {
    const response = await axiosInstance.post("/api/v1/auth/login", formData);
    return handleApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};


