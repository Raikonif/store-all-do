import AdminContext from "@/context/AdminContext.tsx";
import { ReactNode, useEffect, useState } from "react";
import { FileDo } from "@/interfaces/FileDo.ts";

interface Props {
  children: ReactNode;
}

function AdminProvider({ children }: Props) {
  const [loading, setLoading] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [files, setFiles] = useState<any[]>([] as any[]);
  const [folders, setFolders] = useState<any[]>([] as any[]);
  const [filteredFolders, setFilteredFolders] = useState<any[]>(folders);
  const [filteredFiles, setFilteredFiles] = useState<any[]>(files);
  const [currentItem, setCurrentItem] = useState<FileDo>({} as FileDo);
  const [currentPath, setCurrentPath] = useState("nandy-files/");

  useEffect(() => {}, []);

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
