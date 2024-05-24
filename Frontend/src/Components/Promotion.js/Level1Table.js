import React, { memo, useState } from "react";
import { Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { blue, grey } from "@mui/material/colors";
import AgGridPagination from "../UI/AgGridPagination";

const Level1Table = ({ data }) => {
  const [gridApi, setGridApi] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  function onGridReady(params) {
    setGridApi(params.api);
  }

  const defaultColDef = {
    sortable: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
    filter: true,
    headerClass: "header-cell",
    cellClass: "cell",
  };

  const columnDefs = [
    { headerName: "Game ID", field: "game_id" },
    {
      headerName: "Phone",
      field: "level_1_refer",
      cellRenderer: ({ value }) => {
        const lastFourDigits = value.slice(-4);
        return <span>xxxxxx{lastFourDigits}</span>;
      },
    },
    { headerName: "Commission", field: "amount_won" },
  ];

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return { backgroundColor: blue[50] };
    } else {
      return null;
    }
  };

  const paginationHandler = (event, page) => {
    setCurrentPage(page - 1);
  };

  const startRow = currentPage * pageSize;
  const endRow = (currentPage + 1) * pageSize;
  const rowData = data?.slice(startRow, endRow);

  const noRowsMessage = `<div style="text-align: center; padding: 10px; font-size: 16px;">No data available</div>`;

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
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
        <Box display="flex" justifyContent="center">
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

export default memo(Level1Table);
