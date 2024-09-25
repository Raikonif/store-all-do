import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "@/constants/general.constants";

const uploadToDOSpaces = async (formData: FormData): Promise<AxiosResponse> => {
  try {
    return await axios.post(BACKEND_URL + "/api/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error) {
    console.error("Error uploading to DigitalOcean Spaces:", error);
    throw error;
  }
};

const deleteFromDOSpaces = async (filename: string): Promise<AxiosResponse> => {
  try {
    const decodedFileName = decodeURIComponent(filename);
    const encodedFileName = encodeURIComponent(decodedFileName);
    return await axios.delete(BACKEND_URL + "/api/files/remove_file_do/" + encodedFileName);
  } catch (error) {
    console.error("Error deleting file from DigitalOcean Spaces:", error);
    throw error;
  }
};

export { uploadToDOSpaces, deleteFromDOSpaces };
