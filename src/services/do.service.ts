import axios, { AxiosResponse } from "axios";
import { storeAPI } from "@/services/storeAPI.ts";
import { BACKEND_URL } from "@/constants/general.constants";

const uploadToDOSpaces = async (formData: FormData): Promise<AxiosResponse> => {
  try {
    return await axios.post(BACKEND_URL + "/api/files/upload", formData);
  } catch (error) {
    console.error("Error uploading to DigitalOcean Spaces:", error);
    throw error;
  }
};

const deleteFromDOSpaces = async (filename: string | number): Promise<AxiosResponse> => {
  try {
    return await storeAPI.post("/api/files/delete", null, {
      params: {
        filename,
      },
    });
  } catch (error) {
    console.error("Error deleting file from DigitalOcean Spaces:", error);
    throw error;
  }
};

export { uploadToDOSpaces, deleteFromDOSpaces };
