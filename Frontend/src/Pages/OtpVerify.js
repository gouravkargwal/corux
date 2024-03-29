import React, { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Box, TextField, Typography, Avatar, Container } from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoadingButton from "../Components/UI/LoadingButton";
import { useNavigate } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";

export default function OtpVerify() {
  const navigate = useNavigate();
  const otpRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [resendButtonDisabled, setResendButtonDisabled] = useState(true);
  const [timer, setTimer] = useState(120);
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

  const onSubmit = (data) => {
    console.log(data);
  };

  // The event handler for input
  const handleInput = (e) => {
    const inputs = otpRef.current.querySelectorAll("input");
    const index = [...inputs].indexOf(e.target);

    // Automatically move to the next input if there's a next one
    if (e.target.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  };

  // The event handler for key down actions
  const handleKeyDown = (e) => {
    // Check for backspace
    if (e.key === "Backspace") {
      const inputs = otpRef.current.querySelectorAll("input");
      const index = [...inputs].indexOf(e.target);

      // If the current input is empty and there's a previous input, move focus back
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
            <Avatar
              sx={{
                m: 2,
                p: 2,
                borderRadius: 5,
                bgcolor: "white",
                border: "1px solid grey",
              }}
            >
              <LockOutlinedIcon sx={{ color: "black" }} />
            </Avatar>
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
            Enter OTP sent to +91 7023074548
          </Typography>
          <Typography
            onClick={() => {
              navigate("/register");
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
                    inputProps={{ maxLength: 1 }}
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
                onClick={() => {
                  navigate("/resend");
                }}
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
