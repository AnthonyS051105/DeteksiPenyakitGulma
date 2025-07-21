import axios from "axios";

export const uploadToImgBB = async (file) => {
  try {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.data.success) {
      return {
        success: true,
        url: response.data.data.url,
        deleteUrl: response.data.data.delete_url,
        displayUrl: response.data.data.display_url,
      };
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("ImgBB upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

export const uploadBase64ToImgBB = async (base64String) => {
  try {
    const formData = new FormData();
    formData.append("image", base64String);
    formData.append("key", process.env.NEXT_PUBLIC_IMGBB_API_KEY);

    const response = await axios.post(
      "https://api.imgbb.com/1/upload",
      formData
    );

    if (response.data.success) {
      return {
        success: true,
        url: response.data.data.url,
        deleteUrl: response.data.data.delete_url,
        displayUrl: response.data.data.display_url,
      };
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    console.error("ImgBB upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};
