import { useState } from "react";
import { DownloadCloud, FileIcon, FolderIcon, SearchIcon } from "lucide-react";
import { IoRemoveCircleSharp } from "react-icons/io5";
import { FaDownload } from "react-icons/fa";

type File = {
  id: string;
  name: string;
  type: "file" | "folder";
  size: string;
  modified: string;
};

const initialFiles: File[] = [
  { id: "1", name: "Document.pdf", type: "file", size: "2.5 MB", modified: "2023-06-15" },
  { id: "2", name: "Images", type: "folder", size: "-- MB", modified: "2023-06-14" },
  { id: "3", name: "Spreadsheet.xlsx", type: "file", size: "1.8 MB", modified: "2023-06-13" },
  { id: "4", name: "Presentation.pptx", type: "file", size: "5.2 MB", modified: "2023-06-12" },
  { id: "5", name: "Notes.txt", type: "file", size: "10 KB", modified: "2023-06-11" },
];

function Storage() {
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">File List</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg bg-gray-100 px-4 py-2 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      <div className="my-4">
        <button className="flex items-center justify-between gap-4 rounded-xl bg-cyan-400 p-2 font-bold text-white">
          {"Descargar todos los archivos"}
          <DownloadCloud className="text-white" size={20} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-gray-600">
              <th className="pb-2 font-semibold">Name</th>
              <th className="pb-2 font-semibold">Size</th>
              <th className="pb-2 font-semibold">Modified</th>
              <th className="pb-2 font-semibold">Acciones</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>

      {filteredFiles.length === 0 && (
        <p className="mt-4 text-center text-gray-500">No files found.</p>
      )}
    </div>
  );
}

export default Storage;
