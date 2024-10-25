import { axiosInstance } from "../utils/axiosInstance";
import {
  handleApiResponseWithoutToast,
  handleApiError,
  handleApiResponse,
} from "../utils/apiResponseHandler";

// Image upload API
export const ImageUploadApi = async (formData, userID) => {
  try {
    const response = await axiosInstance.post(
      `/api/v1/user/upload/${userID}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return handleApiResponse(response);
  } catch (error) {
    handleApiError(error);
  }
};

// profile API
export const ProfileApi = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/user/profile`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleApiResponseWithoutToast(response);
  } catch (error) {
    handleApiError(error);
  }
};

// profile pic API
export const ProfilePicApi = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/user/profile-pic`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleApiResponseWithoutToast(response);
  } catch (error) {
    handleApiError(error);
  }
};
