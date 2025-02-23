import { useCallback, useContext, useEffect, useState } from "react";
import {
  ArrowLeftCircle,
  Download,
  FolderPlus,
  LogOut,
  SearchIcon,
  Trash,
  UploadCloud,
} from "lucide-react";
import ListFilesView from "@/views/ListFilesView.tsx";
import { useFiles } from "@/hooks/useFiles.tsx";
import Pagination from "@/components/Pagination.tsx";
import AdminContext from "@/context/AdminContext.tsx";
import CircleProgress from "@/components/CircleProgress.tsx";
import { IFile } from "@/interfaces/DOFileFolder.ts";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabase.service.ts";
import { deleteFolderFromDOSpaces, deleteFromDOSpaces } from "@/services/do.service.ts";
import { MdCheckBox, MdOutlineCheckBoxOutlineBlank } from "react-icons/md";

function Storage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [totalItems, setTotalItems] = useState(0);
  const navigate = useNavigate();

  const {
    setLoading,
    setUser,
    setFilesPrev,
    setFolderName,
    setIsOpenFolder,
    setIsOpenUpload,
    files,
    setFiles,
    filteredFiles,
    setFilteredFiles,
    filteredFolders,
    setFilteredFolders,
    folders,
    setFolders,
    setFoldersFiles,
    currentPath,
    setCurrentPath,
    foldersFiles,
    checkedFilesFolders,
    setCheckedFilesFolders,
    isAllChecked,
    setIsAllChecked,
  } = useContext(AdminContext);

  const { filesQuery, forceRefetch } = useFiles({ dir: currentPath });

  const queryClient = useQueryClient();

  const invalidateQuery = () => {
    queryClient.invalidateQueries({ queryKey: ["files"] });
  };

  const fetchingFiles = async () => {
    if (filesQuery.isSuccess && filesQuery.data) {
      const fetchedFolders = filesQuery.data.folders;
      const fetchedFiles = filesQuery.data.files;
      setFolders(filesQuery.data.folders);
      setFiles(filesQuery.data.files);
      setFoldersFiles([...fetchedFiles, ...fetchedFolders]);
    }
  };

  const handleButtonsCreation = () => {
    setFolderName("");
    setFilesPrev([]);
  };

  const handleSearch = useCallback(
    (searchTermString?: string) => {
      setSearchTerm(searchTermString);
      if (files.length === 0) return;
      if (searchTermString !== "" && (files.length > 0 || folders.length > 0)) {
        const filteredFolders = folders.filter((folder) =>
          folder.Prefix.slice(0, -1)
            .split("/")
            .pop()
            .toLowerCase()
            .includes(searchTermString.toLowerCase()),
        );
        const filtered: IFile[] = files.filter((file) =>
          file.Key.split("/").pop().toLowerCase().includes(searchTermString.toLowerCase()),
        );
        setFilteredFolders(filteredFolders);
        setFilteredFiles(filtered);
        setFoldersFiles([...filteredFolders, ...filtered]);
        setTotalItems(foldersFiles.length);
      } else {
        setFilteredFolders(folders);
        setFilteredFiles(files);
        setFoldersFiles([...folders, ...files]);
        setTotalItems(foldersFiles.length);
      }
    },
    [files, filteredFiles, folders, filteredFolders],
  );

  const handleBackButton = () => {
    setCurrentPath(currentPath.split("/").slice(0, -2).join("/") + "/");
    invalidateQuery();
    forceRefetch();
  };

  const logOut = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error al cerrar sesión", error);
      return;
    }
    setUser({});
    localStorage.removeItem("authState");
    navigate("/");
    setLoading(false);
  };

  const currentData = foldersFiles.slice(
    (currentPage - 1) * pageSize,
    (currentPage - 1) * pageSize + pageSize,
  );

  // select functions
  const deleteMultiChecked = async () => {
    setLoading(true);

    for (const item of checkedFilesFolders) {
      if ("Prefix" in item) {
        await deleteFolderFromDOSpaces(item.Prefix);
      } else {
        await deleteFromDOSpaces(item.Key);
      }
    }
    invalidateQuery();
    setCheckedFilesFolders([]);
    setIsAllChecked(false);
    setLoading(false);
  };

  const selectAll = () => {
    if (isAllChecked) {
      setCheckedFilesFolders([]);
    } else {
      setCheckedFilesFolders(foldersFiles);
    }
  };

  useEffect(() => {
    fetchingFiles();
  }, [filesQuery.isSuccess, filesQuery.isLoading, filesQuery.data]);

  useEffect(() => {
    setTotalItems(foldersFiles.length);
    if (searchTerm === "") {
      setFilteredFolders(folders);
      setFilteredFiles(files);
      setFoldersFiles([...files, ...folders]);
    }
  }, [files, folders, searchTerm]);

  return (
    <div className="mx-auto w-full rounded-lg bg-gray-900 p-6 shadow-lg">
      <div className="mb-2 flex justify-between">
        <h1 className="mb-3 text-center text-xl font-bold text-green-500 md:text-3xl">
          Almacenamiento de Archivos Privado
        </h1>
        <button
          className="flex items-center gap-4 rounded-xl bg-green-500 p-2 font-semibold hover:bg-green-400 active:bg-green-300"
          onClick={async () => await logOut()}
        >
          Salir <LogOut />
        </button>
      </div>

      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Buscar archivos..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-lg bg-gray-800 px-4 py-2 pl-10 text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <SearchIcon className="absolute left-3 top-2.5 text-gray-400" size={20} />
      </div>
      <div className="flex justify-between gap-4 lg:flex-row">
        <div className="flex h-fit gap-4">
          {checkedFilesFolders.length !== 0 ? (
            <>
              <button
                onClick={deleteMultiChecked}
                className="flex items-center gap-4 rounded-xl bg-red-500 p-3 font-semibold hover:bg-red-400 active:bg-red-300"
              >
                <Trash size={20} />
              </button>
              <button
                onClick={() => {}}
                className="flex items-center gap-4 rounded-xl bg-violet-500 p-3 font-semibold hover:bg-violet-400 active:bg-violet-300"
              >
                <Download size={20} />
              </button>
            </>
          ) : (
            <h1>Selecciona para mas acciones</h1>
          )}
        </div>
        <div className="flex flex-col gap-4 lg:flex-row">
          <button
            onMouseEnter={() => handleButtonsCreation()}
            onClick={() => setIsOpenUpload(true)}
            className="flex items-center justify-between gap-4 rounded-xl bg-green-500 p-3 font-semibold hover:bg-green-400 active:bg-green-300"
          >
            {"Subir Archivos"}
            <UploadCloud size={20} />
          </button>
          <button
            onMouseEnter={() => handleButtonsCreation()}
            onClick={() => setIsOpenFolder(true)}
            className="flex items-center justify-between gap-4 rounded-xl bg-cyan-500 p-3 font-semibold hover:bg-cyan-400 active:bg-cyan-300"
          >
            {"Crear Carpeta"}
            <FolderPlus size={20} />
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        {filesQuery.isLoading ? (
          <CircleProgress />
        ) : filesQuery.isError ? (
          <p className="mt-4 text-center text-gray-500">Error al traer los archivos </p>
        ) : (
          <div className="flex flex-col">
            <div className={`${currentPath === "nandy-files/" && "invisible"}`}>
              <button
                onClick={() => handleBackButton()}
                className="flex gap-2 rounded-xl bg-green-500 p-3 text-center font-semibold text-white hover:bg-green-400 active:bg-green-300"
              >
                <ArrowLeftCircle /> {"Ir atras"}
              </button>
            </div>

            <div className="flex w-full flex-col items-center justify-center">
              <div className="flex w-full">
                <p className="font-semibold text-green-500">{"Ubicación: " + currentPath}</p>
              </div>
              <table className="m-4 w-full max-w-6xl">
                <thead>
                  <tr className="border-b-2 border-green-500 text-left text-gray-400">
                    <th className="flex items-center pb-2 text-sm font-semibold">
                      <button
                        onClick={() => {
                          setIsAllChecked(!isAllChecked);
                          selectAll();
                        }}
                      >
                        {isAllChecked ? (
                          <MdCheckBox size={25} className="mx-2 text-gray-400" />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank size={25} className="mx-2 text-gray-400" />
                        )}
                      </button>
                      Nombre
                    </th>
                    <th className="pb-2 text-sm font-semibold">Tamaño</th>
                    <th className="pb-2 text-sm font-semibold">Modificado</th>
                    <th className="pb-2 text-sm font-semibold">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <ListFilesView data={currentData} />
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Storage;
