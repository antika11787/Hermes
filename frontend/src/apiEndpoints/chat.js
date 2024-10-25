import { axiosInstance } from "../utils/axiosInstance";
import {
  handleApiResponseWithoutToast,
  handleApiError,
} from "../utils/apiResponseHandler";

// get all chats API
export const GetAllChatsApi = async () => {
  try {
    const response = await axiosInstance.get(`/api/v1/chat/fetch-chats`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return handleApiResponseWithoutToast(response);
  } catch (error) {
    handleApiError(error);
  }
};
