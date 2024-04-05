import React, { memo, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { blue, lightBlue } from "@mui/material/colors";

const MyRecordTable = () => {
  const [gridApi, setGridApi] = useState(null);

  const onGridReady = (params) => {
    setGridApi(params.api);
    // Optional: Adjust the grid size on initial load
    setTimeout(() => {
      params.api.sizeColumnsToFit();
    }, 0);
  };

  // Adjust the grid size on window resize
  useEffect(() => {
    const resizeListener = () => {
      gridApi?.sizeColumnsToFit();
    };
    window.addEventListener("resize", resizeListener);
    return () => {
      window.removeEventListener("resize", resizeListener);
    };
  }, [gridApi]);

  const columnDefs = [
    { headerName: "Period", field: "id" },
    { headerName: "Price", field: "firstName" },
    { headerName: "Number", field: "lastName" },
    { headerName: "Result", field: "age" },
  ];

  const rowData = [
    { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
    { id: 2, lastName: "Lannister", firstName: "Cersei", age: 42 },
    { id: 3, lastName: "Lannister", firstName: "Jaime", age: 45 },
  ];

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return { backgroundColor: blue[100] };
    } else {
      return null;
    }
  };

  return (
    <Box class="ag-theme-quartz" style={{ height: "100%", width: "100%" }}>
      <AgGridReact
        columnDefs={columnDefs}
        rowData={rowData}
        domLayout="autoHeight"
        onGridReady={onGridReady}
        getRowStyle={getRowStyle}
      ></AgGridReact>
    </Box>
  );
};

export default memo(MyRecordTable);
