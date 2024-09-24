import { createContext } from "react";
interface AdminContextData {
  isOpenUpload: boolean;
  onOpenUpload: () => void;
  onCloseUpload: () => void;
}
const AdminContext = createContext({} as AdminContextData);

export default AdminContext;
