import React, { useState } from "react";
import { Stack, TablePagination } from "@mui/material";

function PageNav() {
  const [currentPage, setCurrentPage] = useState(0); // 0-based index
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalItems = 50;

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  return (
    <Stack spacing={2} className="items-center py-4">
      <TablePagination
        component="div"
        count={totalItems}
        page={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Stack>
  );
}

export default PageNav;
