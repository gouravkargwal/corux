import React from "react";
import {
  Avatar,
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import CloseIcon from "@mui/icons-material/Close";
import LoadingButton from "../UI/LoadingButton";
import { blue, green, grey, red } from "@mui/material/colors";
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
  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          padding: "40px",
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        },
      }}
    >
      <DialogTitle
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography
          variant="h6"
          sx={{
            color: selectedColor
              ? selectedColor === "red"
                ? red[500]
                : selectedColor === "blue"
                ? blue[500]
                : green[500]
              : "red",
            fontFamily: "Ubuntu, sans-serif",
          }}
        >
          {dialogType === "color"
            ? `Join ${selectedColor}`
            : `Select ${selectedNumber}`}
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box m={0}>
            <AuthTextField
              error={!!errors.amount}
              variant="outlined"
              autoFocus
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
                  value: 10,
                  message: "Amount should be at least 10.",
                },
              })}
              inputRef={register("amount").ref}
            />
            <FormHelperText
              error={!!errors.amount}
              sx={{
                visibility: errors.amount ? "visible" : "hidden",
                height: "10px",
                m: 1,
              }}
            >
              {errors.amount ? errors.amount.message : ""}
            </FormHelperText>
          </Box>

          <Box textAlign="center">
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
