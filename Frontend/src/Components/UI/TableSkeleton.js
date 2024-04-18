import React from "react";
import { Box, Grid, Divider } from "@mui/material";
import Skeleton from "@mui/material/Skeleton";

export default function TableSkeleton() {
  return (
    <Box
      id="myGrid"
      style={{ height: "50vh", width: "100%", padding: "5px 0px" }}
      className="ag-theme-alpine"
    >
      <Box className="table-skeleton">
        <Grid container spacing={0} alignItems="center">
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Box p={2} pt={"4px"}>
              <Skeleton variant="rectangular" width={"100%"} height={24} />
              <Box pt={1}>
                <Divider />
              </Box>
              <Skeleton variant="text" sx={{ fontSize: "25px" }} />
              <Skeleton variant="text" sx={{ fontSize: "25px" }} />
              <Skeleton variant="text" sx={{ fontSize: "25px" }} />
              <Skeleton variant="text" sx={{ fontSize: "25px" }} />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
