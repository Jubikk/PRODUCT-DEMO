import React from "react";
import { Stack, TablePagination, useMediaQuery } from "@mui/material";

function PageNav({
  currentPage,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}) {
  const isMobile = useMediaQuery('(max-width: 768px)');
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
        sx={{
          '& .MuiTablePagination-toolbar': {
            flexDirection: 'row',
            alignItems: 'center',
            gap: isMobile ? 0.5 : 1.5,
            minHeight: isMobile ? 36 : 56,
            padding: isMobile ? '4px 0' : undefined,
          },
          '& .MuiTablePagination-actions': {
            marginLeft: isMobile ? 4 : undefined,
          },
          '& .MuiInputBase-root': {
            fontSize: isMobile ? 13 : undefined,
            minWidth: isMobile ? 36 : undefined,
          },
        }}
        labelRowsPerPage={isMobile ? '' : 'Rows per page:'}
      />
    </Stack>
  );
}

export default PageNav;
