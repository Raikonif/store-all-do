import { useContext, useRef, useState, DragEvent, ChangeEvent } from "react";
import GeneralModal from "@/components/GeneralModal.tsx";
import AdminContext from "@/context/AdminContext.tsx";
import uploadFilesDO from "@/helpers/uploadFilesDO.ts";
import { createFile } from "@/services/files.service.ts";

function UploadFilesModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isOpenUpload, setIsOpenUpload } = useContext(AdminContext);
  // const [fileExample, setFileExample] = useState<File>({} as File);
  const [files, setFiles] = useState<File[]>([] as File[]);
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
    setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // setFileExample(e.target.files[0]);
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const creatingFile = async (fileUrl: string, file: File) => {
    if (fileUrl) {
      await createFile({
        name: file.name,
        url: fileUrl,
        type: file.type,
        size: file.size,
      });
    } else {
      console.error("Error creating file");
    }
  };

  // const uploadFile = async () => {
  //   const fileUploaded = await uploadFilesDO(fileExample);
  //   await creatingFile(fileUploaded.data.file_url, fileExample);
  // };

  const uploadFiles = async () => {
    await Promise.all(
      files.map(async (file) => {
        try {
          const fileUploaded = await uploadFilesDO(file);
          await creatingFile(fileUploaded.data.file_url, file);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }),
    );
    setIsOpenUpload(false);
  };

  return (
    <GeneralModal
      isOpen={isOpenUpload}
      onClose={setIsOpenUpload}
      title={"Subir Archivos"}
      modalRef={modalRef}
    >
      <div className="relative h-full w-full flex-auto p-6">
        <div className="rounded-lg">
          <div className="mx-auto max-w-md p-6">
            <div
              className={`rounded-lg border-2 border-dashed p-8 text-center ${
                isDragging ? "border-green-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p className="mb-4 text-sm text-gray-600">
                Arrastra y suelta tus archivos aqui, o haz click en el boton para seleccionarlos.
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
                className="rounded bg-green-500 px-4 py-2 text-sm font-bold text-white hover:bg-green-600"
              >
                Seleccionar Archivos
              </button>
            </div>
            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 font-semibold">Archivos Seleccionados:</h3>
                <ul className="">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className={`${index % 2 === 0 ? "bg-slate-50" : "bg-green-100"} flex items-center justify-between rounded bg-gray-100 p-2`}
                    >
                      <span className="truncate text-xs">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-xs text-green-500 hover:text-green-700"
                      >
                        Remover
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <div className="flex w-full justify-end gap-2">
          <button
            onClick={() => setIsOpenUpload(false)}
            className="rounded border border-green-500 bg-transparent p-2 text-sm font-semibold text-green-500"
          >
            Cancelar
          </button>
          <button
            onClick={() => uploadFiles()}
            className="rounded bg-green-500 p-2 text-sm font-semibold text-white"
          >
            Subir Archivos
          </button>
        </div>
      </div>
    </GeneralModal>
  );
}

export default UploadFilesModal;
