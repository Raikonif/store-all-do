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
  // const [filesPrev, setFilesPrev] = useState<File[]>([] as File[]);
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
    // for (let i = 0; i < items.length; i++) {
    //   const item = items[i];
    //   if (item.kind === "file") {
    //     const file = item.getAsFile();
    //     newFiles.push(file);
    //   } else if (item.kind === "string" && item.type === "text/uri-list") {
    //     // Si es una carpeta, accede a los archivos dentro de ella
    //     const folder = item.webkitGetAsEntry();
    //     if (folder && folder.isDirectory) {
    //       handleFolder(folder, newFiles);
    //     }
    //   }
    // }
    setFilesPrev([...filesPrev, ...droppedFiles]);
  };

  const handleFolder = (folder: any, newFiles: File[]) => {
    const reader = folder.createReader();
    reader.readEntries((entries: any[]) => {
      entries.forEach((entry) => {
        if (entry.isDirectory) {
          handleFolder(entry, newFiles); // Recursividad en carpetas
        } else {
          entry.file((file: File) => {
            newFiles.push(file);
          });
        }
      });
    });
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
          console.log("file uploaded", fileUploaded);
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
        <div className="rounded-lg">
          <div className="mx-auto max-w-md p-6">
            <div
              className={`rounded-lg border-2 border-dashed p-8 text-center ${
                isDragging ? "border-green-500 bg-blue-50" : "border-gray-400"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p className="mb-4 text-sm text-gray-500">
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
                className="rounded bg-green-500 px-4 py-2 text-sm font-bold hover:bg-green-600"
              >
                Seleccionar Archivos
              </button>
            </div>
            {filesPrev.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 font-semibold text-gray-400">Archivos Seleccionados:</h3>
                <ul className="">
                  {filesPrev.map((file, index) => (
                    <li
                      key={index}
                      className={`${index % 2 === 0 ? "bg-gray-700" : "bg-gray-600"} flex items-center justify-between p-2`}
                    >
                      <span className="truncate text-xs text-gray-200">{file.name}</span>
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
            className="rounded border border-green-500 bg-transparent p-2 text-sm font-semibold text-green-500 hover:border-green-400 hover:text-green-400 active:border-green-300 active:text-green-300"
          >
            Cancelar
          </button>
          <button
            onClick={() => uploadFiles()}
            className="rounded bg-green-500 p-2 text-sm font-semibold hover:bg-green-400 active:bg-green-300"
          >
            Subir Archivos
          </button>
        </div>
      </div>
    </GeneralModal>
  );
}

export default UploadFilesModal;
