import * as React from "react"
import {Stack, TablePagination} from "@mui/material";


function PageNav () {

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const totalItems = 50; 
  const totalPage = Math.ceil(totalItems/rowsPerPage);

  const AppPaganation = ({onPageChange, currentPage, totalPage}) => {
    return(
      <Stack spacing={2} className="items-center py-4">
        <TablePagination 
        component="div" 
        count={totalItems}
        page={currentPage}
        onPageChange={handlePageChange}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleRowsPerPageChange}
        rowsPerPageOptions={[5, 10, 25]}
        />
      </Stack>
    );
  };





  return(
    <></>
  );

}

export default PageNav