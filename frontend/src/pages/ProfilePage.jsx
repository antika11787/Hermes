import { useForm } from "react-hook-form";
import Form from "../components/molecules/form";
import Button from "../components/atoms/button";
import { ImageUploadApi } from "../apiEndpoints/user";
import { ProfileApi } from "../apiEndpoints/user";
import { ProfilePicApi } from "../apiEndpoints/user";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
  const [profile, setProfile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await ImageUploadApi(formData, userID);
      setImageUrl(response.imageUrl);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const logout = () => {
    dispatch(removeLogin());
    navigate("/login");
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const response = await ProfileApi();
      setProfile(response);
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchProfilePic = async () => {
      const response = await ProfilePicApi();
      setImageUrl(response?.imageUrl);
    };

    fetchProfilePic();
  }, []);

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

      <Button value="Logout" onClick={logout}></Button>

      <h1>Profile Page</h1>
      <p>Name: {profile?.username}</p>
      <p>Email: {profile?.email}</p>
      {imageUrl && <img src={imageUrl} alt="Uploaded" />}
    </div>
  );
};

export default ProfilePage;
