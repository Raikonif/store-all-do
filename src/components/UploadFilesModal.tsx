import { useContext, useRef } from "react";
import GeneralModal from "@/components/GeneralModal.tsx";
import AdminContext from "@/context/AdminContext.tsx";

function UploadFilesModal() {
  // const [isModalOpen, setIsModalOpen] = useState(isOpen);
  const modalRef = useRef<HTMLDivElement>(null);
  const { isOpenUpload, onCloseUpload } = useContext(AdminContext);
  //
  // useEffect(() => {
  //   setIsModalOpen(isOpen);
  // }, [isOpen]);
  //
  // useEffect(() => {
  //   const handleEscape = (event: KeyboardEvent) => {
  //     if (event.key === "Escape") {
  //       onClose();
  //     }
  //   };
  //
  //   if (isModalOpen) {
  //     document.addEventListener("keydown", handleEscape);
  //   }
  //
  //   return () => {
  //     document.removeEventListener("keydown", handleEscape);
  //   };
  // }, [isModalOpen, onClose]);
  //
  // useEffect(() => {
  //   if (isModalOpen && modalRef.current) {
  //     modalRef.current.focus();
  //   }
  // }, [isModalOpen]);
  //
  // if (!isModalOpen) {
  //   return null;
  // }

  return (
    <GeneralModal
      isOpen={isOpenUpload}
      onClose={onCloseUpload}
      title={"Subir Archivos"}
      modalRef={modalRef}
    >
      <div className="relative flex-auto p-6">{"Este es un MODAL"}</div>
    </GeneralModal>
  );
}

export default UploadFilesModal;
