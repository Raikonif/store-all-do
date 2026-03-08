import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import UploadFilesModal from "@/components/UploadFilesModal.tsx";
import DeleteModal from "@/components/DeleteModal.tsx";
import CircleProgress from "@/components/CircleProgress.tsx";
import AdminContext from "@/context/AdminContext.tsx";
import { useContext } from "react";
import ModalCreateFolder from "@/components/ModalCreateFolder.tsx";

function GeneralLayout() {
  const { loading } = useContext(AdminContext);

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-3 sm:p-6">
      <div className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />

      <main className="page-shell soft-entry relative z-10 w-full">
        <Outlet />
      </main>

      <Toaster
        toastOptions={{
          className: "glass-card !text-slate-100",
        }}
      />
      {loading && <CircleProgress />}
      <UploadFilesModal />
      <DeleteModal />
      <ModalCreateFolder />
    </div>
  );
}

export default GeneralLayout;
