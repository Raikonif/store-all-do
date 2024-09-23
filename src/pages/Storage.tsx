import { useEffect, useState } from "react";
import { DownloadCloud, SearchIcon } from "lucide-react";
import ListFilesView from "@/views/ListFilesView.tsx";
import axios from "axios";

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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const [files, setFiles] = useState<File[]>(initialFiles);
  const [searchTerm, setSearchTerm] = useState("");

  // const filesQuery = useFiles();

  const fetchingFiles = async () => {
    const data = await axios.get("http://localhost:8000/api/files/");
    console.log("getting data", data);
  };
  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    fetchingFiles();
  }, []);

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
            <ListFilesView filteredFiles={filteredFiles || []} />
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
