import { FileDo } from "@/interfaces/FileDo.ts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getAllFiles = async (): Promise<FileDo[]> => {
  const { data } = await axios.get<FileDo[]>(
    "https://do-spaces-upload-docs.up.railway.app/api/files",
  );
  console.log("data", data);
  return data;
};

function useFiles() {
  const filesQuery = useQuery({
    queryKey: ["files"],
    queryFn: getAllFiles,
    staleTime: 1000 * 60 * 5,
  });
  return { filesQuery };
}

export default useFiles;
