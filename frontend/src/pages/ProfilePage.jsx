import { useForm } from "react-hook-form";
import Form from "../components/Molecules/Form";
import Button from "../components/Atoms/Button";
import { ImageUploadApi } from "../apiEndpoints/auth";
import { useSelector } from "react-redux";
import { useState } from "react";
import { removeLogin } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const logout = () => {
    dispatch(removeLogin());
    navigate("/");
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
      <Button value="Logout" onClick={logout}></Button>
    </div>
  );
};

export default ProfilePage;
