import GeneralModal from "@/components/GeneralModal.tsx";
import { useContext, useRef } from "react";
import AdminContext from "@/context/AdminContext.tsx";

function DeleteModal() {
  const { isOpenDelete, setIsOpenDelete } = useContext(AdminContext);
  const modalRef = useRef<HTMLDivElement>(null);
  return (
    <GeneralModal
      modalRef={modalRef}
      isOpen={isOpenDelete}
      onClose={setIsOpenDelete}
      title={"Borrar Archivo"}
    >
      <h1>Delete Modal</h1>
    </GeneralModal>
  );
}

export default DeleteModal;
