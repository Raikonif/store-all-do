import { Download, Eye, FileIcon, FolderIcon, Trash } from "lucide-react";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext } from "react";
import { downloadFromDOSpaces, listDOObjects } from "@/services/do.service.ts";
import { DO_SPACES_URL } from "@/constants/general.constants.ts";
import convertToNaturalDate from "@/helpers/convertToNaturalDate.ts";
import { IFile, IFolder } from "@/interfaces/DOFileFolder.ts";
import toast from "react-hot-toast";

interface Props {
  filteredFiles: IFile[];
  filteredFolders: IFolder[];
}

function ListFilesView({ filteredFiles }: Props) {
  const {
    setIsOpenDelete,
    currentItem,
    setCurrentItem,
    filteredFolders,
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
      {filteredFolders && Array.isArray(filteredFolders) && filteredFolders.length > 0 ? (
        filteredFolders.map((folder, index) => (
          <tr
            key={index}
            className="border-b last:border-b-0 hover:bg-gray-100"
            onClick={() => navigateToFolder(folder)}
            onMouseEnter={() => handleFolderOnMouseEnter(folder)}
          >
            <td className="flex items-center py-3 text-sm">
              <FolderIcon className="mr-2 text-yellow-500" size={15} />
              {folder.Prefix.slice(0, -1).split("/").pop()}
            </td>
            <td className="py-3 text-xs text-gray-600">-</td>
            <td className="py-3 text-xs text-gray-600">-</td>
            <td className="py-3 text-xs text-gray-600">
              <button onClick={(e) => handleOpenDelete(folder, e)}>
                <Trash className="text-red-500" />
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4} className="py-3 text-center text-gray-600">
            No se encontraron carpetas
          </td>
        </tr>
      )}
      {filteredFiles && Array.isArray(filteredFiles) && filteredFiles.length > 0 ? (
        filteredFiles.map((file, index) => (
          <tr
            key={index}
            className={`${file.Key.endsWith("/") && "cursor-pointer"} border-b last:border-b-0 hover:bg-gray-100`}
            onMouseEnter={() => handleFileOnMouseEnter(file)}
          >
            <td className="flex items-center py-3 text-sm">
              {file.Key.endsWith("/") ? (
                <FolderIcon className="mr-2 text-yellow-500" size={15} />
              ) : (
                <FileIcon className="mr-2 text-blue-500" size={15} />
              )}
              {file.Key.endsWith("/")
                ? file.Key.slice(0, -1).split("/").pop()
                : file.Key.split("/").pop()}
            </td>
            <td className="py-3 text-xs text-gray-600">
              {file.Size > 0 && (file.Size / (1024 * 1024)).toFixed(2) + "MB"}
            </td>
            <td className="py-3 text-xs text-gray-600">
              {convertToNaturalDate(file.LastModified)}
            </td>
            <td className="py-3 text-xs text-gray-600">
              {!file.Key.endsWith("/") && (
                <div className="flex gap-10">
                  <button onClick={() => openFile(file)}>
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
                  <button onClick={(e) => handleOpenDelete(file, e)}>
                    <Trash
                      size={25}
                      className="text-red-500 hover:text-red-400 active:text-red-300"
                    />
                  </button>
                </div>
              )}
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={4} className="py-3 text-center text-gray-600">
            No se encontraron archivos
          </td>
        </tr>
      )}
    </>
  );
}

export default ListFilesView;
