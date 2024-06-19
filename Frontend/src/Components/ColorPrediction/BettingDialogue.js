import React from "react";
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AuthTextField from "../Auth/AuthTextField";
import AuthButton from "../Auth/AuthButton";

const BettingDialogue = ({
  open,
  onClose,
  selectedColor,
  dialogType,
  selectedNumber,
  handleSubmit,
  onSubmit,
  register,
  errors,
  loading,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          padding: 3,
          background: "rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px) saturate(180%) brightness(1.2)",
          WebkitBackdropFilter: "blur(20px) saturate(180%) brightness(1.2)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "16px",
          maxWidth: "500px",
          width: "100%",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          maxHeight: isMobile ? "80vh" : "auto",
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h6" fontFamily={"Ubuntu, sans-serif"}>
          {dialogType === "color"
            ? `Join ${selectedColor}`
            : `Select ${selectedNumber}`}
        </Typography>
        <IconButton aria-label="close" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          maxHeight: isMobile ? "calc(100vh - 200px)" : "auto",
          padding: theme.spacing(2),
        }}
      >
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box mb={2}>
            <AuthTextField
              error={!!errors.amount}
              variant="outlined"
              autoComplete="off"
              fullWidth
              margin="normal"
              type="text"
              placeholder="Enter Amount"
              {...register("amount", {
                required: "Amount is required",
                pattern: {
                  value: /^[0-9]+(\.[0-9]{1,2})?$/,
                  message:
                    "Enter a valid amount (numbers only, up to 2 decimal places).",
                },
                min: {
                  value: 25,
                  message: "Amount should be at least 25.",
                },
              })}
              inputRef={register("amount").ref}
            />
            <FormHelperText
              error={!!errors.amount}
              sx={{
                visibility: errors.amount ? "visible" : "hidden",
                height: "10px",
                mt: 1,
              }}
            >
              {errors.amount ? errors.amount.message : ""}
            </FormHelperText>
          </Box>

          <Box mb={2}>
            <FormControlLabel
              control={
                <Checkbox
                  {...register("termsAndConditions", { required: true })}
                  size="small"
                />
              }
              label={
                <Typography variant="caption">
                  I accept the terms and conditions
                </Typography>
              }
            />
            {errors.termsAndConditions && (
              <FormHelperText error>
                You must accept the terms and conditions.
              </FormHelperText>
            )}
          </Box>

          <Box>
            <AuthButton
              type="submit"
              loading={loading}
              variant="contained"
              fullWidth
            >
              Submit
            </AuthButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BettingDialogue;
