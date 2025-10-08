import React from 'react';
import ReactPaginate from 'react-paginate';
import { useNavigate } from '@tanstack/react-router';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string | number>;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  basePath,
  searchParams,
}) => {
  const navigate = useNavigate();

  const handlePageChange = (event: { selected: number }) => {
    const newPage = event.selected + 1;

    navigate({
      to: basePath,
      search: {
        ...searchParams,
        page: newPage,
      },
    });
  };

  return (
    <ReactPaginate
      pageCount={totalPages}
      forcePage={currentPage - 1}
      onPageChange={handlePageChange}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      renderOnZeroPageCount={null}
      containerClassName="flex justify-center items-center gap-2 mt-8"
      pageClassName="h-8 w-8 border border-gray-300 rounded hover:bg-gray-700 hover:border-[#61dafb] cursor-pointer transition-all ease-in-out duration-300"
      pageLinkClassName="flex items-center justify-center h-full w-full decoration-none text-sm text-white hover:text-[#61dafb] transition-all ease-in-out duration-300"
      previousClassName="h-8 w-8 border border-gray-300 rounded hover:bg-gray-700 hover:border-[#61dafb] cursor-pointer transition-all ease-in-out duration-300"
      previousLinkClassName="flex items-center justify-center h-full w-full decoration-none text-sm text-white hover:text-[#61dafb] transition-all ease-in-out duration-300"
      nextClassName="h-8 w-8 border border-gray-300 rounded hover:bg-gray-700 hover:border-[#61dafb] cursor-pointer transition-all ease-in-out duration-300"
      nextLinkClassName="flex items-center justify-center h-full w-full decoration-none text-sm text-white hover:text-[#61dafb] transition-all ease-in-out duration-300"
      breakClassName="h-8 w-8 flex items-center justify-center text-sm text-white"
      activeClassName="h-10 w-10 bg-[#61dafb] !border-[#61dafb] !cursor-default hover:!bg-[#61dafb]"
      activeLinkClassName="!text-xl !text-[#282c34] font-bold"
    />
  );
};

export default Pagination;
