import AdminContext from "@/context/AdminContext";
import { IFile, IFolder } from "@/interfaces/DOFileFolder";
import { useContext, useEffect } from "react";
import FolderRow from "./FolderRow";
import FileRow from "./FileRow";

interface Props {
  item: IFile | IFolder;
  index: number;
}

function RowTable({ item, index }: Props) {
  const { checkedFilesFolders } = useContext(AdminContext);

  useEffect(() => {
    console.log("checkedFilesFolders: ", checkedFilesFolders);
  }, [checkedFilesFolders]);

  return (
    <>
      {"Prefix" in item ? (
        // Folder
        <FolderRow index={index} item={item} />
      ) : (
        // File
        <FileRow index={index} item={item} />
      )}
    </>
  );
}

export default RowTable;
