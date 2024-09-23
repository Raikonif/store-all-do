import { storeAPI } from "@/services/storeAPI.ts";
import { FileDo } from "@/interfaces/FileDo.ts";
import { useQuery } from "@tanstack/react-query";

const getAllFiles = async (): Promise<FileDo[]> => {
  const { data } = await storeAPI.get<FileDo[]>("/api/files");
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
