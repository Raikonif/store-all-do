import GeneralModal from "@/components/GeneralModal.tsx";
import { useContext, useRef } from "react";
import AdminContext from "@/context/AdminContext.tsx";
import { deleteFolderFromDOSpaces, deleteFromDOSpaces } from "@/services/do.service.ts";
import toast from "react-hot-toast";
// import { deleteFile } from "@/services/files.service.ts";

function DeleteModal() {
  const {
    isOpenDelete,
    setIsOpenDelete,
    currentItem,
    currentFolder,
    setLoading,
    files,
    setFiles,
    folders,
    setFolders,
    isFolder,
  } = useContext(AdminContext);
  const modalRef = useRef<HTMLDivElement>(null);

  const deleteFolder = async () => {
    setLoading(true);
    const { data } = await deleteFolderFromDOSpaces(currentFolder.Prefix);
    let newList = [...folders];
    if (data) {
      newList = folders.filter((folder) => folder.Prefix !== currentFolder.Prefix);
    }
    setFolders(newList);
    setIsOpenDelete(false);
    setLoading(false);
  };

  const deleteCurrentFile = async () => {
    setLoading(true);
    const { data } = await deleteFromDOSpaces(currentItem.Key);
    console.log("data", data);
    let newList = [...files];
    if (data) {
      newList = files.filter((file) => file.Key !== currentItem.Key);
    }
    setFiles(newList);
    setIsOpenDelete(false);
    setLoading(false);
  };

  const handleDelete = async () => {
    if (isFolder) {
      console.log("current folder", currentFolder);
      await deleteFolder();
      toast.success("Folder eliminado");
    } else {
      await deleteCurrentFile();
      toast.success("Archivo eliminado");
    }
  };

  return (
    <GeneralModal
      modalRef={modalRef}
      isOpen={isOpenDelete}
      onClose={setIsOpenDelete}
      title={isFolder ? "Borrar Carpeta" : "Borrar Archivo"}
    >
      <div className="flex flex-col items-center justify-center gap-2 p-5">
        <p>
          {isFolder
            ? "¿Estás seguro de borrar esta carpeta y todo su contenido?"
            : "¿Estás seguro de borrar este archivo?"}
        </p>
        <div className="mt-4 flex gap-4">
          <button
            className="rounded-md border-2 border-gray-500 px-4 py-2 font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-400 active:border-gray-300 active:text-gray-300"
            onClick={() => setIsOpenDelete(false)}
          >
            Cancelar
          </button>
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-400 active:bg-red-300"
            onClick={async () => await handleDelete()}
          >
            Aceptar
          </button>
        </div>
      </div>
    </GeneralModal>
  );
}

export default DeleteModal;
