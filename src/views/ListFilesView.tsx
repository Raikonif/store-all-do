import { Download, Eye, FileIcon, FolderIcon, Trash } from "lucide-react";
import { FileDo } from "@/interfaces/FileDo.ts";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext, useState } from "react";
import { downloadFromDOSpaces } from "@/services/do.service.ts";

interface Props {
  filteredFiles: FileDo[];
}

function ListFilesView({ filteredFiles }: Props) {
  const { setIsOpenDelete, setCurrentItem } = useContext(AdminContext);
  const [tempItem, setTempItem] = useState<FileDo>({} as FileDo);

  const handleOpenDelete = (file: FileDo, e) => {
    e.stopPropagation();
    setCurrentItem(file);
    setIsOpenDelete(true);
  };

  const downloadFile = async () => {
    await downloadFromDOSpaces(tempItem.name);
  };

  const openFile = (file: FileDo) => {
    window.open(file.url, "_blank");
  };

  return (
    <>
      {filteredFiles && Array.isArray(filteredFiles) && filteredFiles.length > 0 ? (
        filteredFiles.map((file) => (
          <tr
            key={file.id}
            className="border-b last:border-b-0 hover:bg-gray-100"
            onMouseEnter={() => setTempItem(file)}
          >
            <td className="flex items-center py-3 text-sm">
              {file.type === "folder" ? (
                <FolderIcon className="mr-2 text-yellow-500" size={15} />
              ) : (
                <FileIcon className="mr-2 text-blue-500" size={15} />
              )}
              {file.name}
            </td>
            <td className="py-3 text-xs text-gray-600">{file.size}</td>
            <td className="py-3 text-xs text-gray-600">{file.name.split(".").pop()}</td>
            <td className="py-3 text-xs text-gray-600">
              {
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
              }
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
