import { useCallback, useContext, useEffect, useState } from "react";
import { ArrowLeftCircle, FolderPlus, LogOut, SearchIcon, Trash, UploadCloud } from "lucide-react";
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
import { withViewTransition } from "@/helpers/viewTransition.ts";

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
    (searchTermString: string) => {
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
    sessionStorage.removeItem("authState");
    withViewTransition(() => navigate("/"));
    setLoading(false);
  };

  const currentData = foldersFiles.slice(
    (currentPage - 1) * pageSize,
    (currentPage - 1) * pageSize + pageSize,
  );

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
    <div className="glass-card soft-entry mx-auto w-full max-w-7xl p-4 sm:p-6">
      <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <h1 className="text-xl font-bold text-cyan-100 sm:text-3xl">Almacenamiento de Archivos Privado</h1>
        <button className="glass-button flex items-center gap-3 px-4 py-2 text-sm font-semibold" onClick={logOut}>
          Salir <LogOut size={18} />
        </button>
      </div>

      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar archivos..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full rounded-xl border border-white/25 bg-white/10 px-4 py-2.5 pl-10 text-slate-100 placeholder:text-slate-300/60 focus:border-cyan-200/80 focus:outline-none"
        />
        <SearchIcon className="absolute left-3 top-2.5 text-slate-200/80" size={18} />
      </div>

      <div className="mb-4 flex flex-col justify-between gap-4 xl:flex-row xl:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <div className={`${currentPath === "nandy-files/" && "hidden"}`}>
            <button onClick={handleBackButton} className="glass-button flex items-center gap-2 px-3 py-2 text-sm font-semibold">
              <ArrowLeftCircle size={18} /> Atras
            </button>
          </div>

          {checkedFilesFolders.length !== 0 ? (
            <button
              onClick={deleteMultiChecked}
              className="rounded-xl border border-red-300/50 bg-red-400/20 px-3 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-400/30"
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                Borrar Seleccionados <Trash size={16} />
              </span>
            </button>
          ) : (
            <h1>{""}</h1>
          )}

          <p className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm text-cyan-50/90">
            {"Ubicacion: " + currentPath}
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onMouseEnter={handleButtonsCreation}
            onClick={() => setIsOpenUpload(true)}
            className="glass-button flex items-center justify-between gap-3 px-3 py-2 text-sm font-semibold"
          >
            Subir Archivos
            <UploadCloud size={18} />
          </button>
          <button
            onMouseEnter={handleButtonsCreation}
            onClick={() => setIsOpenFolder(true)}
            className="glass-button flex items-center justify-between gap-3 px-3 py-2 text-sm font-semibold"
          >
            Crear Carpeta
            <FolderPlus size={18} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-white/15 bg-slate-950/20">
        {filesQuery.isLoading ? (
          <CircleProgress />
        ) : filesQuery.isError ? (
          <p className="py-10 text-center text-slate-300">Error al traer los archivos</p>
        ) : (
          <div className="flex flex-col">
            <div className="flex w-full flex-col items-center justify-center">
              <table className="w-full max-w-6xl table-auto">
                <thead>
                  <tr className="border-b border-cyan-100/20 text-left text-slate-300/90">
                    <th className="flex items-center px-2 py-3 text-sm font-semibold">
                      <button
                        onClick={() => {
                          setIsAllChecked(!isAllChecked);
                          selectAll();
                        }}
                      >
                        {isAllChecked ? (
                          <MdCheckBox size={25} className="mx-2 text-cyan-100/85" />
                        ) : (
                          <MdOutlineCheckBoxOutlineBlank size={25} className="mx-2 text-cyan-100/85" />
                        )}
                      </button>
                      Nombre
                    </th>
                    <th className="px-2 py-3 text-sm font-semibold">Tamano</th>
                    <th className="px-2 py-3 text-sm font-semibold">Modificado</th>
                    <th className="px-2 py-3 text-sm font-semibold">Acciones</th>
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
