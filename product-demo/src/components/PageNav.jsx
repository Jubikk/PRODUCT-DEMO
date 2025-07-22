import * as React from "react"
import {Stack, TablePagination} from "@mui/material";

function PageNav () {
  
  const AppPaganation = ({onPageChange, currentPage, totalPage}) => {

    return(
      <Stack spacing={2} className="items-center py-4">
        <TablePagination  
        count={totalPage}
        page={currentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange = {(event,value) => changeRowsPerPage(value)}
        onChange={(event, value) => onPageChange(value)}
        color="primary"
        variant="outlined"
        shape="rounded"
        />
      </Stack>
    );
  };

  return(
    <></>
  );

}

export default PageNav