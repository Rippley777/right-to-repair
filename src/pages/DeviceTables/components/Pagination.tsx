import { TbChevronLeft, TbChevronRight } from "react-icons/tb";

type PaginationProps = {
  page: string | number;
  totalPages: number;
  onChange: (page: number) => void;
};
const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  onChange,
}) => {
  const currentPage = Number(page);

  const handlePageChange = (page: number) => {
    onChange(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) handlePageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) handlePageChange(currentPage + 1);
  };
  const getPageNumbers = () => {
    const maxVisiblePages = 10;
    const half = Math.floor(maxVisiblePages / 2);

    let startPage = Math.max(Number(page) - half, 1);
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };
  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center -space-x-px h-10 text-base">
        <li onClick={handlePrevious}>
          <a
            href="#"
            className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <TbChevronLeft className="w-3 h-3 rtl:rotate-180" />
          </a>
        </li>
        {getPageNumbers().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              margin: "0 5px",
              padding: "5px 10px",
              backgroundColor: page === currentPage ? "bg-gray-800" : "#fff",
              color: page === currentPage ? "#fff" : "#000",
              border: "1px solid #ddd",
              borderRadius: "3px",
            }}
          >
            {page}
          </button>
        ))}
        <li>
          <a
            onClick={handleNext}
            href="#"
            className="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <TbChevronRight className="w-3 h-3 rtl:rotate-180" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
