import React, { memo, useState } from "react";
import { Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { blue } from "@mui/material/colors";
import AgGridPagination from "../UI/AgGridPagination";

const Level2Table = ({ data }) => {
  const [gridApi, setGridApi] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  function onGridReady(params) {
    setGridApi(params.api);
  }

  const defaultColDef = {
    sortable: false,
    checkboxSelection: false,
    autoHeight: true,
    filter: false,
    flex: 1,
    suppressMovable: false,
    resizable: false,
  };

  const columnDefs = [
    { headerName: "Game ID", field: "game_id" },
    {
      headerName: "Phone",
      field: "level_2_refer",
      cellRenderer: ({ value }) => {
        const lastFourDigits = value.slice(-4);
        return <span>xxxxxx{lastFourDigits}</span>;
      },
    },
    { headerName: "Commission", field: "amount_won" },
  ];

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return { backgroundColor: blue[100] };
    } else {
      return null;
    }
  };

  const paginationHandler = (event, page) => {
    setCurrentPage(page - 1); // AgGridPagination uses 1-based indexing, so subtract 1
  };

  const startRow = currentPage * pageSize;
  const endRow = (currentPage + 1) * pageSize;
  const rowData = data?.slice(startRow, endRow);

  const noRowsMessage = `<div style="text-align: center; padding: 10px; font-size: 16px;">No data available</div>`;

  return (
    <Box>
      <Box display="flex" flexDirection="column" gap={2} alignItems="stretch">
        <Box className="ag-theme-quartz" sx={{ height: "100%", width: "100%" }}>
          <AgGridReact
            onGridReady={onGridReady}
            rowData={rowData}
            columnDefs={columnDefs}
            domLayout="autoHeight"
            getRowStyle={getRowStyle}
            defaultColDef={defaultColDef}
            overlayNoRowsTemplate={noRowsMessage}
          />
        </Box>
        <Box>
          <AgGridPagination
            count={Math.ceil(data?.length / pageSize)}
            onChange={paginationHandler}
            page={currentPage + 1}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default memo(Level2Table);
