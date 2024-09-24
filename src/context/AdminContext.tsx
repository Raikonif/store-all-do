import { createContext } from "react";

interface AdminContextData {
  isOpenUpload: boolean;
  setIsOpenUpload: (open: boolean) => void;
  isOpenDelete: boolean;
  setIsOpenDelete: (open: boolean) => void;
}

const AdminContext = createContext<AdminContextData>({} as AdminContextData);

export default AdminContext;
