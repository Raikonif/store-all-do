import { ChangeEvent, DragEvent, useContext, useRef, useState } from "react";
import GeneralModal from "@/components/GeneralModal.tsx";
import AdminContext from "@/context/AdminContext.tsx";
import uploadFilesDO from "@/helpers/uploadFilesDO.ts";

function UploadFilesModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    isOpenUpload,
    setIsOpenUpload,
    setLoading,
    files,
    setFiles,
    currentPath,
    filesPrev,
    setFilesPrev,
  } = useContext(AdminContext);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    setFilesPrev([...filesPrev, ...droppedFiles]);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFilesPrev([...filesPrev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFilesPrev(filesPrev.filter((_, i) => i !== index));
  };

  const uploadFiles = async () => {
    setLoading(true);
    let newFiles = [...files];
    await Promise.all(
      filesPrev.map(async (file) => {
        try {
          const fileUploaded = await uploadFilesDO(file, currentPath);
          newFiles = [...newFiles, fileUploaded.data];
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }),
    );
    setFiles(newFiles);
    setIsOpenUpload(false);
    setLoading(false);
  };

  return (
    <GeneralModal
      isOpen={isOpenUpload}
      onClose={setIsOpenUpload}
      title={"Subir Archivos"}
      modalRef={modalRef}
    >
      <div className="relative h-full w-full flex-auto p-6">
        <div className="mx-auto max-w-md">
          <div
            className={`rounded-xl border-2 border-dashed p-8 text-center transition ${
              isDragging
                ? "border-cyan-100/80 bg-cyan-100/20"
                : "border-white/35 bg-white/5"
            }`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <p className="mb-4 text-sm text-slate-200/85">
              Arrastra y suelta tus archivos aqui, o haz click para seleccionarlos.
            </p>
            <input
              type="file"
              multiple
              onChange={handleFileInput}
              className="hidden"
              ref={fileInputRef}
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="glass-button px-4 py-2 text-sm font-bold"
            >
              Seleccionar Archivos
            </button>
          </div>

          {filesPrev.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-2 font-semibold text-slate-100">Archivos Seleccionados:</h3>
              <ul>
                {filesPrev.map((file, index) => (
                  <li
                    key={index}
                    className="mb-1 flex items-center justify-between rounded-lg border border-white/15 bg-white/10 p-2"
                  >
                    <span className="truncate text-xs text-slate-100">{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-xs text-cyan-100 transition hover:text-cyan-300"
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="mt-5 flex w-full justify-end gap-2">
          <button
            onClick={() => setIsOpenUpload(false)}
            className="rounded-xl border border-white/30 bg-transparent px-3 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/10"
          >
            Cancelar
          </button>
          <button onClick={uploadFiles} className="glass-button px-3 py-2 text-sm font-semibold">
            Subir Archivos
          </button>
        </div>
      </div>
    </GeneralModal>
  );
}

export default UploadFilesModal;
