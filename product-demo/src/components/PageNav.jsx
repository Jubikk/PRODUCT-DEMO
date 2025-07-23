import React from "react";
import { Stack, TablePagination } from "@mui/material";

function PageNav({
  currentPage,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}) {
  return (
    <Stack spacing={2} className="items-center py-4">
      <TablePagination
        component="div"
        count={totalItems}
        page={currentPage}
        onPageChange={onPageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={onRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
    </Stack>
  );
}

export default PageNav;
