import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Container,
  Grid,
  FormHelperText,
  Paper,
  useMediaQuery,
} from "@mui/material";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import LoadingButton from "../Components/UI/LoadingButton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blue, grey, purple } from "@mui/material/colors";
import AuthLogo from "../Components/UI/AuthLogo";
import API from "../Api/ApiCall";
import { setForgotPhoneData } from "../Feature/Auth/authSlice";
import { toast } from "react-toastify";
import AuthButton from "../Components/Auth/AuthButton";
import AuthTextField from "../Components/Auth/AuthTextField";

export default function ForgotPassword() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();
  const dispatch = useDispatch();

  const [loadingBtn, setLoadingBtn] = useState(false);

  const onSubmitForgot = async (data) => {
    try {
      setLoadingBtn(true);
      const dataToSend = {
        mobile_number: data.phone,
      };
      dispatch(
        setForgotPhoneData({ mobile_number: data?.phone, otpVerified: false })
      );
      await API.sendOtpForgotAPI(dataToSend);
      navigate("/auth/otp-verify", { state: { context: "forgot" } });
    } catch (error) {
      setLoadingBtn(false);
      return toast.error(
        error.response?.data?.detail || "No response received" || error.message
      );
    } finally {
      setLoadingBtn(false);
    }
  };
  const isMobile = useMediaQuery("(max-width:600px)");

  return (
    <Box
      height="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      className="glass-container"
    >
      <Paper
        elevation={0}
        sx={{
          width: isMobile ? "90%" : "400px",
          padding: "40px",
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            color={grey[500]}
            sx={{
              fontFamily: "Ubuntu,sans-serif",
              fontWeight: 300,
            }}
          >
            Forgot Password
          </Typography>
          <Typography
            variant="h6"
            align="center"
            gutterBottom
            color={grey[500]}
            sx={{
              fontFamily: "Ubuntu,sans-serif",
              fontWeight: 300,
            }}
          >
            Please enter your phone number
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmitForgot)}
            noValidate
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <AuthTextField
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  placeholder="Mobile Number"
                  InputProps={{
                    inputProps: {
                      maxLength: 10, // Limit input to 10 characters
                    },
                  }}
                  {...register("phone", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[1-9][0-9]{9}$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  error={!!errors.phone}
                  inputRef={register("phone").ref}
                />
                <FormHelperText
                  error={!!errors.phone}
                  sx={{
                    visibility: errors ? "visible" : "hidden",
                    height: "10px",
                    m: 1,
                  }}
                >
                  {errors ? errors?.phone?.message : " "}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <AuthButton
                  type="submit"
                  fullWidth
                  loading={loadingBtn}
                  variant="contained"
                >
                  Send Otp
                </AuthButton>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  align="center"
                  sx={{ fontFamily: "Ubuntu,sans-serif" }}
                >
                  Don't have an account?{" "}
                  <Typography
                    onClick={() => {
                      navigate("/auth/register");
                    }}
                    align="center"
                    sx={{
                      color: blue[500],
                      cursor: "pointer",
                      transition: "color 0.3s ease",
                      "&:hover": { color: blue[800] },
                      fontFamily: "Ubuntu,sans-serif",
                    }}
                    component="span"
                  >
                    Sign Up
                  </Typography>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Paper>
    </Box>
  );
}
