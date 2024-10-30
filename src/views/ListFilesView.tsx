import { Download, Eye, FileIcon, FolderIcon, Trash } from "lucide-react";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext } from "react";
import { downloadFromDOSpaces, listDOObjects } from "@/services/do.service.ts";
import { DO_SPACES_URL } from "@/constants/general.constants.ts";
import convertToNaturalDate from "@/helpers/convertToNaturalDate.ts";
import { IFile, IFolder } from "@/interfaces/DOFileFolder.ts";
import toast from "react-hot-toast";

interface Props {
  data: (IFile | IFolder)[];
}

function ListFilesView({ data }: Props) {
  const {
    setIsOpenDelete,
    currentItem,
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

  const handleFolderOnMouseEnter = (folder: IFolder) => {
    setCurrentFolder(folder);
    setIsFolder(true);
  };
  const handleFileOnMouseEnter = (file: IFile) => {
    setCurrentItem(file);
    setIsFolder(false);
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

  const downloadFile = async () => {
    toast.success("Descargando archivo...");
    await downloadFromDOSpaces(currentItem.Key);
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
              className="border-b last:border-b-0 hover:bg-gray-100"
              onClick={() => navigateToFolder(item)}
              onMouseEnter={() => handleFolderOnMouseEnter(item)}
            >
              <td className="flex items-center py-1 text-sm">
                <FolderIcon className="mr-2 text-yellow-500" size={15} />
                {item.Prefix.slice(0, -1).split("/").pop()}
              </td>
              <td className="py-1 text-xs text-gray-600">-</td>
              <td className="py-1 text-xs text-gray-600">-</td>
              <td className="py-1 text-xs text-gray-600">
                <button onClick={(e) => handleOpenDelete(item, e)}>
                  <Trash className="text-red-500" />
                </button>
              </td>
            </tr>
          ) : (
            <tr
              key={index}
              className={`${item.Key.endsWith("/") && "cursor-pointer"} border-b last:border-b-0 hover:bg-gray-100`}
              onMouseEnter={() => handleFileOnMouseEnter(item)}
            >
              <td className="flex items-center py-3 text-sm">
                {item.Key.endsWith("/") ? (
                  <FolderIcon className="mr-2 text-yellow-500" size={15} />
                ) : (
                  <FileIcon className="mr-2 text-blue-500" size={15} />
                )}
                {item.Key.endsWith("/")
                  ? item.Key.slice(0, -1).split("/").pop()
                  : item.Key.split("/").pop()}
              </td>
              <td className="py-1 text-xs text-gray-600">
                {item.Size > 0 && (item.Size / (1024 * 1024)).toFixed(2) + "MB"}
              </td>
              <td className="py-1 text-xs text-gray-600">
                {convertToNaturalDate(item.LastModified)}
              </td>
              <td className="py-1 text-xs text-gray-600">
                {!item.Key.endsWith("/") && (
                  <div className="flex gap-10">
                    <button onClick={() => openFile(item)}>
                      <Eye size={25} className="text-cyan-500" />
                    </button>
                    <button onClick={() => downloadFile()}>
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
          <td colSpan={4} className="text-center text-gray-600">
            No se encontraron archivos ni carpetas
          </td>
        </tr>
      )}
    </>
  );
}

export default ListFilesView;
