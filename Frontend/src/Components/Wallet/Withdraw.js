import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Box from "@mui/material/Box";
import Info from "../Profile/Info";
import { FormHelperText, Grid, Typography } from "@mui/material";
import API from "../../Api/ApiCall";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import WithdrawSuccessDialogue from "../UI/WithdrawSuccessDialogue";
import { useSelector } from "react-redux";
import { selectIsBlocked } from "../../Feature/Balance/balanceSlice";
import AuthTextField from "../Auth/AuthTextField";
import AuthButton from "../Auth/AuthButton";

const Withdraw = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState(null);
  const isBlock = useSelector(selectIsBlocked);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
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
      {isBlock && (
        <Typography
          variant="body2"
          color="error"
          align="center"
          sx={{ marginTop: 2 }}
        >
          Important: Your account is blocked, so adding or withdrawing money is
          not allowed. Please contact us for further assistance.
        </Typography>
      )}
      <Box
        sx={{
          padding: "40px",
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
        margin={3}
        borderRadius={1}
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        gap={2}
        marginTop={0}
      >
        <Grid container>
          <Grid item xs={12}>
            <Controller
              name="amount"
              control={control}
              rules={{
                required: "Amount is required",
                validate: (value) =>
                  value >= 300 || "Amount must be greater than or equal 300",
              }}
              render={({ field }) => (
                <AuthTextField
                  {...field}
                  error={!!errors.amount}
                  fullWidth
                  type="number"
                  placeholder="Enter Amount"
                />
              )}
            />
            <FormHelperText
              error={!!errors.amount}
              sx={{
                visibility: errors ? "visible" : "hidden",
                height: "10px",
                m: 1,
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
                <AuthTextField
                  {...field}
                  error={!!errors.upi}
                  fullWidth
                  type="text"
                  placeholder="Enter UPI"
                />
              )}
            />
            <FormHelperText
              error={!!errors.upi}
              sx={{
                visibility: errors ? "visible" : "hidden",
                height: "10px",
                m: 1,
              }}
            >
              {errors ? errors?.upi?.message : " "}
            </FormHelperText>
          </Grid>
          <Grid item xs={12} marginTop={1}>
            <AuthButton
              type="submit"
              disabled={isBlock}
              loading={loading}
              fullWidth
            >
              Withdraw
            </AuthButton>
          </Grid>
        </Grid>
      </Box>
      <WithdrawSuccessDialogue
        open={open}
        onClose={onClose}
        amount={withdrawnAmount}
      />
    </Box>
  );
};

export default Withdraw;
