import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  Avatar,
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
  useMediaQuery,
  Paper,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { toast } from "react-toastify";
import LoadingButton from "../Components/UI/LoadingButton";
import { useDispatch } from "react-redux";
import API from "../Api/ApiCall";
import { setRegistrationData } from "../Feature/Auth/authSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { blue, green, grey, orange, purple, red } from "@mui/material/colors";
import RedeemIcon from "@mui/icons-material/Redeem";
import AuthLogo from "../Components/UI/AuthLogo";
import AuthTextField from "../Components/Auth/AuthTextField";
import AuthButton from "../Components/Auth/AuthButton";

export default function Register() {
  const theme = useTheme();
  let { referCode } = useParams();
  const isXsScreen = useMediaQuery(theme.breakpoints.down("xs"));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const password = watch("password");

  useEffect(() => {
    if (referCode) {
      setValue("referCode", referCode);
    }
  }, [referCode, setValue]);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [loadingBtn, setLoadingBtn] = useState(false);

  const onSubmitRegistration = async (data) => {
    try {
      setLoadingBtn(true);
      const dataToSend = {
        mobile_number: data.mobileNumber,
        refer_code: data?.referCode,
      };
      dispatch(setRegistrationData(data));
      await API.checkUserAPI(dataToSend);
      await API.sendOtpAPI(dataToSend);
      navigate("/auth/otp-verify");
    } catch (error) {
      setLoadingBtn(false);
      if (error.response) {
        if (error.response.status === 403) {
          toast.error(error.response.data.detail);
          navigate("/auth");
          return;
        } else {
          return toast.error(error.response.data.detail);
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backdropFilter: "blur(16px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
      >
        <Container component="main" maxWidth="sm">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: isXsScreen ? 2 : 3,
            }}
          >
            <Typography
              variant="h5"
              fontSize="600"
              sx={{ fontFamily: "Ubuntu,sans-serif" }}
            >
              Sign Up
            </Typography>
            <Typography
              variant="caption"
              fontSize="600"
              color={grey[500]}
              sx={{ fontFamily: "Ubuntu,sans-serif" }}
            >
              Please enter details to continue
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit(onSubmitRegistration)}
              sx={{ mt: 1 }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <AuthTextField
                    fullWidth
                    placeholder="Enter name"
                    {...register("name", { required: "Name is required" })}
                    error={!!errors.name}
                  />
                  <FormHelperText
                    error={!!errors.name}
                    sx={{
                      visibility: errors ? "visible" : "hidden",
                      height: "10px",
                      m: 1,
                    }}
                  >
                    {errors ? errors?.name?.message : " "}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <AuthTextField
                    type="text"
                    fullWidth
                    {...register("mobileNumber", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^[1-9][0-9]{9}$/,
                        message: "Invalid mobile number",
                      },
                    })}
                    placeholder="Mobile Number"
                    error={!!errors.mobileNumber}
                    InputProps={{
                      inputProps: {
                        maxLength: 10,
                      },
                    }}
                  />
                  <FormHelperText
                    error={!!errors.mobileNumber}
                    sx={{
                      visibility: errors ? "visible" : "hidden",
                      height: "10px",
                      m: 1,
                    }}
                  >
                    {errors ? errors?.mobileNumber?.message : " "}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <AuthTextField
                    type={showPassword ? "text" : "password"}
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
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ color: grey[300] }} />
                            ) : (
                              <Visibility sx={{ color: grey[300] }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText
                    error={!!errors.password}
                    sx={{
                      visibility: errors ? "visible" : "hidden",
                      height: "10px",
                      m: 1,
                    }}
                  >
                    {errors ? errors?.password?.message : " "}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <AuthTextField
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    {...register("confirmPassword", {
                      validate: (value) =>
                        value === password || "The passwords do not match",
                    })}
                    placeholder="Confirm Password"
                    error={!!errors.confirmPassword}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ color: grey[300] }} />
                            ) : (
                              <Visibility sx={{ color: grey[300] }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormHelperText
                    error={!!errors.confirmPassword}
                    sx={{
                      visibility: errors ? "visible" : "hidden",
                      height: "10px",
                      m: 1,
                    }}
                  >
                    {errors ? errors?.confirmPassword?.message : " "}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <AuthTextField
                    fullWidth
                    placeholder="Refer Code (Optional)"
                    {...register("referCode")}
                    error={!!errors.referCode}
                  />
                  <FormHelperText
                    error={!!errors.referCode}
                    sx={{
                      visibility: errors ? "visible" : "hidden",
                      height: "10px",
                      m: 1,
                    }}
                  >
                    {errors ? errors?.referCode?.message : " "}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...register("agreeToTerms", {
                          required: "You must agree to the terms & conditions",
                        })}
                        size="small"
                        sx={{
                          color: errors.agreeToTerms ? "red" : "default", // Default color
                          "&.Mui-checked": {
                            color: errors.agreeToTerms ? "red" : "primary", // Color when checked
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" color="textSecondary">
                        I agree to the{" "}
                        <Link
                          href="/terms-and-conditions"
                          underline="always"
                          sx={{ color: blue[500] }}
                        >
                          terms & conditions
                        </Link>
                      </Typography>
                    }
                  />
                </Grid>
                <AuthButton type="submit" fullWidth loading={loadingBtn}>
                  Sign Up
                </AuthButton>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      textAlign: "center",
                      m: 1,
                      fontFamily: "Ubuntu,sans-serif",
                    }}
                  >
                    Already have an account?{" "}
                    <Typography
                      onClick={() => {
                        navigate("/auth");
                      }}
                      sx={{
                        color: blue[500],
                        cursor: "pointer",
                        fontFamily: "Ubuntu,sans-serif",
                      }}
                      component="span"
                    >
                      Login
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}
