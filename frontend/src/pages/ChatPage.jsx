import { useForm } from "react-hook-form";
import Form from "../components/Molecules/Form";
import Button from "../components/Atoms/Button";
import { ImageUploadApi } from "../apiEndpoints/auth";
import { useSelector } from "react-redux";
import { useState } from "react";

const ChatPage = () => {
  const { userID } = useSelector((state) => state.user);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      image: "",
    },
  });

  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await ImageUploadApi(formData, userID);
      setImageUrl(response.imageUrl);
      console.log(response);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <Form
          label="Upload a Profile Picture"
          type="file"
          name="image"
          onChange={handleFileChange}
          control={control}
          placeholder="Enter your profile picture"
          errors={errors}
        />
        <Button type="submit" value="Upload"></Button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ChatPage;
