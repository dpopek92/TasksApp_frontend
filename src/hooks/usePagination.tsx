import { useEffect, useState } from "react";
import { ISearchParams } from "interfaces/Search.interface";
import CustomPagination from "components/CustomPagination/CustomPagination";

const usePagination = (init: ISearchParams) => {
  const [pageNumber, setPageNumber] = useState<number>(init.pageNumber);
  const [itemsPerPage, setItemsPerPage] = useState<number>(init.itemsPerPage);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const calcTotalPages = () => {
    if (totalItems && itemsPerPage) {
      const pages = totalItems / itemsPerPage;
      setTotalPages(Math.ceil(pages));
    }
  };

  useEffect(() => {
    calcTotalPages();
  }, [totalItems, itemsPerPage]);

  const handlePagination = (pageNumber: number) => {
    setPageNumber(pageNumber);
  };
  const handleItemsPerPage = (itemsPerPage: number) => {
    setItemsPerPage(itemsPerPage);
  };

  const Pagination = () => (
    <CustomPagination
      pageNumber={pageNumber}
      itemsPerPage={itemsPerPage}
      totalPages={totalPages}
      handleItemsPerPage={handleItemsPerPage}
      handlePagination={handlePagination}
    />
  );

  return {
    itemsPerPage,
    pageNumber,
    totalItems,
    totalPages,
    setTotalItems,
    handlePagination,
    handleItemsPerPage,
    Pagination,
  };
};

export default usePagination;
