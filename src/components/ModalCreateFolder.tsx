import GeneralModal from "@/components/GeneralModal.tsx";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext, useRef } from "react";
import { createFolderDOSpaces } from "@/services/do.service.ts";
import toast from "react-hot-toast";

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
    if (!folderName) {
      toast.error("Folder name is required");
      return;
    }
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
      <div className="flex flex-col gap-6 p-6" onKeyDown={(e) => e.key === "Enter" && createFolder()}>
        <input
          type="text"
          placeholder="Nombre de la carpeta"
          className="rounded-xl border border-white/30 bg-white/10 p-3 text-slate-100 placeholder:text-slate-300/60 focus:border-cyan-100/80 focus:outline-none"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          ref={folderRef}
        />
        <div className="flex justify-end gap-2.5">
          <button
            className="rounded-xl border border-white/30 bg-transparent px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
            onClick={() => setIsOpenFolder(false)}
          >
            Cancelar
          </button>
          <button className="glass-button px-3 py-2 text-sm font-semibold" onClick={createFolder}>
            Crear
          </button>
        </div>
      </div>
    </GeneralModal>
  );
}

export default ModalCreateFolder;
