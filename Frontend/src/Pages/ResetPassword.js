import React, { useState } from "react";
import {
  Box,
  Container,
  FormHelperText,
  IconButton,
  InputAdornment,
  Paper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import API from "../Api/ApiCall";
import {
  logoutUser,
  selectAuthForgotPhoneData,
} from "../Feature/Auth/authSlice";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";
import { openSnackbar } from "../Feature/Snackbar/snackbarSlice";
import AuthTextField from "../Components/Auth/AuthTextField";
import AuthButton from "../Components/Auth/AuthButton";

export default function ResetPassword() {
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forgotPhoneData = useSelector(selectAuthForgotPhoneData);

  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const password = watch("password");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const [loading, setLoading] = useState(false);

  const onFormSubmit = async (data) => {
    try {
      const { password } = data;
      setLoading(true);
      await API.forgotPasswordAPI({
        mobile_number: forgotPhoneData?.mobileNumber,
        password,
      });
      dispatch(logoutUser());
      navigate("/auth");
      dispatch(
        openSnackbar({
          message: "Password Changed Successful",
          type: "success",
        })
      );
    } catch (error) {
    } finally {
      setLoading(false);
      reset();
    }
  };

  if (!forgotPhoneData?.otpVerified) {
    return navigate("/auth");
  }

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
          padding: "20px 10px",
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
            }}
          >
            <Typography
              variant="h5"
              fontSize="600"
              sx={{ fontFamily: "Ubuntu,sans-serif" }}
            >
              Reset Password
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onFormSubmit)}
              marginTop={1}
            >
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
                inputRef={register("password").ref}
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

              <AuthTextField
                variant="outlined"
                type={showPassword ? "text" : "password"}
                fullWidth
                inputRef={register("confirmPassword").ref}
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
              <AuthButton type="submit" loading={loading} fullWidth>
                Reset Password
              </AuthButton>
            </Box>
          </Box>
        </Container>
      </Paper>
    </Box>
  );
}
