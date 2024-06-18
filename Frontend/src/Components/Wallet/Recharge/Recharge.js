import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  Chip,
  Divider,
  FormHelperText,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Info from "../../Profile/Info";
import { blue, grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  generateQr,
  selectPaymentQrError,
  selectPaymentQrLoading,
} from "../../../Feature/Payment/paymentSlice";
import { selectIsBlocked } from "../../../Feature/Balance/balanceSlice";
import AuthTextField from "../../Auth/AuthTextField";
import AuthButton from "../../Auth/AuthButton";
import { styled, keyframes } from "@mui/system";

const predefinedValues = [100, 200, 500, 1000];

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const ChipStyled = styled(Chip)(({ theme }) => ({
  backgroundColor: "white",
  color: "black",
  borderColor: grey[500],
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: blue[500],
    color: "white",
    transform: "scale(1.05)",
  },
  "&:active": {
    transform: "scale(0.95)",
  },
  animation: `${fadeIn} 0.5s ease`,
  margin: theme.spacing(1),
}));

const Recharge = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const qrLoading = useSelector(selectPaymentQrLoading);
  const qrError = useSelector(selectPaymentQrError);
  const isBlock = useSelector(selectIsBlocked);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const onFormSubmit = async (data) => {
    try {
      dispatch(generateQr({ amount: data.amount, navigate }));
    } catch (error) {}
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        padding: isMobile ? 2 : 3,
      }}
    >
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

      <Typography marginLeft={3} fontWeight="600" marginTop={1}>
        Select Amount
      </Typography>
      <Paper
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{
          padding: isMobile ? 2 : 4,
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          WebkitBackdropFilter: "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "16px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          margin: isMobile ? 2 : 3,
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Controller
          name="amount"
          control={control}
          rules={{
            required: "Amount is required",
            validate: (value) =>
              value >= 100 || "Please enter a value more than 100",
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
            visibility: errors.amount ? "visible" : "hidden",
            height: "10px",
            m: 1,
          }}
        >
          {errors.amount ? errors.amount.message : " "}
        </FormHelperText>
        <Divider sx={{ width: "100%", my: 2 }}>
          <Chip label="Or" size="small" />
        </Divider>
        <Box
          display="flex"
          gap={1}
          justifyContent="center"
          marginY={2}
          width="100%"
        >
          {predefinedValues.map((value) => (
            <ChipStyled
              key={value}
              label={`₹ ${value}`}
              onClick={() =>
                setValue("amount", value, { shouldValidate: true })
              }
              clickable
            />
          ))}
        </Box>
        <AuthButton
          type="submit"
          variant="contained"
          fullWidth
          loading={qrLoading}
          disabled={isBlock}
        >
          Recharge
        </AuthButton>
        <FormHelperText
          error={!!qrError}
          sx={{
            visibility: qrError ? "visible" : "hidden",
            height: "10px",
            m: 1,
          }}
        >
          {qrError ? qrError : " "}
        </FormHelperText>
      </Paper>
    </Box>
  );
};

export default Recharge;
