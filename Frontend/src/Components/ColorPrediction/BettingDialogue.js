import {
  Avatar,
  Box,
  Button,
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
import React from "react";
import LoadingButton from "../UI/LoadingButton";
import theme from "../../Theme/theme";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { blue, green, grey } from "@mui/material/colors";
import CloseIcon from "@mui/icons-material/Close";

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
    <Dialog onClose={onClose} open={open}>
      <DialogTitle
        component="div"
        onClose={onClose}
        display="flex"
        justifyContent="space-between"
      >
        <Typography
          variant="h6"
          sx={{
            color: selectedColor
              ? theme.palette.text[selectedColor]
              : theme.palette.text.blue,
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
            position: "absolute",
            right: 8,
            top: 14,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
          <Box m={0}>
            <TextField
              sx={{ borderColor: grey[500] }}
              error={!!errors.amount}
              variant="outlined"
              autoFocus
              autoComplete="off"
              fullWidth
              margin="normal"
              type="text"
              placeholder="Enter Amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar
                      sx={{
                        bgcolor: green[500],
                      }}
                    >
                      <CurrencyRupeeIcon sx={{ color: "text.white" }} />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
              {...register("amount", {
                required: true,
                pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                min: {
                  value: 10,
                  message: "Amount should be at least 10.",
                },
              })}
            />
            <FormHelperText
              error={!!errors.amount}
              sx={{ visibility: errors ? "visible" : "hidden", height: "20px" }}
            >
              {errors ? errors?.amount?.message : ""}
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
            <LoadingButton
              type="submit"
              loading={loading}
              variant="contained"
              fullWidth
              sx={{
                bgcolor: blue["A700"],
                borderRadius: 10,
                padding: [1, 0],
                my: 2,
              }}
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BettingDialogue;
