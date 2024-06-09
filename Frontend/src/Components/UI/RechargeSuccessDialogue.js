import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { green, grey } from "@mui/material/colors";
import PaymentIcon from "@mui/icons-material/Payment";
import CheckIcon from "@mui/icons-material/Check";

const RechargeSuccessDialogue = ({ open, onClose, amount }) => {
  const theme = useTheme();
  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionProps={{ timeout: 500 }}
      fullWidth={true}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          padding: 4,
          background: "rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px) saturate(180%) brightness(1.2)",
          WebkitBackdropFilter: "blur(20px) saturate(180%) brightness(1.2)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "16px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          mx: "auto",
          width: "80%",
          maxWidth: 600,
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: theme.spacing(2),
          position: "relative",
        }}
      >
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
            sx={{
              fontFamily: "Ubuntu, sans-serif",
            }}
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
              backgroundColor: green[700],
              color: "white",
              padding: "10px 15px",
              borderRadius: "20px",
              boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
              "&:hover": {
                backgroundColor: green[800],
                boxShadow: "0 5px 8px 2px rgba(0, 0, 0, 0.15)",
              },
              textTransform: "none",
              fontSize: "16px",
              marginTop: "10px",
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
