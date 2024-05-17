import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React from "react";
import { green, grey } from "@mui/material/colors";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckIcon from "@mui/icons-material/Check";

const RechargeSuccessDialogue = ({ open, onClose, amount }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>
        <Badge
          badgeContent={<CheckIcon sx={{ height: 8, width: 9 }} />}
          color="success"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <PaymentIcon sx={{ height: 50, width: 50, color: green[800] }} />
        </Badge>
      </DialogTitle>
      <DialogContent>
        <Box
          display="flex"
          flexDirection="column"
          minWidth={{ xs: "auto", sm: 280 }}
        >
          <Typography
            fontWeight="bold"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            Successfully Processed
          </Typography>
          <Typography
            color={grey[500]}
            sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}
          >
            Your deposit of ₹{amount} has been successfully processed. Please
            await our approval. Thank you for your patience.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: green[800],
              borderRadius: 1,
              padding: { xs: 0.5, sm: 1 },
              my: 1,
            }}
            onClick={onClose}
          >
            Thank You
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default RechargeSuccessDialogue;
