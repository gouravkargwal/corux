import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Box from "@mui/material/Box";

export default function AgGridPagination({ count, page, onChange }) {
  return (
    <>
      <Box id="pagination">
        <Pagination
          count={count}
          shape="rounded"
          page={page}
          onChange={onChange}
        />
      </Box>
    </>
  );
}
