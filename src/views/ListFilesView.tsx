import { IFile, IFolder } from "@/interfaces/DOFileFolder.ts";
import RowTable from "@/components/RowTable";

interface Props {
  data: (IFile | IFolder)[];
}

function ListFilesView({ data }: Props) {
  return (
    <>
      {data && Array.isArray(data) && data.length > 0 ? (
        data.map((item, index) => <RowTable key={index} item={item} index={index} />)
      ) : (
        <tr>
          <td colSpan={4} className="text-center text-gray-400">
            No se encontraron archivos ni carpetas
          </td>
        </tr>
      )}
    </>
  );
}

export default ListFilesView;
