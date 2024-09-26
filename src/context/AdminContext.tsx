import { createContext } from "react";
import { FileDo } from "@/interfaces/FileDo.ts";

interface AdminContextData {
  isOpenUpload: boolean;
  setIsOpenUpload: (open: boolean) => void;
  isOpenDelete: boolean;
  setIsOpenDelete: (open: boolean) => void;
  currentItem: FileDo;
  setCurrentItem: (item: FileDo) => void;
  loading: boolean;
  setLoading: (load: boolean) => void;
  files: FileDo[];
  setFiles: (files: FileDo[]) => void;
  filteredFiles: FileDo[];
  setFilteredFiles: (files: FileDo[]) => void;
}

const AdminContext = createContext<AdminContextData>({} as AdminContextData);

export default AdminContext;
