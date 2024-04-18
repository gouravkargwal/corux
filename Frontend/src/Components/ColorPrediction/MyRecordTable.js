import React, { memo, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { useDispatch, useSelector } from "react-redux";
import { blue, red, green, violet } from "@mui/material/colors";

import AgGridPagination from "../UI/AgGridPagination";
import TableSkeleton from "../UI/TableSkeleton";
import {
  getUserGameList,
  selectUserCurrentPage,
  selectUserData,
  selectUserLoading,
  selectUserPage,
  setUserGameCurrentPage,
} from "../../Feature/User/userSlice";

const MyRecordTable = () => {
  const dispatch = useDispatch();
  const data = useSelector(selectUserData);
  const page = useSelector(selectUserPage);
  const currentPage = useSelector(selectUserCurrentPage);
  const loading = useSelector(selectUserLoading);

  const [gridApi, setGridApi] = useState(null);
  function onGridReady(params) {
    setGridApi(params.api);
  }

  useEffect(() => {
    if (!data) {
      dispatch(getUserGameList({ page: 1, size: 10 }));
    }
  }, [dispatch]);

  const paginationHandler = (e, page) => {
    dispatch(setUserGameCurrentPage(page));
    dispatch(getUserGameList({ page, size: 10 }));
  };

  const columnDefs = [
    { headerName: "Period", field: "game_id", maxWidth: 185 },
    {
      headerName: "Color/Number",
      field: "bet_on",
      maxWidth: 150,
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
          displayValue = "-";
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
    { headerName: "Bet Amount", field: "bet_amount", maxWidth: 100 },
    { headerName: "Winning", field: "winning", maxWidth: 100 },
  ];

  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) {
      return { backgroundColor: blue[100] };
    } else {
      return null;
    }
  };

  return (
    <Box>
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
