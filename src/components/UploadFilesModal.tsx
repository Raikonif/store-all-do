import { useContext, useRef, useState, DragEvent, ChangeEvent } from "react";
import GeneralModal from "@/components/GeneralModal.tsx";
import AdminContext from "@/context/AdminContext.tsx";

function UploadFilesModal() {
  const modalRef = useRef<HTMLDivElement>(null);
  const { isOpenUpload, setIsOpenUpload } = useContext(AdminContext);
  const [files, setFiles] = useState<File[]>([]);
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
      const selectedFiles = Array.from(e.target.files);
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
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
                isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
              }`}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              <p className="mb-4 text-gray-600">
                Drag and drop files here, or click to select files
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
                className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
              >
                Select Files
              </button>
            </div>
            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="mb-2 text-lg font-semibold">Selected Files:</h3>
                <ul className="space-y-2">
                  {files.map((file, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-between rounded bg-gray-100 p-2"
                    >
                      <span className="truncate">{file.name}</span>
                      <button
                        onClick={() => removeFile(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </GeneralModal>
  );
}

export default UploadFilesModal;
