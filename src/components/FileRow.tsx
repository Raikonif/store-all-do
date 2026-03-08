import { DO_SPACES_URL } from "@/constants/general.constants";
import AdminContext from "@/context/AdminContext";
import convertToNaturalDate from "@/helpers/convertToNaturalDate";
import { IFile } from "@/interfaces/DOFileFolder";
import { getPresignedUrlDOSpaces } from "@/services/do.service";
import { Download, Eye, FolderIcon, Trash } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaFileArchive } from "react-icons/fa";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface Props {
  item: IFile;
  index: number;
}

function FileRow({ item, index }: Props) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

  const {
    setIsFolder,
    setCurrentItem,
    setIsOpenDelete,
    setCheckedFilesFolders,
    checkedFilesFolders,
    isAllChecked,
    bucketName,
  } = useContext(AdminContext);

  const handleChildClick = (e, selected) => {
    e.stopPropagation();
    setIsCheckboxChecked(selected);
    if (selected) {
      setCheckedFilesFolders([...checkedFilesFolders, item]);
    } else {
      setCheckedFilesFolders(
        checkedFilesFolders.filter(
          (checkedItem) => "Key" in checkedItem && checkedItem.Key !== item.Key,
        ),
      );
    }
  };

  const handleOpenDelete = (data: IFile, e) => {
    e.stopPropagation();
    setCurrentItem(data as IFile);
    setIsOpenDelete(true);
  };

  const handleDownloadFile = async (path: string) => {
    toast.success("Descargando archivo...");
    try {
      const presignedUrl = await getPresignedUrlDOSpaces(bucketName, path);
      const link = document.createElement("a");
      link.href = presignedUrl;
      link.download = path.split("/").pop() || "archivo";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Archivo descargado");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Archivo no descargado");
    }
  };

  const openFile = (file: IFile) => {
    window.open(DO_SPACES_URL + "/" + file.Key, "_blank");
  };

  return (
    <tr
      key={index}
      className={`${item.Key.endsWith("/") && "cursor-pointer"} border-b border-white/10 transition hover:bg-white/5`}
    >
      <td className="flex items-center py-3 text-sm">
        {item.Key.endsWith("/") ? (
          <FolderIcon className="mr-2 text-yellow-300" size={15} />
        ) : (
          <>
            {isCheckboxChecked || isAllChecked ? (
              <MdCheckBox
                size={25}
                className="mx-2 text-cyan-100/85"
                onClick={(e) => handleChildClick(e, false)}
              />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                size={25}
                className="mx-2 text-cyan-100/85"
                onClick={(e) => handleChildClick(e, true)}
              />
            )}
            <FaFileArchive className="mr-2 text-cyan-200" size={15} />
          </>
        )}
        <span className="text-slate-100/95">
          {item.Key.endsWith("/")
            ? item.Key.slice(0, -1).split("/").pop()
            : item.Key.split("/").pop()}
        </span>
      </td>
      <td className="py-1 text-xs text-slate-200/85">
        {item.Size > 0 && (item.Size / (1024 * 1024)).toFixed(2) + "MB"}
      </td>
      <td className="py-1 text-xs text-slate-200/85">{convertToNaturalDate(item.LastModified)}</td>
      <td className="py-1 text-xs text-slate-200/60">
        {!item.Key.endsWith("/") && (
          <div className="flex gap-8">
            <button onClick={() => openFile(item)}>
              <Eye size={22} className="text-cyan-200 transition hover:text-cyan-100" />
            </button>
            <button onClick={() => handleDownloadFile(item.Key)}>
              <Download size={22} className="text-emerald-200 transition hover:text-emerald-100" />
            </button>
            <button onMouseEnter={() => setIsFolder(false)} onClick={(e) => handleOpenDelete(item, e)}>
              <Trash size={22} className="text-rose-200 transition hover:text-rose-100" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default FileRow;
