import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

interface Props {
  currentPage: number;
  totalItems: number;
  pageSize: number;
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
    if (page > totalPages) {
      onPageChange(1);
    }
    if (page < 1) {
      onPageChange(totalPages);
    }
  };

  const renderPageNumbers = () => {
    const visiblePages = 5;
    const halfVisible = Math.floor(visiblePages / 2);
    let start = currentPage - halfVisible + 2;
    const end = Math.min(start + visiblePages - 1, totalPages);
    if (end - start + 1 < visiblePages) {
      start = Math.max(end - visiblePages + 1, 1);
    }

    return pageNumbers.slice(start - 1, end).map((page) => (
      <button
        key={page}
        className={`rounded-xl px-3 py-1.5 text-sm transition ${
          page === currentPage
            ? "border border-cyan-100/70 bg-cyan-100/20 text-cyan-50"
            : "border border-white/25 bg-white/5 text-cyan-100/90 hover:bg-white/10"
        }`}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </button>
    ));
  };

  return (
    <div className="z-20 flex w-full items-center justify-center gap-4 py-4">
      <button onClick={() => handlePageChange(currentPage - 1)}>
        <ArrowLeftCircle className="cursor-pointer text-cyan-100/90 transition hover:text-cyan-50" size={28} />
      </button>
      {renderPageNumbers()}
      <button onClick={() => handlePageChange(currentPage + 1)}>
        <ArrowRightCircle className="cursor-pointer text-cyan-100/90 transition hover:text-cyan-50" size={28} />
      </button>
    </div>
  );
}

export default Pagination;
