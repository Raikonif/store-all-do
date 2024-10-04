import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "@/constants/general.constants";
import { storeAPI } from "@/services/storeAPI.ts";

const listDOObjects = async (path?: string): Promise<AxiosResponse> => {
  try {
    return await axios.get(BACKEND_URL + `/api/files/list_obj?prefix_dir=${path}`);
  } catch (error) {
    console.error("Error listing DigitalOcean Spaces objects:", error);
    throw error;
  }
};

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

const createFolderDOSpaces = async (fullPath: string): Promise<AxiosResponse> => {
  const encodedPath = encodeURIComponent(fullPath);
  try {
    return await storeAPI.post(`/api/files/create_folder/${encodedPath}`);
  } catch (error) {
    console.error("Error creating folder in DigitalOcean Spaces:", error);
    throw error;
  }
};

const deleteFromDOSpaces = async (filename: string): Promise<AxiosResponse> => {
  try {
    const decodedFileName = decodeURIComponent(filename);
    const encodedFileName = encodeURIComponent(decodedFileName);
    return await axios.delete(BACKEND_URL + "/api/files/remove_file/" + encodedFileName);
  } catch (error) {
    console.error("Error deleting file from DigitalOcean Spaces:", error);
    throw error;
  }
};

const deleteFolderFromDOSpaces = async (folderName: string): Promise<AxiosResponse> => {
  try {
    const encodedFolderName = decodeURIComponent(folderName);
    return await storeAPI.delete(`/api/files/remove_folder/${encodedFolderName}`);
  } catch (error) {
    console.error("Error deleting folder from DigitalOcean Spaces:", error);
    throw error;
  }
};

const downloadFromDOSpaces = async (filePath: string): Promise<void> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/files/download/${filePath}`, {
      responseType: "blob", // Important for file download
    });
    console.log("response", response);
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export {
  listDOObjects,
  uploadToDOSpaces,
  createFolderDOSpaces,
  deleteFromDOSpaces,
  deleteFolderFromDOSpaces,
  downloadFromDOSpaces,
};
