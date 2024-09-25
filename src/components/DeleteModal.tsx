import GeneralModal from "@/components/GeneralModal.tsx";
import { useContext, useRef } from "react";
import AdminContext from "@/context/AdminContext.tsx";
import { deleteFromDOSpaces } from "@/services/do.service.ts";
import { deleteFile } from "@/services/files.service.ts";

function DeleteModal() {
  const { isOpenDelete, setIsOpenDelete, currentItem } = useContext(AdminContext);
  const modalRef = useRef<HTMLDivElement>(null);

  const deleteCurrentFile = async () => {
    await deleteFromDOSpaces(currentItem.name);
    await deleteFile(currentItem.id);
    setIsOpenDelete(false);
  };

  return (
    <GeneralModal
      modalRef={modalRef}
      isOpen={isOpenDelete}
      onClose={setIsOpenDelete}
      title={"Borrar Archivo"}
    >
      <div className="flex flex-col items-center justify-center gap-2 p-5">
        <h1 className="font-bold">Borrar Archivo</h1>
        <p>¿Estás seguro de borrar este archivo?</p>
        <div className="mt-4 flex gap-4">
          <button
            className="rounded-md border-2 border-gray-500 px-4 py-2 font-semibold text-gray-500 hover:border-gray-400 hover:text-gray-400 active:border-gray-300 active:text-gray-300"
            onClick={() => setIsOpenDelete(false)}
          >
            Cancelar
          </button>
          <button
            className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-400 active:bg-red-300"
            onClick={async () => await deleteCurrentFile()}
          >
            Aceptar
          </button>
        </div>
      </div>
    </GeneralModal>
  );
}

export default DeleteModal;
