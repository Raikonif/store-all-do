import { Download, Eye, FileIcon, FolderIcon, Trash } from "lucide-react";
import { FileDo } from "@/interfaces/FileDo.ts";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext, useState } from "react";
import { downloadFromDOSpaces, listDOObjects } from "@/services/do.service.ts";
import { DO_SPACES_URL } from "@/constants/general.constants.ts";
import convertToNaturalDate from "@/helpers/convertToNaturalDate.ts";

interface Props {
  filteredFiles: any[];
  filteredFolders: any[];
}

function ListFilesView({ filteredFiles }: Props) {
  const {
    setIsOpenDelete,
    setCurrentItem,
    setFilteredFiles,
    filteredFolders,
    setFiles,
    setFolders,
    setCurrentPath,
  } = useContext(AdminContext);
  const [tempItem, setTempItem] = useState<FileDo>({} as FileDo);

  const navigateToFolder = async (folder: string) => {
    console.log("navigate to folder", folder);
    setCurrentPath(folder.Prefix);
    const { data } = await listDOObjects(folder.Prefix);
    setFolders(data.folders);
    setFiles(data.files);
    console.log("folders and files", data);
  };

  const handleOpenDelete = (file: FileDo, e) => {
    e.stopPropagation();
    setCurrentItem(file);
    setIsOpenDelete(true);
  };

  const downloadFile = async () => {
    await downloadFromDOSpaces(tempItem.name);
  };

  const openFile = (file: any) => {
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
          >
            <td className="flex items-center py-3 text-sm">
              <FolderIcon className="mr-2 text-yellow-500" size={15} />
              {folder.Prefix.slice(0, -1).split("/").pop()}
            </td>
            <td className="py-3 text-xs text-gray-600">-</td>
            <td className="py-3 text-xs text-gray-600">-</td>
            <td className="py-3 text-xs text-gray-600">-</td>
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
            onMouseEnter={() => setTempItem(file)}
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
