import { Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import React, { memo } from "react";

const MyRecordTable = () => {
  const columnDefs = [
    { headerName: "Period", field: "id", width: 80 },
    { headerName: "Price", field: "firstName", width: 150 },
    { headerName: "Number", field: "lastName", width: 80 },
    { headerName: "Result", field: "age", width: 80 },
  ];

  const rowData = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  ];
  return (
    <Box className="ag-theme-alpine">
      <AgGridReact columnDefs={columnDefs} rowData={rowData}></AgGridReact>
    </Box>
  );
};

export default memo(MyRecordTable);
