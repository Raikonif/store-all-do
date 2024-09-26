import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UploadFilesModal from "@/components/UploadFilesModal.tsx";
import DeleteModal from "@/components/DeleteModal.tsx";
import CircleProgress from "@/components/CircleProgress.tsx";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext } from "react";

function GeneralLayout() {
  const { loading } = useContext(AdminContext);
  return (
    <div className="flex">
      <Outlet />
      <Toaster
        toastOptions={{
          className: "dark:bg-gray-800 dark:text-white",
        }}
      />
      {loading && <CircleProgress />}
      <UploadFilesModal />
      <DeleteModal />
    </div>
  );
}

export default GeneralLayout;
