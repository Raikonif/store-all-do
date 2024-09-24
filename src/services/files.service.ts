import axios from "axios";
import { BACKEND_URL } from "@/constants/general.constants.ts";
import { FileDoOP } from "@/interfaces/FileDo.ts";
import { storeAPI } from "@/services/storeAPI.ts";

const getFiles = () => {
  return axios.get(`${BACKEND_URL}/api/files`);
};

const createFile = (data: FileDoOP) => {
  return storeAPI.post("/api/files", data);
};

const updateFile = (data: FileDoOP) => {
  return axios.put(`${BACKEND_URL}/api/files/${data.id}`, data);
};

const deleteFile = (id: number) => {
  return axios.delete(`${BACKEND_URL}/api/files/${id}`);
};

export { getFiles, createFile, updateFile, deleteFile };
