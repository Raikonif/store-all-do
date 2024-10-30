import { createContext } from "react";
import { IFile, IFolder } from "@/interfaces/DOFileFolder.ts";

interface AdminContextData {
  user: object | null;
  setUser: (user: object) => void;
  isOpenUpload: boolean;
  setIsOpenUpload: (open: boolean) => void;
  isOpenDelete: boolean;
  setIsOpenDelete: (open: boolean) => void;
  isOpenFolder: boolean;
  setIsOpenFolder: (open: boolean) => void;
  currentItem: IFile;
  setCurrentItem: (item: IFile) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
  files: IFile[];
  setFiles: (files: IFile[]) => void;
  filesPrev: File[];
  setFilesPrev: (files: File[]) => void;
  filteredFiles: IFile[];
  setFilteredFiles: (files: IFile[]) => void;
  folders: IFolder[];
  setFolders: (folders: IFolder[]) => void;
  filteredFolders: IFolder[];
  setFilteredFolders: (folders: IFolder[]) => void;
  currentFolder: IFolder;
  setCurrentFolder: (folder: IFolder) => void;
  currentPath: string;
  setCurrentPath: (path: string) => void;
  folderName: string;
  setFolderName: (name: string) => void;
  isFolder: boolean;
  setIsFolder: (folder: boolean) => void;
  foldersFiles: (IFile | IFolder)[];
  setFoldersFiles: (files: (IFile | IFolder)[]) => void;
}

const AdminContext = createContext<AdminContextData>({} as AdminContextData);

export default AdminContext;
