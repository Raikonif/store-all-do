import { FileDo, FileDoOP } from "@/interfaces/FileDo.ts";
import { storeAPI } from "@/services/storeAPI.ts";
import { BACKEND_URL } from "@/constants/general.constants.ts";

const getFiles = () => {
  console.log("backend", BACKEND_URL);
  return storeAPI.get<FileDo[]>("/api/files");
};

const createFile = (data: FileDoOP) => {
  return storeAPI.post("/api/files", data);
};

const deleteFile = (id: number) => {
  return storeAPI.delete(`/api/files/${id}`);
};

export { getFiles, createFile, deleteFile };
