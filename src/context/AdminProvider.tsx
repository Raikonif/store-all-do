import AdminContext from "@/context/AdminContext.tsx";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

function AdminProvider({ children }: Props) {
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  return (
    <AdminContext.Provider value={{ isOpenUpload, setIsOpenUpload, isOpenDelete, setIsOpenDelete }}>
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
