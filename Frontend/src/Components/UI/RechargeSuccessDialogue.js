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
        <Box display="flex" flexDirection="column" minWidth={280}>
          <Typography fontWeight="bold">Successfully Processed</Typography>
          <Typography color={grey[500]}>
            Your last payment of ₹{amount} has been successfully processed.
            Please await our approval. Thank you for your patience.
          </Typography>
          <Button
            variant="contained"
            sx={{
              bgcolor: green[800],
              borderRadius: 1,
              padding: [1, 0],
              my: 2,
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
