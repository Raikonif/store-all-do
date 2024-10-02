import { createContext } from "react";
import { IFile, IFolder } from "@/interfaces/DOFileFolder.ts";

interface AdminContextData {
  isOpenUpload: boolean;
  setIsOpenUpload: (open: boolean) => void;
  isOpenDelete: boolean;
  setIsOpenDelete: (open: boolean) => void;
  currentItem: IFile;
  setCurrentItem: (item: IFile) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
  files: IFile[];
  setFiles: (files: IFile[]) => void;
  filteredFiles: IFile[];
  setFilteredFiles: (files: IFile[]) => void;
  folders: IFolder[];
  setFolders: (folders: IFolder[]) => void;
  filteredFolders: IFolder[];
  setFilteredFolders: (folders: IFolder[]) => void;
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

const AdminContext = createContext<AdminContextData>({} as AdminContextData);

export default AdminContext;
