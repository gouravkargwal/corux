import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Avatar,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import LoadingButton from "../../UI/LoadingButton";
import { blue, grey, red } from "@mui/material/colors";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { selectPaymentQrData } from "../../../Feature/Payment/paymentSlice";
import API from "../../../Api/ApiCall";
import RechargeSuccessDialogue from "../../UI/RechargeSuccessDialogue";
import { toast } from "react-toastify";

const ManualAddMoney = () => {
  let { amount } = useParams();
  const qrData = useSelector(selectPaymentQrData);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      utr: "",
    },
  });

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      sessionStorage.setItem("manualAddMoneyReloaded", "true");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    if (sessionStorage.getItem("manualAddMoneyReloaded") === "true") {
      sessionStorage.removeItem("manualAddMoneyReloaded");
      toast.error("Contact support as page was refreshed.");
      navigate("/profile/recharge");
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

  const onClose = () => {
    setOpen(false);
    navigate("/profile/wallet");
  };

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);
      await API.saveUtrAPI({
        transaction_id: qrData.transaction_id,
        utr: data.utr,
      });
      setLoading(false);
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
    }
  };
  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        marginTop={1}
        borderRadius={1}
        padding={2}
      >
        <Box display="flex" justifyContent="center" alignItems="center">
          <img src={`data:image/png;base64,${qrData?.qr_code}`} alt="QR Code" />
        </Box>
        <Typography
          variant="body2"
          color="error"
          align="center"
          sx={{ marginTop: 2 }}
        >
          Important: Do not refresh or reload this page before entering the UTR.
          In case of any error, please contact us for assistance.
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        marginTop={1}
        borderRadius={1}
        padding={2}
      >
        <Controller
          name="utr"
          control={control}
          rules={{
            required: "UTR is required",
            validate: (value) => value > 0 || "Amount must be greater than 0",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ borderColor: grey[500] }}
              error={!!errors.amount}
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter UTR"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar
                      sx={{
                        bgcolor: red[500],
                      }}
                    >
                      <ReceiptIcon sx={{ color: "text.white" }} />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <FormHelperText
          error={!!errors.utr}
          sx={{ visibility: errors ? "visible" : "hidden", height: "20px" }}
        >
          {errors ? errors?.utr?.message : " "}
        </FormHelperText>
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          loading={loading}
          sx={{
            bgcolor: blue[500],
            borderRadius: 10,
            padding: [2, 0],
          }}
        >
          Submit
        </LoadingButton>
      </Box>
      <RechargeSuccessDialogue open={open} onClose={onClose} amount={amount} />
    </Box>
  );
};

export default ManualAddMoney;
