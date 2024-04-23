import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  Avatar,
  Container,
  Grid,
  FormHelperText,
} from "@mui/material";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "../Components/UI/LoadingButton";
import { loginUser, selectAuthLoading } from "../Feature/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blue, grey, orange, purple } from "@mui/material/colors";
import LOGO from "../Assets/Images/Logo.webp";
import AuthLogo from "../Components/UI/AuthLogo";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm();
  const loading = useSelector(selectAuthLoading);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const onSubmit = async (data) => {
    const { phone, password } = data;
    dispatch(loginUser({ mobile_number: phone, password }));
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
            Login Now
          </Typography>
          <Typography variant="caption" fontSize="600" color={grey[500]}>
            Please enter details to login
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
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
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Password"
                  sx={{ borderColor: grey[500] }}
                  type={showPassword ? "text" : "password"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar
                          sx={{
                            bgcolor: orange[500],
                          }}
                        >
                          <LockOutlinedIcon sx={{ color: "text.white" }} />
                        </Avatar>
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Avatar
                          sx={{
                            bgcolor: purple[500],
                          }}
                        >
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? (
                              <VisibilityOff sx={{ color: "text.white" }} />
                            ) : (
                              <Visibility sx={{ color: "text.white" }} />
                            )}
                          </IconButton>
                        </Avatar>
                      </InputAdornment>
                    ),
                  }}
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must have at least 8 characters",
                    },
                  })}
                  error={!!errors.password}
                />
                <FormHelperText
                  error={!!errors.password}
                  sx={{
                    visibility: errors ? "visible" : "hidden",
                    height: "10px",
                  }}
                >
                  {errors ? errors?.password?.message : " "}
                </FormHelperText>
                <Typography
                  sx={{
                    textAlign: "right",
                    my: 1,
                    color: grey[500],
                    cursor: "pointer",
                  }}
                >
                  Forgot password?
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <LoadingButton
                  type="submit"
                  fullWidth
                  loading={loading}
                  sx={{
                    bgcolor: blue[500],
                    borderRadius: 10,
                    padding: [2, 0],
                    my: 2,
                  }}
                  variant="contained"
                >
                  Login
                </LoadingButton>
              </Grid>
              <Typography sx={{ textAlign: "center", m: 1 }}>
                Don't have an account?{" "}
                <Typography
                  onClick={() => {
                    navigate("/register");
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
