import { useCallback, useContext, useEffect, useState } from "react";
import { DownloadCloud, SearchIcon, UploadCloud } from "lucide-react";
import ListFilesView from "@/views/ListFilesView.tsx";
import useFiles from "@/hooks/useFiles.tsx";
import { FileDo } from "@/interfaces/FileDo.ts";
import Pagination from "@/components/Pagination.tsx";
import AdminContext from "@/context/AdminContext.tsx";
import { deleteFromDOSpaces } from "@/services/do.service.ts";

function Storage() {
  const [files, setFiles] = useState<FileDo[]>([] as FileDo[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFiles, setFilteredFiles] = useState<FileDo[]>(files);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalItems, setTotalItems] = useState(0);
  const { setIsOpenUpload } = useContext(AdminContext);
  const { filesQuery } = useFiles();

  const fetchingFiles = async () => {
    if (filesQuery.isSuccess && filesQuery.data) {
      setFiles(filesQuery.data);
      setFilteredFiles(filesQuery.data);
    }
  };

  const deleteCurrentFile = async (id: number) => {
    await deleteFromDOSpaces(id);
    setIsOpenUpload(false);
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
      }
    },
    [files, filteredFiles],
  );

  useEffect(() => {
    fetchingFiles();
  }, [filesQuery.isSuccess, filesQuery.isLoading]);

  useEffect(() => {
    setTotalItems(files.length);
    if (searchTerm === "") {
      setFilteredFiles(files);
    }
  }, [files, filteredFiles, searchTerm]);

  return (
    <div className="mx-auto w-full rounded-lg bg-white p-6 shadow-lg">
      <h1 className="mb-3 text-2xl font-bold text-green-500">Lista de Archivos</h1>

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
          <p className="mt-4 text-center text-gray-500">Cargando...</p>
        ) : filesQuery.isError ? (
          <p className="mt-4 text-center text-gray-500">Error al traer los archivos </p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-green-500 text-left text-gray-600">
                <th className="pb-2 text-sm font-semibold">Nombre</th>
                <th className="pb-2 text-sm font-semibold">Tamaño</th>
                <th className="pb-2 text-sm font-semibold">Fecha de Creación</th>
                <th className="pb-2 text-sm font-semibold">Acciones</th>
              </tr>
            </thead>
            <tbody>
              <ListFilesView filteredFiles={filteredFiles || []} />
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
        )}
      </div>
    </div>
  );
}

export default Storage;
