import { FileDo } from "@/interfaces/FileDo.ts";
import { useQuery } from "@tanstack/react-query";
import { storeAPI } from "@/services/storeAPI.ts";

const getAllFiles = async (): Promise<FileDo[]> => {
  console.log("getting files");
  const { data } = await storeAPI.get<FileDo[]>("/api/files");
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
