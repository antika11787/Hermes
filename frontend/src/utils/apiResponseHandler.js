import { toast } from "react-toastify";

const handleApiResponse = (response) => {
  const data = response.data;

  console.log("API response:", data.data);
  if (data.success === true) {
    toast.success(data.message);
    return data.data;
  } else {
    toast.error(data.message);
    throw new Error(data.message);
  }
};

const handleApiResponseWithoutToast = (response) => {
  const data = response.data;

  console.log("API response:", data.data);
  if (data.success === true) {
    return data.data;
  } else {
    throw new Error(data.message);
  }
};

const handleApiError = (error) => {
  console.error("API error:", error);
  if (error.response && error.response.data) {
    console.error("Error response data:", error.response.data);
    const errorData = error.response.data;

    if (errorData.validation && errorData.validation.length > 0) {
      const firstError = errorData.validation[0].msg;
      console.log("Error:", firstError);
    } else if (errorData.message) {
      console.log("Error:", errorData.message);
    } else {
      console.log("An unknown error occurred during the request");
    }
  } else {
    console.log(
      error.message || "An unknown error occurred during the request"
    );
  }
};

export { handleApiResponse, handleApiError, handleApiResponseWithoutToast };
