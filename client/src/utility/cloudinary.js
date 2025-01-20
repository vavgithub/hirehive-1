import axios from "axios";
const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

export const uploadAssessment = async (videoFile,setUploadProgress) => {
  try {
    const formData = new FormData();
    formData.append("file", videoFile);
    formData.append(
      "upload_preset",
      CLOUDINARY_UPLOAD_PRESET
    ); // Use the preset from .env
    formData.append("resource_type", "video"); // Specify that it's a video

    const response = await axios.post(
      CLOUDINARY_URL,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      }
    );

    if (response.data.secure_url) {
        return response.data.secure_url
    } else {
      throw new Error("Cloudinary : Can't generate URL")
    }
  } catch (error) {
    console.log("Cloudinary Error : ", error);
    throw new Error(error.message || "Error uplaoding to cloudinary");
  }
};
