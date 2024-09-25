import AdminContext from "@/context/AdminContext.tsx";
import { ReactNode, useEffect, useState } from "react";
import { FileDo } from "@/interfaces/FileDo.ts";

interface Props {
  children: ReactNode;
}

function AdminProvider({ children }: Props) {
  const [isOpenUpload, setIsOpenUpload] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [currentItem, setCurrentItem] = useState<FileDo>({} as FileDo);

  useEffect(() => {
    console.log("current item", currentItem);
  }, [currentItem]);
  return (
    <AdminContext.Provider
      value={{
        isOpenUpload,
        setIsOpenUpload,
        isOpenDelete,
        setIsOpenDelete,
        currentItem,
        setCurrentItem,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export default AdminProvider;
