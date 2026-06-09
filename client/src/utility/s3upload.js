import axios from "axios";
import axiosInstance from "../services/axios";
import * as Sentry from '@sentry/react';

export const uploadAssessmentToS3 = async (file, setUploadProgress) => {
  try {
    // Step 1: Call the assessment-specific upload URL endpoint
    const res = await axiosInstance.post("/auth/candidate/get-assessment-upload-url", {
      fileName: file.name,
      fileType: file.type,
    });

    const { uploadUrl, publicUrl } = res.data;

    // Step 2: Upload file directly to S3
    await axios.put(uploadUrl, file, {
      headers: {
        "Content-Type": file.type,
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        setUploadProgress(percent);
      },
    });

    return publicUrl; // This is the CloudFront-accessible URL to save in DB
  } catch (err) {
    Sentry.captureException(err, {
      tags: { file: "s3upload.js", action: "uploadAssessmentToS3", role: "candidate" },
      extra: { response: err?.response?.data, message: err?.message },
    });
    throw new Error("Assessment upload failed: " + err.message);
  }
};

export const uploadScreenshotToS3 = async (imageFile, setUploadProgress) => {
  try {
    // Step 1: Get presigned upload URL and final public URL from backend
    const res = await axiosInstance.post("/auth/candidate/get-screenshot-upload-url", {
      fileName: imageFile.name,
      fileType: imageFile.type,
    });

    const { uploadUrl, publicUrl } = res.data;

    // Step 2: Upload image to S3 using the presigned URL
    await axios.put(uploadUrl, imageFile, {
      headers: {
        "Content-Type": imageFile.type,
      },
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setUploadProgress(progress);
      },
    });

    // Step 3: Return public CloudFront URL to store in DB or show in UI
    return publicUrl;
  } catch (error) {
    Sentry.captureException(error, {
      tags: { file: "s3upload.js", action: "uploadScreenshotToS3", role: "candidate" },
      extra: { response: error?.response?.data, message: error?.message },
    });
    throw new Error(error.message || "Error uploading screenshot to S3");
  }
};
