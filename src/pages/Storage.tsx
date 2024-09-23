import { useCallback, useEffect, useState } from "react";
import { DownloadCloud, SearchIcon } from "lucide-react";
import ListFilesView from "@/views/ListFilesView.tsx";
import useFiles from "@/hooks/useFiles.tsx";
import { FileDo } from "@/interfaces/FileDo.ts";

function Storage() {
  const [files, setFiles] = useState<FileDo[]>([] as FileDo[]);
  const [searchTerm, setSearchTerm] = useState("");
  const { filesQuery } = useFiles();
  const [filteredFiles, setFilteredFiles] = useState<FileDo[]>(files);

  const fetchingFiles = async () => {
    if (filesQuery.isSuccess) {
      setFiles(filesQuery.data);
      setFilteredFiles(filesQuery.data);
    }
  };

  const handleSearch = useCallback(
    (searchTermString: string) => {
      setSearchTerm(searchTermString);
      if (searchTermString !== "" && files.length > 0) {
        const filtered: FileDo[] = files.filter((file) =>
          file.name.toLowerCase().includes(searchTermString.toLowerCase()),
        );
        setFilteredFiles(filtered);
      } else {
        // If search term is empty, show all files
        setFilteredFiles(files);
      }
      console.log("filteredFiles", filteredFiles);
    },
    [files, filteredFiles],
  );

  useEffect(() => {
    fetchingFiles();
  }, [filesQuery.isSuccess, filesQuery.isLoading]);

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">File List</h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search files..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
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
        {filesQuery.isLoading ? (
          <p className="mt-4 text-center text-gray-500">Loading...</p>
        ) : filesQuery.isError ? (
          <p className="mt-4 text-center text-gray-500">Error fetching files </p>
        ) : (
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
              <ListFilesView filteredFiles={[]} />
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Storage;
