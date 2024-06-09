import React, { useEffect, useState } from "react";
import {
  Box,
  FormHelperText,
  Typography,
  ImageList,
  ImageListItem,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { grey } from "@mui/material/colors";
import { selectPaymentQrData } from "../../../Feature/Payment/paymentSlice";
import API from "../../../Api/ApiCall";
import RechargeSuccessDialogue from "../../UI/RechargeSuccessDialogue";
import { toast } from "react-toastify";
import AuthButton from "../../Auth/AuthButton";
import AuthTextField from "../../Auth/AuthTextField";

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
        marginTop={1}
        borderRadius={1}
        padding={2}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{ overflow: "hidden", width: "100%" }}
        >
          <ImageList
            sx={{
              width: "auto",
              height: "auto",
              alignItems: "center",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <ImageListItem sx={{ width: "auto", height: "auto", padding: 0 }}>
              <img
                src={`data:image/png;base64,${qrData?.qr_code}`}
                alt="QR Code"
                loading="lazy"
                style={{ width: "100%", height: "auto" }}
              />
            </ImageListItem>
          </ImageList>
        </Box>

        <Typography
          variant="body2"
          color="error"
          align="center"
          sx={{ marginTop: 2, marginBottom: 2 }}
        >
          Important: Do not refresh or reload this page before entering the UTR.
          In case of any error, please contact us for assistance.
        </Typography>
        {/* <Divider>
          <Chip label="Or" size="small" />
        </Divider>
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: green[500],
            borderRadius: 10,
            padding: "10px 24px",
            margin: "16px 0",
            minWidth: "auto",
          }}
          onClick={() => {
            window.open(
              `phonepe://pay?pa=${qrData?.upi_id}&am=${qrData?.amount}&cu=INR`,
              "_blank"
            );
          }}
        >
          Pay
        </Button>
        <Typography
          variant="body2"
          color="error"
          align="center"
          sx={{ marginTop: 2 }}
        >
          Important: By clicking the pay button, you will be prompted to choose
          a UPI app for completing the transaction. Once the payment is made,
          please copy the UTR number and enter it in the designated field below.
        </Typography> */}
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
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
        marginTop={1}
        borderRadius={1}
        padding={2}
      >
        <Controller
          name="utr"
          control={control}
          rules={{
            required: "UTR is required",
          }}
          render={({ field }) => (
            <AuthTextField
              {...field}
              sx={{ borderColor: grey[500] }}
              error={!!errors.amount}
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="Enter UTR"
            />
          )}
        />
        <FormHelperText
          error={!!errors.utr}
          sx={{
            visibility: errors ? "visible" : "hidden",
            height: "10px",
            m: 1,
          }}
        >
          {errors ? errors?.utr?.message : " "}
        </FormHelperText>
        <AuthButton
          type="submit"
          variant="contained"
          fullWidth
          loading={loading}
        >
          Submit
        </AuthButton>
      </Box>
      <RechargeSuccessDialogue open={open} onClose={onClose} amount={amount} />
    </Box>
  );
};

export default ManualAddMoney;
