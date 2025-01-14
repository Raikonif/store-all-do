import { DO_SPACES_URL } from "@/constants/general.constants";
import AdminContext from "@/context/AdminContext";
import convertToNaturalDate from "@/helpers/convertToNaturalDate";
import { IFile, IFolder } from "@/interfaces/DOFileFolder";
import { downloadFromDOSpaces, listDOObjects } from "@/services/do.service";
import { Download, Eye, FolderIcon, Trash } from "lucide-react";
import { MouseEvent, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaFileArchive, FaFolder } from "react-icons/fa";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import FolderRow from "./FolderRow";
import { GiConsoleController } from "react-icons/gi";
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
