import { FileDo } from "@/interfaces/FileDo.ts";
import { useQuery } from "@tanstack/react-query";
import { getFiles } from "@/services/files.service.ts";

const getAllFiles = async (): Promise<FileDo[]> => {
  const { data } = await getFiles();
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

export { useFiles };
