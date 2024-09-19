import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function GeneralLayout() {
  return (
    <div className="flex">
      <Outlet />
      <Toaster
        toastOptions={{
          className: "dark:bg-gray-800 dark:text-white",
        }}
      />
    </div>
  );
}

export default GeneralLayout;
