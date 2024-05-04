import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Typography, Avatar, Container } from "@mui/material";
import LoadingButton from "../Components/UI/LoadingButton";
import { useNavigate } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";
import API from "../Api/ApiCall";
import { useDispatch, useSelector } from "react-redux";
import {
  registerUser,
  selectAuthRegistrationData,
  selectAuthForgotPhoneData,
  setForgotPhoneData,
} from "../Feature/Auth/authSlice";
import { toast } from "react-toastify";
import AuthLogo from "../Components/UI/AuthLogo";
import { useLocation } from "react-router-dom/dist/umd/react-router-dom.development";

export default function OtpVerify() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { context } = location.state || {};
  const otpRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(120);
  const registrationData = useSelector(selectAuthRegistrationData);
  const forgotPhoneNumber = useSelector(selectAuthForgotPhoneData);

  useEffect(() => {
    // Start the countdown from 120 seconds
    setTimer(120);
    setResendButtonDisabled(true); // Disable resend button initially

    // Interval to decrement the timer every second
    const interval = setInterval(() => {
      setTimer((prevTime) => prevTime - 1);
    }, 1000);

    // Timeout to re-enable the resend button after 120 seconds
    const timeout = setTimeout(() => {
      setResendButtonDisabled(false);
      clearInterval(interval); // Stop the countdown when it's not needed
    }, 120000); // 120 seconds

    return () => {
      clearTimeout(timeout);
      clearInterval(interval); // Cleanup on component unmount
    };
  }, []);

  const {
    control,
    watch,
    handleSubmit,
    formState: { isDirty, isValid },
  } = useForm({
    defaultValues: {
      otp: ["", "", "", ""],
    },
    mode: "onChange",
  });
  const otpValues = watch("otp");
  const allOtpFilled = otpValues.every((val) => val.length === 1);

  const onSubmit = async (data) => {
    const otp = (data?.otp).map(String).join("");
    try {
      setLoading(true);
      let mobile_number =
        context === "forgot"
          ? forgotPhoneNumber.mobile_number
          : registrationData.mobileNumber;
      const combinedData = {
        mobile_number: mobile_number,
        otp: otp,
      };
      const { status } = await API.verifyOtpAPI(combinedData);
      if (status === 200 && context === "forgot") {
        dispatch(
          setForgotPhoneData({
            mobileNumber: forgotPhoneNumber.mobile_number,
            otpVerified: true,
          })
        );
        return navigate("/auth/reset-password");
      } else {
        const userData = {
          mobile_number: registrationData.mobileNumber,
          username: registrationData.name,
          password: registrationData.password,
        };
        if (registrationData.referCode) {
          userData.refer_code = registrationData.referCode;
        }
        dispatch(registerUser({ userData, navigate }));
      }
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (e) => {
    const inputs = otpRef.current.querySelectorAll("input");
    const index = [...inputs].indexOf(e.target);
    if (e.target.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Backspace") {
      const inputs = otpRef.current.querySelectorAll("input");
      const index = [...inputs].indexOf(e.target);
      if (e.target.value === "" && index > 0) {
        inputs[index - 1].focus();
      }
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleResendOtp = async () => {
    try {
      setResendButtonDisabled(true);
      await API.signupAPI(registrationData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Box height="100vh">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box justifyContent="center" display="flex">
            <AuthLogo />
          </Box>
          <Typography variant="h5" fontSize="600" textAlign="center">
            OTP Verification
          </Typography>
          <Typography
            variant="caption"
            fontSize="600"
            color={grey[500]}
            textAlign="center"
          >
            Enter OTP sent to +91
            {context === "forgot" ? (
              <span>{forgotPhoneNumber?.mobile_number}</span>
            ) : (
              <span>{registrationData?.mobileNumber}</span>
            )}
          </Typography>
          <Typography
            onClick={() => {
              context === "forgot"
                ? navigate("/auth/forgot-password")
                : navigate("/auth/register");
            }}
            sx={{
              color: blue[500],
              cursor: "pointer",
            }}
            variant="caption"
            textAlign="center"
          >
            Change Number
          </Typography>
          <Box display="flex" gap={2} my={6} ref={otpRef}>
            {Array.from({ length: 4 }).map((_, index) => (
              <Controller
                name={`otp.${index}`}
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    type="text"
                    sx={{ borderColor: grey[500] }}
                    inputProps={{
                      maxLength: 1,
                      style: { textAlign: "center" },
                    }}
                    onInput={handleInput}
                    onKeyDown={handleKeyDown}
                  />
                )}
                key={index}
              />
            ))}
          </Box>

          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <LoadingButton
              type="submit"
              fullWidth
              disabled={!allOtpFilled || !isValid || !isDirty}
              loading={loading}
              sx={{
                bgcolor: blue[500],
                borderRadius: 10,
                padding: [2, 0],
                my: 1,
              }}
              variant="contained"
            >
              Verify Otp
            </LoadingButton>

            <Typography
              sx={{
                textAlign: "center",
                my: 1,
                color: blue[500],
              }}
            >
              {formatTime(timer)}
            </Typography>

            <Typography sx={{ textAlign: "center", my: 2 }}>
              Didn't receive the OTP?{" "}
              <Typography
                onClick={handleResendOtp}
                sx={{
                  cursor: resendButtonDisabled ? "default" : "pointer",
                  color: resendButtonDisabled ? grey[500] : blue[500],
                }}
                component="span"
              >
                Resend
              </Typography>
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
