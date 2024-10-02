import axios, { AxiosResponse } from "axios";
import { BACKEND_URL } from "@/constants/general.constants";

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

const downloadFromDOSpaces = async (fileUrl: string): Promise<void> => {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/files/${fileUrl}`, {
      responseType: "blob", // Important for file download
    });

    // Create a link element to trigger download
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileUrl);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (error) {
    console.error("Error downloading file:", error);
  }
};

export { listDOObjects, uploadToDOSpaces, deleteFromDOSpaces, downloadFromDOSpaces };
