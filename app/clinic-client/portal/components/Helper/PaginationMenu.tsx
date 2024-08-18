import React from 'react';
import { FaBackward, FaForward } from 'react-icons/fa';
import { IoCaretBack, IoCaretForward } from 'react-icons/io5';

interface PaginationMenuProps {
  currentPage: number;
  totalPages: number;
  navigateToPage: (page: number) => void;
}

const PaginationMenu: React.FC<PaginationMenuProps> = ({
  currentPage,
  totalPages,
  navigateToPage,
}) => {
  if (totalPages <= 1) {
    return null;
  }
  return (
    <div className="flex justify-center items-center mt-4 space-x-2">
      <div className="flex items-center">
        <FaBackward
          onClick={() => navigateToPage(1)}
          className="mx-1 hover:text-secondary-light-blue cursor-pointer"
        />
      </div>
      <div className="flex items-center">
        <IoCaretBack
          onClick={() => navigateToPage(Math.max(currentPage - 1, 1))}
          className="mx-1 hover:text-secondary-light-blue cursor-pointer text-2xl"
        />
      </div>
      {Array.from({ length: 3 }, (_, i) => {
        let pageToShow;
        if (currentPage === 1 || currentPage === 2) {
          pageToShow = 1 + i;
        } else if (currentPage === totalPages && totalPages > 2) {
          pageToShow = totalPages - 2 + i;
        } else {
          pageToShow = currentPage - 1 + i;
        }
        if (pageToShow > totalPages) return null;
        return (
          <div className="flex items-center" key={pageToShow}>
            <button
              onClick={() => navigateToPage(pageToShow)}
              className={`${currentPage === pageToShow ? 'text-secondary-light-blue font-bold underline' : ''} mx-1`}
            >
              {pageToShow}
            </button>
          </div>
        );
      })}
      <div className="flex items-center">
        <IoCaretForward
          onClick={() => navigateToPage(Math.min(currentPage + 1, totalPages))}
          className="mx-1 hover:text-secondary-light-blue cursor-pointer text-2xl"
        />
      </div>
      <div className="flex items-center">
        <FaForward
          onClick={() => navigateToPage(totalPages)}
          className="mx-1 hover:text-secondary-light-blue cursor-pointer"
        />
      </div>
    </div>
  );
};

export default PaginationMenu;
