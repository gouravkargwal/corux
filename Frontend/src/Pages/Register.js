import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  CssBaseline,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import LoadingButton from "../Components/UI/LoadingButton";
import { useDispatch, useSelector } from "react-redux";
import API from "../Api/ApiCall";
import { registerUser, selectAuthToken } from "../Feature/Auth/authSlice";
import { Link, useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(selectAuthToken);
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const {
    register: registerOtp,
    handleSubmit: handleOtpSubmit,
    reset: resetOtpForm,
    formState: { errors: otpErrors, isDirty: isDirtyOtp, isValid: isValidOtp },
  } = useForm();
  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [registrationData, setRegistrationData] = useState({});
  const [loadingBtn, setLoadingBtn] = useState(false);

  const onSubmitRegistration = async (data) => {
    try {
      setLoadingBtn(true);
      const dataToSend = {
        mobile_number: data.mobileNumber,
      };
      setRegistrationData(data);
      await API.checkUserAPI(dataToSend);
      await API.sendOtpAPI(dataToSend);
      setOpen(true);
    } catch (error) {
      setLoadingBtn(false);
      if (error.response) {
        if (error.response.status === 403) {
          toast.error(error.response.data.detail);
          navigate("/");
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

  const onSubmitOtp = async (otpData) => {
    try {
      const combinedData = {
        mobile_number: registrationData.mobileNumber,
        otp: otpData.otp,
      };
      console.log(combinedData);
      const { status } = await API.verifyOtpAPI(combinedData);
      if (status === 200) {
        const userData = {
          mobile_number: registrationData.mobileNumber,
          username: registrationData.name,
          password: registrationData.password,
        };
        dispatch(registerUser(userData));
        if (token) {
          navigate("/home");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      resetOtpForm();
      reset();
      setOpen(false);
    }
  };

  const [resendButtonDisabled, setResendButtonDisabled] = useState(true);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        setResendButtonDisabled(false);
      }, 120000); // 120,000 milliseconds = 2 minutes

      return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }
  }, [open]); // Dependency array - this effect runs when 'open' changes

  const handleResendOtp = async () => {
    try {
      setResendButtonDisabled(true); // Disable the button again once clicked
      await API.signupAPI(registrationData);
      // You might want to restart the timer here as well
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmitRegistration)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  placeholder="Name"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PersonOutlineIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type="text"
                  fullWidth
                  {...register("mobileNumber", {
                    required: "Mobile number is required",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Invalid mobile number",
                    },
                  })}
                  placeholder="Mobile Number"
                  error={!!errors.mobileNumber}
                  helperText={errors.mobileNumber?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <PhoneAndroidOutlinedIcon />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  className="input_field"
                  fullWidth
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  placeholder="Password"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  className="input_field"
                  fullWidth
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  })}
                  placeholder="Confirm Password"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      {...register("agreeToTerms", {
                        required: "You must agree to the terms & conditions",
                      })}
                      size="small"
                    />
                  }
                  label="I agree to all statements included in the terms & conditions"
                />
                {errors.agreeToTerms && (
                  <Typography variant="caption" color="error">
                    {errors.agreeToTerms.message}
                  </Typography>
                )}
              </Grid>
              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={!(isValid && isDirty)}
                loading={loadingBtn}
              >
                Register
              </LoadingButton>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="/" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>

      {/* OTP Verification Dialog */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter OTP</DialogTitle>
        <form onSubmit={handleOtpSubmit(onSubmitOtp)}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="otp"
              label="OTP"
              type="text"
              fullWidth
              variant="outlined"
              {...registerOtp("otp", {
                required: "OTP is required",
                pattern: {
                  value: /^\d{4}$/,
                  message: "OTP must be a 4-digit number",
                },
              })}
            />
            {otpErrors.otp && (
              <Typography color="error">{otpErrors.otp.message}</Typography>
            )}
          </DialogContent>
          <LoadingButton
            variant="contained"
            fullWidth
            disabled={!(isValidOtp && isDirtyOtp)}
            type="submit"
          >
            Submit
          </LoadingButton>
          <Box mt={2} textAlign="center">
            <Typography
              variant="h6"
              onClick={handleResendOtp}
              style={{
                cursor: resendButtonDisabled ? "default" : "pointer",
                color: resendButtonDisabled ? "grey" : "blue",
              }}
            >
              Resend Otp
            </Typography>
          </Box>
        </form>
      </Dialog>
    </>
  );
}
