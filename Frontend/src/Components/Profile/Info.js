import * as React from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

export default function Info() {
  return (
    <Box
      sx={{ backgroundColor: "background.main", boxShadow: 0 }}
      margin={3}
      borderRadius={1}
      padding={2}
      display="flex"
      justifyContent="flex-start"
      gap={2}
    >
      <Avatar
        sx={{
          bgcolor: blue[100],
          width: 72,
          height: 72,
        }}
        variant="rounded"
      >
        <AccountBalanceIcon sx={{ color: blue[500], fontSize: 40 }} />
      </Avatar>
      <Box>
        <Typography color="text.grey" variant="body2">
          Total Balance
        </Typography>
        <Typography color="text.blue" variant="h6">
          15151531351
        </Typography>
        <Typography color="text.grey" variant="body2">
          ID # 1231515135151
        </Typography>
      </Box>
    </Box>
  );
}
