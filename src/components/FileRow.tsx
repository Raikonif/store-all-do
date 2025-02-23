import { DO_SPACES_URL } from "@/constants/general.constants";
import AdminContext from "@/context/AdminContext";
import convertToNaturalDate from "@/helpers/convertToNaturalDate";
import { IFile } from "@/interfaces/DOFileFolder";
import { downloadFromDOSpaces } from "@/services/do.service";
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
    <tr
      key={index}
      className={`${item.Key.endsWith("/") && "cursor-pointer"} border-b border-gray-700 last:border-b-0 hover:bg-gray-800`}
    >
      <td className="flex items-center py-3 text-sm">
        {item.Key.endsWith("/") ? (
          <FolderIcon className="mr-2 text-yellow-500" size={15} />
        ) : (
          <>
            {isCheckboxChecked || isAllChecked ? (
              <MdCheckBox
                size={25}
                className="mx-2 text-gray-400"
                onClick={(e) => handleChildClick(e, false)}
              />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                size={25}
                className="mx-2 text-gray-400"
                onClick={(e) => handleChildClick(e, true)}
              />
            )}
            <FaFileArchive className="mr-2 text-blue-600" size={15} />
          </>
        )}
        <span className="text-gray-400">
          {item.Key.endsWith("/")
            ? item.Key.slice(0, -1).split("/").pop()
            : item.Key.split("/").pop()}
        </span>
      </td>
      <td className="py-1 text-xs text-gray-400">
        {item.Size > 0 && (item.Size / (1024 * 1024)).toFixed(2) + "MB"}
      </td>
      <td className="py-1 text-xs text-gray-400">{convertToNaturalDate(item.LastModified)}</td>
      <td className="py-1 text-xs text-gray-600">
        {!item.Key.endsWith("/") && (
          <div className="flex gap-10">
            <button onClick={() => openFile(item)}>
              <Eye size={25} className="text-cyan-500" />
            </button>
            <button onClick={() => handleDownloadFile(item.Key)}>
              {/*<a href={tempItem.url} download>*/}
              <Download
                size={25}
                className="text-green-500 hover:text-green-400 active:text-green-300"
              />
              {/*</a>*/}
            </button>
            <button
              onMouseEnter={() => setIsFolder(false)}
              onClick={(e) => handleOpenDelete(item, e)}
            >
              <Trash size={25} className="text-red-500 hover:text-red-400 active:text-red-300" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default FileRow;
