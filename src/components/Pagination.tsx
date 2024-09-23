import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  // eslint-disable-next-line no-unused-vars
  onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalItems, pageSize, onPageChange }: Props) {
  const totalPages = Math.ceil(totalItems / pageSize);
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);
    let start = currentPage - halfVisible;
    const end = Math.min(start + visiblePages - 1, totalPages);
    if (end - start + 1 < visiblePages) {
      start = Math.max(end - visiblePages + 1, 1);
    }

    return pageNumbers.slice(start - 1, end).map((page) => (
      <button
        key={page}
        className={`rounded-xl px-3 py-1 ${page === currentPage ? "bg-blue-600 text-white" : "border-2 border-blue-600 text-blue-600"}`}
        onClick={() => handlePageChange(page)}
      >
        <a onClick={() => handlePageChange(page)} className="">
          {page}
        </a>
      </button>
    ));
  };

  return (
    <div className="flex w-full items-center justify-center gap-6 pt-4">
      <ArrowLeftCircle className="text-blue-600" size={30} />
      {renderPageNumbers()}
      <ArrowRightCircle className="text-blue-600" size={30} />
    </div>
  );
}

export default Pagination;
