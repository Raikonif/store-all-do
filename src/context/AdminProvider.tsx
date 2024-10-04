import AdminContext from "@/context/AdminContext.tsx";
import { ReactNode, useState } from "react";
import { IFile, IFolder } from "@/interfaces/DOFileFolder.ts";

interface Props {
  children: ReactNode;
}

function AdminProvider({ children }: Props) {
  const [loading, setLoading] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenFolder, setIsOpenFolder] = useState(false);
  const [files, setFiles] = useState<IFile[]>([] as IFile[]);
  const [folders, setFolders] = useState<IFolder[]>([] as IFolder[]);
  const [filteredFolders, setFilteredFolders] = useState<IFolder[]>(folders);
  const [filteredFiles, setFilteredFiles] = useState<IFile[]>(files);
  const [currentItem, setCurrentItem] = useState<IFile>({} as IFile);
  const [currentFolder, setCurrentFolder] = useState<IFolder>({} as IFolder);
  const [currentPath, setCurrentPath] = useState("nandy-files/");
  const [folderName, setFolderName] = useState("");
  const [isFolder, setIsFolder] = useState(false);

  return (
    <AdminContext.Provider
      value={{
        isOpenUpload,
        setIsOpenUpload,
        isOpenDelete,
        setIsOpenDelete,
        isOpenFolder,
        setIsOpenFolder,
        currentItem,
        setCurrentItem,
        loading,
        setLoading,
        files,
        setFiles,
        filteredFiles,
        setFilteredFiles,
        folders,
        setFolders,
        filteredFolders,
        setFilteredFolders,
        currentFolder,
        setCurrentFolder,
        currentPath,
        setCurrentPath,
        folderName,
        setFolderName,
        isFolder,
        setIsFolder,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
