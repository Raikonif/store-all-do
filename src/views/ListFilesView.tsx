import { FileIcon, FolderIcon } from "lucide-react";
import { FaDownload } from "react-icons/fa";
import { IoRemoveCircleSharp } from "react-icons/io5";

interface Props {
  filteredFiles: any[];
}

function ListFilesView({ filteredFiles }: Props) {
  return (
    <>
      {filteredFiles.map((file) => (
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
          <td className="py-3 text-gray-600">{file.modified}</td>
          <td className="py-3 text-gray-600">
            {
              <div className="flex gap-20">
                <button>
                  <FaDownload size={25} color={"green"} />
                </button>
                <button>
                  <IoRemoveCircleSharp size={25} color={"red"} />
                </button>
              </div>
            }
          </td>
        </tr>
      ))}
    </>
  );
}

export default ListFilesView;
