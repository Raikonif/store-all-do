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
        data.map((item, index) =>
          "Prefix" in item ? (
            <tr
              key={index}
              className="border-b border-gray-700 last:border-b-0 hover:bg-gray-800"
              onClick={() => navigateToFolder(item)}
            >
              <td className="flex items-center py-1 text-sm">
                <div className="flex items-center justify-center">
                  {isCheckboxChecked ? (
                    <MdCheckBox
                      className="mx-2 text-gray-400"
                      onClick={() => setIsCheckboxChecked(false)}
                    />
                  ) : (
                    <MdOutlineCheckBoxOutlineBlank
                      className="mx-2 text-gray-400"
                      onClick={() => setIsCheckboxChecked(true)}
                    />
                  )}

                  <FaFolder className="mr-2 text-yellow-500" size={15} />
                  <span className="text-gray-400">{item.Prefix.slice(0, -1).split("/").pop()}</span>
                </div>
              </td>
              <td className="py-1 text-xs text-gray-400">-</td>
              <td className="py-1 text-xs text-gray-400">-</td>
              <td className="py-1 text-xs text-gray-400">
                <button onClick={(e) => handleOpenDelete(item, e)}>
                  <Trash className="text-red-500" />
                </button>
              </td>
            </tr>
          ) : (
            <tr
              key={index}
              className={`${item.Key.endsWith("/") && "cursor-pointer"} border-b border-gray-700 last:border-b-0 hover:bg-gray-800`}
            >
              <td className="flex items-center py-3 text-sm">
                {item.Key.endsWith("/") ? (
                  <FolderIcon className="mr-2 text-yellow-500" size={15} />
                ) : (
                  <>
                    {isCheckboxChecked ? (
                      <MdCheckBox
                        className="mx-2 text-gray-400"
                        onClick={() => setIsCheckboxChecked(false)}
                      />
                    ) : (
                      <MdOutlineCheckBoxOutlineBlank
                        className="mx-2 text-gray-400"
                        onClick={() => setIsCheckboxChecked(true)}
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
              <td className="py-1 text-xs text-gray-400">
                {convertToNaturalDate(item.LastModified)}
              </td>
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
                    <button onClick={(e) => handleOpenDelete(item, e)}>
                      <Trash
                        size={25}
                        className="text-red-500 hover:text-red-400 active:text-red-300"
                      />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ),
        )
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
