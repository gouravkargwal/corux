import React, { memo, useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import {
  getResultList,
  selectResultCurrentPage,
  selectResultData,
  selectResultLoading,
  selectResultPage,
  setWinnerCurrentPage,
} from "../../Feature/Result/resultSlice";
import AgGridPagination from "../UI/AgGridPagination";
import TableSkeleton from "../UI/TableSkeleton";
import { blue, green, grey, purple, red } from "@mui/material/colors";
import { selectGameId } from "../../Feature/ColorPrediction/colorPredictionSlice";

const WinnerTable = ({ activeTab }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectResultData);
  const page = useSelector(selectResultPage);
  const currentPage = useSelector(selectResultCurrentPage);
  const loading = useSelector(selectResultLoading);
  const gameId = useSelector(selectGameId);

  const [gridApi, setGridApi] = useState(null);
  function onGridReady(params) {
    setGridApi(params.api);
  }

  useEffect(() => {
    if (activeTab === 0) {
      dispatch(setWinnerCurrentPage(1));
      dispatch(getResultList({ page: 1, size: 10 }));
    }
  }, [dispatch]);

  const paginationHandler = (e, page) => {
    dispatch(setWinnerCurrentPage(page));
    dispatch(getResultList({ page, size: 10 }));
  };

  const filteredData = data?.filter((item) => item.game_id !== gameId);

  const defaultColDef = {
    sortable: true,
    resizable: true,
    flex: 1,
    minWidth: 100,
    headerClass: "header-cell",
    cellClass: "cell",
  };

  const getColor = (colorName) => {
    switch (colorName) {
      case "red":
        return red[600];
      case "green":
        return green[600];
      case "violet":
        return purple[600];
      default:
        return "#000000";
    }
  };

  const columnDefs = [
    {
      headerName: "Period",
      field: "game_id",
      cellRenderer: ({ value }) => {
        return (
          <Typography color={grey[800]} variant="caption" fontSize="10px">
            {value}
          </Typography>
        );
      },
    },
    {
      headerName: "Color",
      field: "color_who_won",
      cellRenderer: ({ value }) => {
        if (value.length == 2) {
          return (
            <Box gap={0.3} display="flex">
              <Box
                sx={{
                  height: 15,
                  width: 15,
                  borderRadius: "50%",
                  background: getColor(value[0]),
                }}
              />
              <Box
                sx={{
                  height: 15,
                  width: 15,
                  borderRadius: "50%",
                  background: getColor(value[1]),
                }}
              />
            </Box>
          );
        } else {
          return (
            <Box
              sx={{
                height: 15,
                width: 15,
                borderRadius: "50%",
                background: getColor(value[0]),
              }}
            />
          );
        }
      },
    },
    {
      headerName: "Number",
      field: "number_who_won",
      cellRenderer: ({ value }) => {
        return (
          <Typography
            variant="caption"
            fontSize="10px"
            sx={{
              color: [1, 3, 5, 7, 9].includes(value) ? green[600] : red[600],
            }}
          >
            {value}
          </Typography>
        );
      },
    },
  ];

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return { backgroundColor: blue[100] };
    } else {
      return null;
    }
  };

  const noRowsMessage = `<div style="text-align: center; padding: 10px; font-size: 16px;">No data available</div>`;

  return (
    <Box sx={{ width: "100%", maxWidth: "100%", overflowX: "auto" }}>
      {loading ? (
        <TableSkeleton />
      ) : (
        <Box display="flex" flexDirection="column" gap={2} alignItems="stretch">
          <Box className="ag-theme-quartz glass-container">
            <AgGridReact
              onGridReady={onGridReady}
              rowData={filteredData}
              columnDefs={columnDefs}
              domLayout="autoHeight"
              getRowStyle={getRowStyle}
              defaultColDef={defaultColDef}
              overlayNoRowsTemplate={noRowsMessage}
              gridOptions={{
                suppressDragLeaveHidesColumns: true,
                suppressMovableColumns: true,
              }}
            />
          </Box>
          <Box>
            <AgGridPagination
              count={page}
              onChange={paginationHandler}
              page={currentPage}
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default memo(WinnerTable);
