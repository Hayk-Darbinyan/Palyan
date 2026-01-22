import { IMAGEKIT_CONFIG } from "@/config/cloudinaryConfig";

export const uploadToCloudinary = async (file: File): Promise<string> => {
  if (!IMAGEKIT_CONFIG.publicKey || !IMAGEKIT_CONFIG.urlEndpoint) {
    throw new Error(
      "ImageKit configuration is missing. Please set VITE_IMAGEKIT_PUBLIC_KEY and VITE_IMAGEKIT_URL_ENDPOINT in your environment variables."
    );
  }

  const formData = new FormData();
  formData.append("file", file);
  formData.append("publicKey", IMAGEKIT_CONFIG.publicKey);

  try {
    const response = await fetch(
      `https://upload.imagekit.io/api/v1/files/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error("Failed to upload image to ImageKit");
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error("ImageKit upload error:", error);
    throw error;
  }
};
