import AdminContext from "@/context/AdminContext.tsx";
import { ReactNode, useEffect, useState } from "react";
import { IFile, IFolder } from "@/interfaces/DOFileFolder.ts";

interface Props {
  children: ReactNode;
}

function AdminProvider({ children }: Props) {
  const [loading, setLoading] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [files, setFiles] = useState<IFile[]>([] as IFile[]);
  const [folders, setFolders] = useState<IFolder[]>([] as IFolder[]);
  const [filteredFolders, setFilteredFolders] = useState<IFolder[]>(folders);
  const [filteredFiles, setFilteredFiles] = useState<IFile[]>(files);
  const [currentItem, setCurrentItem] = useState<IFile>({} as IFile);
  const [currentPath, setCurrentPath] = useState("nandy-files/");

  useEffect(() => {
    console.log("current item", currentItem);
  }, [currentItem]);

  return (
    <AdminContext.Provider
      value={{
        isOpenUpload,
        setIsOpenUpload,
        isOpenDelete,
        setIsOpenDelete,
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
        currentPath,
        setCurrentPath,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
