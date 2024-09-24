import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UploadFilesModal from "@/components/UploadFilesModal.tsx";

function GeneralLayout() {
  return (
    <div className="flex">
      <Outlet />
      <Toaster
        toastOptions={{
          className: "dark:bg-gray-800 dark:text-white",
        }}
      />
      <UploadFilesModal />
    </div>
  );
}

export default GeneralLayout;
