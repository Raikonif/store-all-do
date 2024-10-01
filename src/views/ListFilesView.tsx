import { Download, Eye, FileIcon, FolderIcon, Trash } from "lucide-react";
import { FileDo } from "@/interfaces/FileDo.ts";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext, useState } from "react";
import { downloadFromDOSpaces } from "@/services/do.service.ts";
import { DO_SPACES_URL } from "@/constants/general.constants.ts";
import convertToNaturalDate from "@/helpers/convertToNaturalDate.ts";

interface Props {
  filteredFiles: FileDo[];
}

function ListFilesView({ filteredFiles }: Props) {
  const { setIsOpenDelete, setCurrentItem } = useContext(AdminContext);
  const [tempItem, setTempItem] = useState<FileDo>({} as FileDo);

  const openFolder = (key) => {
    if (key && key.endsWith("/")) {
      console.log("open folder", key);
    }
  };
  const navigateToFolder = (folder: string) => {
    console.log("navigate", folder);
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
      {filteredFiles && Array.isArray(filteredFiles) && filteredFiles.length > 0 ? (
        filteredFiles.map((file, index) => (
          <tr
            key={index}
            className={`${file.Key.endsWith("/") && "cursor-pointer"} border-b last:border-b-0 hover:bg-gray-100`}
            onClick={() => openFolder(file.Key)}
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
