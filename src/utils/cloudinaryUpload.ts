import { api } from "@/api/axios";

export interface UploadResponse {
  url: string;
  fileId: string;
  thumbnail_url: string;
}

export const uploadToCloudinary = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await api.post<UploadResponse>("/admin/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data.url;
  } catch (error) {
    console.error("Image upload error:", error);
    throw error;
  }
};
