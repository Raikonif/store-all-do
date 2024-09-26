import { ChangeEvent, DragEvent, useContext, useRef, useState } from "react";
import GeneralModal from "@/components/GeneralModal.tsx";
import AdminContext from "@/context/AdminContext.tsx";
import uploadFilesDO from "@/helpers/uploadFilesDO.ts";
import { createFile } from "@/services/files.service.ts";

function UploadFilesModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isOpenUpload, setIsOpenUpload, setLoading, files, setFiles } = useContext(AdminContext);
  const [filesPrev, setFilesPrev] = useState<File[]>([] as File[]);
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
    setFilesPrev((prevFiles) => [...prevFiles, ...droppedFiles]);
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // setFileExample(e.target.files[0]);
      const selectedFiles = Array.from(e.target.files);
      setFilesPrev((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFilesPrev((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const creatingFile = async (fileUrl: string, file: File) => {
    if (fileUrl) {
      return await createFile({
        name: file.name,
        url: fileUrl,
        type: file.type,
        size: file.size,
      });
    } else {
      console.error("Error creating file");
      return null;
    }
  };

  const uploadFiles = async () => {
    setLoading(true);
    let newFiles = [...files];
    await Promise.all(
      filesPrev.map(async (file) => {
        try {
          const fileUploaded = await uploadFilesDO(file);
          const fileCreated = await creatingFile(fileUploaded.data.file_url, file);
          newFiles = [...newFiles, fileCreated.data];
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
            {filesPrev.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 font-semibold">Archivos Seleccionados:</h3>
                <ul className="">
                  {filesPrev.map((file, index) => (
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
