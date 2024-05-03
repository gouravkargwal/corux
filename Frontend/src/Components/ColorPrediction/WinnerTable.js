import React, { memo, useEffect, useState } from "react";
import { Box } from "@mui/material";
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
import { blue } from "@mui/material/colors";
import { selectGameId } from "../../Feature/ColorPrediction/colorPredictionSlice";

const WinnerTable = () => {
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
    dispatch(getResultList({ page: 1, size: 10 }));
  }, [dispatch]);

  const paginationHandler = (e, page) => {
    dispatch(setWinnerCurrentPage(page));
    dispatch(getResultList({ page, size: 10 }));
  };

  const filteredData = data?.filter((item) => item.game_id !== gameId);

  const defaultColDef = {
    sortable: true,
    checkboxSelection: false,
    autoHeight: true,
    filter: true,
    flex: 1,
    suppressMovable: false,
    resizable: true,
  };

  const columnDefs = [
    { headerName: "Period", field: "game_id" },
    {
      headerName: "Color",
      field: "color_who_won",
      cellRenderer: ({ value }) => {
        return (
          <Box
            sx={{
              height: 20,
              width: 20,
              borderRadius: "50%",
              background:
                value.length === 2
                  ? `linear-gradient(90deg, ${value[0]} 50%, ${value[1]} 50%)`
                  : value[0],
            }}
          />
        );
      },
    },
    { headerName: "Number", field: "number_who_won" },
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
          <Box className="ag-theme-quartz">
            <AgGridReact
              onGridReady={onGridReady}
              rowData={filteredData}
              columnDefs={columnDefs}
              domLayout="autoHeight"
              getRowStyle={getRowStyle}
              defaultColDef={defaultColDef}
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
