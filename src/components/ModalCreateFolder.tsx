import GeneralModal from "@/components/GeneralModal.tsx";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext, useRef } from "react";
import { createFolderDOSpaces } from "@/services/do.service.ts";

function ModalCreateFolder() {
  const {
    isOpenFolder,
    setIsOpenFolder,
    setLoading,
    currentPath,
    folders,
    setFolders,
    folderName,
    setFolderName,
  } = useContext(AdminContext);

  const folderRef = useRef(null);

  const createFolder = async () => {
    setLoading(true);
    const { data } = await createFolderDOSpaces(currentPath + folderName);
    if (data) {
      const newFolderList = [...folders, { Prefix: currentPath + folderName + "/" }];
      setFolders(newFolderList);
    } else {
      console.error("Error creating folder");
    }
    setIsOpenFolder(false);
    setLoading(false);
  };

  return (
    <GeneralModal
      isOpen={isOpenFolder}
      onClose={setIsOpenFolder}
      title={"Crear Carpeta"}
      modalRef={folderRef}
    >
      <div className="flex flex-col gap-6 p-6">
        <input
          type="text"
          placeholder="Nombre del folder"
          className="rounded p-3 ring-2 ring-green-500 focus:outline-none focus:ring focus:ring-green-500"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          ref={folderRef}
        />
        <div className="flex justify-end gap-2.5">
          <button
            className="rounded border border-green-500 bg-transparent p-2 text-sm font-semibold text-green-500"
            onClick={() => setIsOpenFolder(false)}
          >
            Cancelar
          </button>
          <button
            className="rounded bg-green-500 p-2 px-4 font-semibold text-white"
            onClick={createFolder}
          >
            Crear
          </button>
        </div>
      </div>
    </GeneralModal>
  );
}

export default ModalCreateFolder;
