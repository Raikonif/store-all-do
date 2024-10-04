import { useQuery } from "@tanstack/react-query";
import { listDOObjects } from "@/services/do.service.ts";
import { IFilesAndFolders } from "@/interfaces/DOFileFolder.ts";

const getAllFiles = async (dir: string): Promise<IFilesAndFolders> => {
  const { data } = await listDOObjects(dir);
  // const { data } = await getFiles();
  console.log("data", data);
  return data;
};

interface Props {
  dir: string;
}

function useFiles({ dir }: Props) {
  const filesQuery = useQuery({
    queryKey: ["files", dir],
    queryFn: () => getAllFiles(dir),
    staleTime: 1000 * 60 * 5,
    enabled: !!dir,
  });
  const forceRefetch = () => {
    filesQuery.refetch();
  };
  return { filesQuery, forceRefetch };
}

export { useFiles };
