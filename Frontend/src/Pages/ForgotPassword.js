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
      if (error.response) {
        if (error.response.status === 403) {
          toast.error(error.response.data.detail);
          navigate("/auth");
          return;
        } else {
          return toast.error(error.message);
        }
      } else if (error.request) {
        return toast.error("No response received");
      } else {
        return toast.error(error.message);
      }
    } finally {
      setLoadingBtn(false);
    }
  };

  return (
    <Box height="100vh">
      <Container component="main" maxWidth="sm">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <AuthLogo />
          <Typography variant="h5" fontSize="600">
            Forgot Password
          </Typography>
          <Typography variant="caption" fontSize="600" color={grey[500]}>
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
                <TextField
                  fullWidth
                  margin="normal"
                  sx={{ borderColor: grey[500] }}
                  variant="outlined"
                  placeholder="Mobile Number"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar
                          sx={{
                            bgcolor: purple[500],
                          }}
                        >
                          <PhoneAndroidOutlinedIcon
                            sx={{ color: "text.white" }}
                          />
                        </Avatar>
                      </InputAdornment>
                    ),
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
                />
                <FormHelperText
                  error={!!errors.phone}
                  sx={{
                    visibility: errors ? "visible" : "hidden",
                    height: "10px",
                  }}
                >
                  {errors ? errors?.phone?.message : " "}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  loading={loadingBtn}
                  sx={{
                    bgcolor: blue[500],
                    borderRadius: 10,
                    padding: [2, 0],
                    my: 2,
                  }}
                  variant="contained"
                  disabled={!isDirty || !isValid}
                >
                  Send Otp
                </LoadingButton>
              </Grid>
              <Typography sx={{ textAlign: "center", m: 1 }}>
                Don't have an account?{" "}
                <Typography
                  onClick={() => {
                    navigate("/auth/register");
                  }}
                  sx={{
                    color: blue[500],
                    cursor: "pointer",
                  }}
                  component="span"
                >
                  Register
                </Typography>
              </Typography>
            </Grid>
          </Box>
        </Box>
        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </Box>
  );
}
