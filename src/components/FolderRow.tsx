import AdminContext from "@/context/AdminContext";
import { IFolder } from "@/interfaces/DOFileFolder";
import { listDOObjects } from "@/services/do.service";
import { Trash } from "lucide-react";
import { useContext, useState } from "react";
import { FaFolder } from "react-icons/fa";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

interface Props {
  item: IFolder;
  index: number;
}

function Folder({ item, index }: Props) {
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const {
    setIsFolder,
    setCurrentPath,
    setFolders,
    setFiles,
    setCheckedFilesFolders,
    checkedFilesFolders,
    setCurrentFolder,
    setIsOpenDelete,
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
          (checkedItem) => "Prefix" in checkedItem && checkedItem.Prefix !== item.Prefix,
        ),
      );
    }
  };

  const handleOpenDelete = (data: IFolder, e) => {
    e.stopPropagation();
    setCurrentFolder(data as IFolder);
    setIsOpenDelete(true);
  };

  const navigateToFolder = async (folder: IFolder) => {
    setIsFolder(true);
    setCurrentPath(folder.Prefix);
    const { data } = await listDOObjects(folder.Prefix);
    setFolders(data.folders);
    setFiles(data.files);
  };

  return (
    <tr
      key={index}
      className="border-b border-white/10 transition hover:bg-white/5"
      onClick={() => navigateToFolder(item)}
    >
      <td className="flex items-center py-2 text-sm">
        <div className="flex items-center justify-center">
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
          <FaFolder className="mr-2 text-yellow-300" size={15} />
          <span className="text-slate-100/95">{item.Prefix.slice(0, -1).split("/").pop()}</span>
        </div>
      </td>
      <td className="py-1 text-xs text-slate-200/85">-</td>
      <td className="py-1 text-xs text-slate-200/85">-</td>
      <td className="py-1 text-xs text-slate-200/85">
        <button onMouseEnter={() => setIsFolder(true)} onClick={(e) => handleOpenDelete(item, e)}>
          <Trash className="text-rose-200 transition hover:text-rose-100" size={20} />
        </button>
      </td>
    </tr>
  );
}

export default Folder;
