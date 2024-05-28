import React, { memo, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { blue, red, green } from "@mui/material/colors";
import AgGridPagination from "../UI/AgGridPagination";
import TableSkeleton from "../UI/TableSkeleton";
import {
  getUserGameList,
  selectUserCurrentPage,
  selectUserData,
  selectUserLoading,
  selectUserPage,
  setUserCurrentPage,
} from "../../Feature/User/userSlice";
import { selectGameId } from "../../Feature/ColorPrediction/colorPredictionSlice";

const MyRecordTable = ({ activeTab }) => {
  const dispatch = useDispatch();
  const data = useSelector(selectUserData);
  const page = useSelector(selectUserPage);
  const currentPage = useSelector(selectUserCurrentPage);
  const loading = useSelector(selectUserLoading);
  const gameId = useSelector(selectGameId);

  const [gridApi, setGridApi] = useState(null);
  function onGridReady(params) {
    setGridApi(params.api);
  }

  useEffect(() => {
    if (activeTab === 1) {
      dispatch(setUserCurrentPage(1));
      dispatch(getUserGameList({ page: 1, size: 10 }));
    }
  }, [activeTab, dispatch]);

  const paginationHandler = (e, page) => {
    dispatch(setUserCurrentPage(page));
    dispatch(getUserGameList({ page, size: 10 }));
  };

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
    { headerName: "Period", field: "game_id" },
    {
      headerName: "Color/Number",
      field: "bet_on",
      cellRenderer: ({ value }) => {
        let color, displayValue;
        if (/[0-9]/.test(value)) {
          color = "-";
          displayValue = value;
        } else {
          switch (value.toLowerCase()) {
            case "red":
              color = red[500];
              break;
            case "green":
              color = green[500];
              break;
            case "violet":
              color = "#b651a2";
              break;
            default:
              color = "-";
              break;
          }
        }
        return (
          <Box
            sx={{
              height: 20,
              width: 20,
              borderRadius: "50%",
              backgroundColor: color,
              display: "inline-block",
              marginRight: 5,
            }}
          >
            <span>{displayValue}</span>
          </Box>
        );
      },
    },
    { headerName: "Bet Amount", field: "bet_amount" },
    {
      headerName: "Winning",
      field: "winning",
      cellRenderer: ({ data }) => {
        if (data.game_id === gameId) {
          return ""; // Hide the winning field for the current game
        }
        return data.winning;
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
          <Box
            className="ag-theme-quartz"
            sx={{ height: "100%", width: "100%" }}
          >
            <AgGridReact
              onGridReady={onGridReady}
              rowData={data}
              columnDefs={columnDefs}
              domLayout="autoHeight"
              getRowStyle={getRowStyle}
              defaultColDef={defaultColDef}
              overlayNoRowsTemplate={noRowsMessage}
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

export default memo(MyRecordTable);
