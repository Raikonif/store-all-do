import { FileIcon, FolderIcon } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { FileDo } from "@/interfaces/FileDo.ts";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext } from "react";

interface Props {
  filteredFiles: FileDo[];
}

function ListFilesView({ filteredFiles }: Props) {
  const { setIsOpenDelete } = useContext(AdminContext);
  return (
    <>
      {filteredFiles && Array.isArray(filteredFiles) && filteredFiles.length > 0 ? (
        filteredFiles.map((file) => (
          <tr key={file.id} className="border-b last:border-b-0 hover:bg-gray-50">
            <td className="flex items-center py-3">
              {file.type === "folder" ? (
                <FolderIcon className="mr-2 text-yellow-500" size={20} />
              ) : (
                <FileIcon className="mr-2 text-blue-500" size={20} />
              )}
              {file.name}
            </td>
            <td className="py-3 text-gray-600">{file.size}</td>
            <td className="py-3 text-gray-600">{file.type}</td>
            <td className="py-3 text-gray-600">
              {
                <div className="flex gap-10">
                  <button>
                    <FaDownload size={25} className="text-green-500" />
                  </button>
                  <button onClick={() => setIsOpenDelete(true)}>
                    <IoRemoveCircleSharp size={25} className="text-red-500" />
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
