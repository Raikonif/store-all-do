import AdminContext from "@/context/AdminContext.tsx";
import { ReactNode, useState } from "react";
import { IFile, IFolder } from "@/interfaces/DOFileFolder.ts";

interface Props {
  children: ReactNode;
}

function AdminProvider({ children }: Props) {
  const [user, setUser] = useState<object | null>({});
  const [loading, setLoading] = useState(false);
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [isOpenFolder, setIsOpenFolder] = useState(false);

  const [files, setFiles] = useState<IFile[]>([] as IFile[]);
  const [filesPrev, setFilesPrev] = useState<File[]>([] as File[]);
  const [filteredFiles, setFilteredFiles] = useState<IFile[]>(files);

  const [folders, setFolders] = useState<IFolder[]>([] as IFolder[]);
  const [filteredFolders, setFilteredFolders] = useState<IFolder[]>(folders);
  const [currentItem, setCurrentItem] = useState<IFile>({} as IFile);
  const [currentFolder, setCurrentFolder] = useState<IFolder>({} as IFolder);
  const [currentPath, setCurrentPath] = useState("nandy-files/");
  const [folderName, setFolderName] = useState("");
  const [isFolder, setIsFolder] = useState(false);

  const [foldersFiles, setFoldersFiles] = useState<(IFile | IFolder)[]>([]);

  const [checkedFilesFolders, setCheckedFilesFolders] = useState<(IFile | IFolder)[]>([]);

  return (
    <AdminContext.Provider
      value={{
        user,
        setUser,
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
        filesPrev,
        setFilesPrev,
        filteredFiles,
        setFilteredFiles,
        folders,
        setFolders,
        filteredFolders,
        setFilteredFolders,
        foldersFiles,
        setFoldersFiles,
        currentFolder,
        setCurrentFolder,
        currentPath,
        setCurrentPath,
        folderName,
        setFolderName,
        isFolder,
        setIsFolder,
        checkedFilesFolders,
        setCheckedFilesFolders,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
