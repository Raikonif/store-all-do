import { useCallback, useContext, useEffect, useState } from "react";
import { ArrowLeftCircle, DownloadCloud, SearchIcon, UploadCloud } from "lucide-react";
import ListFilesView from "@/views/ListFilesView.tsx";
import { useFiles } from "@/hooks/useFiles.tsx";
import { FileDo } from "@/interfaces/FileDo.ts";
import Pagination from "@/components/Pagination.tsx";
import AdminContext from "@/context/AdminContext.tsx";
import CircleProgress from "@/components/CircleProgress.tsx";

function Storage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalItems, setTotalItems] = useState(0);
  const {
    setIsOpenUpload,
    files,
    setFiles,
    filteredFiles,
    setFilteredFiles,
    filteredFolders,
    setFilteredFolders,
    folders,
    setFolders,
    currentPath,
    setCurrentPath,
  } = useContext(AdminContext);

  const { filesQuery, forceRefetch } = useFiles({ dir: currentPath });

  const fetchingFiles = async () => {
    if (filesQuery.isSuccess && filesQuery.data) {
      setFiles(filesQuery.data.files);
      setFolders(filesQuery.data.folders);
      console.log("folders and files", filesQuery.data);
    }
  };

  const handleSearch = useCallback(
    (searchTermString?: string) => {
      setSearchTerm(searchTermString);
      if (files.length === 0) return;
      if (searchTermString !== "" && files.length > 0) {
        const filtered: FileDo[] = files.filter((file) =>
          file.name.toLowerCase().includes(searchTermString.toLowerCase()),
        );
        setFilteredFiles(filtered);
      } else {
        setFilteredFiles(files);
        setFilteredFolders(folders);
      }
    },
    [files, filteredFiles, folders, filteredFolders],
  );

  const handleBackButton = () => {
    const parentPath = currentPath.split("/").slice(0, -2).join("/") + "/";
    setCurrentPath(parentPath);
    forceRefetch();
  };

  useEffect(() => {
    fetchingFiles();
  }, [filesQuery.isSuccess, filesQuery.isLoading, filesQuery.data]);

  useEffect(() => {
    setTotalItems(files.length);
    if (searchTerm === "") {
      setFilteredFiles(files);
      setFilteredFolders(folders);
    }
  }, [files, folders, searchTerm]);

  useEffect(() => {
    console.log("current path", currentPath);
  }, [currentPath]);

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-3 text-2xl font-bold text-green-500">
        Almacenamiento de Archivos Privado - Raikonif
      </h1>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar archivos..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-lg bg-gray-100 px-4 py-2 pl-10 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      <div className="mb-4 flex justify-between gap-4 lg:flex-row lg:justify-end">
        <button
          onClick={() => setIsOpenUpload(true)}
          className="flex items-center justify-between gap-4 rounded-xl bg-green-500 p-3 font-semibold text-white hover:bg-green-400 active:bg-green-300"
        >
          {"Subir Archivos"}
          <UploadCloud className="text-white" size={20} />
        </button>
        <button className="flex items-center justify-between gap-4 rounded-xl bg-cyan-500 p-3 font-semibold text-white hover:bg-cyan-400 active:bg-cyan-300">
          {"Descargar todo"}
          <DownloadCloud className="text-white" size={20} />
        </button>
      </div>
      <div className="overflow-x-auto">
        {filesQuery.isLoading ? (
          <CircleProgress />
        ) : filesQuery.isError ? (
          <p className="mt-4 text-center text-gray-500">Error al traer los archivos </p>
        ) : (
          <div className="flex flex-col">
            <div className={`${currentPath === "nandy-files/" && "hidden"}`}>
              <button
                onClick={() => handleBackButton()}
                className="flex gap-2 rounded-xl bg-green-500 p-2 text-center text-white"
              >
                <ArrowLeftCircle /> {"Ir atras"}
              </button>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-green-500 text-left text-gray-600">
                  <th className="pb-2 text-sm font-semibold">Nombre</th>
                  <th className="pb-2 text-sm font-semibold">Tamaño</th>
                  <th className="pb-2 text-sm font-semibold">Modificado</th>
                  <th className="pb-2 text-sm font-semibold">Acciones</th>
                </tr>
              </thead>
              <tbody>
                <ListFilesView
                  filteredFiles={filteredFiles || []}
                  filteredFolders={filteredFolders || []}
                />
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan={4}>
                    <Pagination
                      currentPage={currentPage}
                      totalItems={totalItems}
                      pageSize={pageSize}
                      onPageChange={setCurrentPage}
                    />
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Storage;
