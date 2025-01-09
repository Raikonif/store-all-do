import { Download, Eye, FolderIcon, Trash } from "lucide-react";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext, useState } from "react";
import { downloadFromDOSpaces, listDOObjects } from "@/services/do.service.ts";
import { DO_SPACES_URL } from "@/constants/general.constants.ts";
import convertToNaturalDate from "@/helpers/convertToNaturalDate.ts";
import { IFile, IFolder } from "@/interfaces/DOFileFolder.ts";
import toast from "react-hot-toast";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { FaFileArchive, FaFolder } from "react-icons/fa";
import RowTable from "@/components/RowTable";

interface Props {
  data: (IFile | IFolder)[];
}

function ListFilesView({ data }: Props) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const {
    setIsOpenDelete,
    setCurrentItem,
    setFiles,
    setFolders,
    setCurrentPath,
    setCurrentFolder,
    setIsFolder,
    isFolder,
  } = useContext(AdminContext);

  const navigateToFolder = async (folder: IFolder) => {
    setIsFolder(true);
    setCurrentPath(folder.Prefix);
    const { data } = await listDOObjects(folder.Prefix);
    setFolders(data.folders);
    setFiles(data.files);
  };

  const handleOpenDelete = (data: IFile | IFolder, e) => {
    e.stopPropagation();
    if (!isFolder) {
      setCurrentItem(data as IFile);
    } else {
      setCurrentFolder(data as IFolder);
    }
    setIsOpenDelete(true);
  };

  const handleDownloadFile = async (url: string) => {
    toast.success("Descargando archivo...");
    // downloadFile();
    await downloadFromDOSpaces(url);
    toast.success("Archivo descargado");
  };

  const openFile = (file: IFile) => {
    window.open(DO_SPACES_URL + "/" + file.Key, "_blank");
  };

  return (
    <>
      {data && Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => <RowTable key={index} item={item} index={index} />)
      ) : (
        <tr>
          <td colSpan={4} className="text-center text-gray-400">
            No se encontraron archivos ni carpetas
          </td>
        </tr>
      )}
    </>
  );
}

export default ListFilesView;
