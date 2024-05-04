import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Info from "../Profile/Info";
import { Avatar, FormHelperText, Grid, InputAdornment } from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { blue, green, grey, orange } from "@mui/material/colors";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import API from "../../Api/ApiCall";
import { toast } from "react-toastify";
import LoadingButton from "../UI/LoadingButton";
import { useNavigate } from "react-router-dom";
import WithdrawSuccessDialogue from "../UI/WithdrawSuccessDialogue";

const Withdraw = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState(null);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    defaultValues: {
      amount: "",
      upi: "",
    },
  });

  const upiRegex = /^[a-zA-Z0-9.+\-_]+@[a-zA-Z0-9\-_]+$/;

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);
      await API.withdrawMoneyAPI({ amount: data.amount, user_upi: data.upi });
      setWithdrawnAmount(data.amount);
      setOpen(true);
    } catch (error) {
      if (error.response) {
        return toast.error(error.response?.data?.detail);
      } else if (error.request) {
        return toast.error("No response received");
      } else {
        return toast.error(error.message);
      }
    } finally {
      setLoading(false);
      reset();
    }
  };

  const onClose = () => {
    setOpen(false);
    navigate("/profile/wallet");
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
      <Info />
      <Box
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        marginTop={1}
        borderRadius={1}
        padding={2}
      >
        <Grid container>
          <Grid item xs={12}>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required",
                validate: (value) =>
                  value >= 100 || "Amount must be greater than or equal 100",
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ borderColor: grey[500] }}
                  error={!!errors.amount}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="number"
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
                />
              )}
            />
            <FormHelperText
              error={!!errors.amount}
              sx={{
                visibility: errors ? "visible" : "hidden",
                height: "20px",
              }}
            >
              {errors ? errors?.amount?.message : " "}
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="upi"
              control={control}
              rules={{
                required: "UPI is required",
                pattern: {
                  value: upiRegex,
                  message: "Invalid UPI format",
                },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  sx={{ borderColor: grey[500] }}
                  error={!!errors.upi}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  type="text"
                  placeholder="Enter UPI"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar
                          sx={{
                            bgcolor: orange[500],
                          }}
                        >
                          <SensorOccupiedIcon sx={{ color: "text.white" }} />
                        </Avatar>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />
            <FormHelperText
              error={!!errors.upi}
              sx={{
                visibility: errors ? "visible" : "hidden",
                height: "20px",
              }}
            >
              {errors ? errors?.upi?.message : " "}
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={!(isValid && isDirty)}
              loading={loading}
              fullWidth
              sx={{ bgcolor: blue[500], borderRadius: 10, padding: [2, 0] }}
            >
              Withdraw
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
      <WithdrawSuccessDialogue open={open} onClose={onClose} amount={withdrawnAmount}/>
    </Box>
  );
};

export default Withdraw;
