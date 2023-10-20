import React, { useEffect, useState } from "react";
import { Form, Pagination, Stack } from "react-bootstrap";
import styled from "styled-components";

const Select = styled(Form.Select)`
  width: 100px;
`;

interface IProps {
  pageNumber: number;
  itemsPerPage: number;
  totalPages: number;
  handlePagination: (pageNumber: number) => void;
  handleItemsPerPage: (itemsPerPage: number) => void;
}

const CustomPagination: React.FC<IProps> = ({
  pageNumber,
  itemsPerPage,
  totalPages,
  handleItemsPerPage,
  handlePagination,
}) => {
  const [pageItems, setPageItems] = useState<number[]>([1]);

  useEffect(() => {
    const newPageItems = [
      pageNumber - 3,
      pageNumber - 2,
      pageNumber - 1,
      pageNumber,
      pageNumber + 1,
      pageNumber + 2,
      pageNumber + 3,
    ].filter((item) => item > 0 && item <= totalPages);
    setPageItems(newPageItems);
  }, [pageNumber, totalPages]);

  return (
    <Stack direction="horizontal">
      <Pagination size="sm" className="mb-0">
        <Pagination.First onClick={() => handlePagination(1)} />
        <Pagination.Prev
          disabled={pageNumber <= 1}
          onClick={() => handlePagination(pageNumber - 1)}
        />

        {pageItems.map((item) => (
          <Pagination.Item
            key={item}
            linkClassName={item === pageNumber ? "pagination-active" : ""}
            onClick={() => handlePagination(item)}
            active={item === pageNumber}
          >
            {item}
          </Pagination.Item>
        ))}

        <Pagination.Next
          disabled={pageNumber >= totalPages}
          onClick={() => handlePagination(pageNumber + 1)}
        />
        <Pagination.Last onClick={() => handlePagination(totalPages)} />
      </Pagination>

      <Select
        value={itemsPerPage}
        onChange={(e: any) => handleItemsPerPage(+e.target.value)}
        size="sm"
        title="Elementów na stronę"
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </Select>
    </Stack>
  );
};

export default CustomPagination;
