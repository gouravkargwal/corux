import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  Container,
  Grid,
  FormHelperText,
  useMediaQuery,
  Paper,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import LoadingButton from "../Components/UI/LoadingButton";
import { loginUser, selectAuthLoading } from "../Feature/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { blue, grey } from "@mui/material/colors";
import AuthTextField from "../Components/Auth/AuthTextField";

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
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
            }}
          >
            <Typography
              variant="h4"
              align="center"
              gutterBottom
              sx={{
                fontFamily: "Ubuntu,sans-serif",
                fontWeight: 400,
              }}
            >
              Hello Again!
            </Typography>
            <Typography
              variant="h6"
              align="center"
              color={grey[500]}
              sx={{
                fontFamily: "Ubuntu,sans-serif",
                fontWeight: 300,
              }}
            >
              Welcome back
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
              you've been missed!
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              sx={{ mt: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <AuthTextField
                    fullWidth
                    placeholder="Enter mobile number"
                    InputProps={{
                      inputProps: {
                        maxLength: 10,
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
                      m: 1,
                    }}
                  >
                    {errors ? errors?.phone?.message : " "}
                  </FormHelperText>
                </Grid>
                <Grid item xs={12}>
                  <AuthTextField
                    fullWidth
                    placeholder="Enter password"
                    type={showPassword ? "text" : "password"}
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
                      m: 1,
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
                      transition: "color 0.3s ease",
                      "&:hover": { color: grey[800] },
                    }}
                    onClick={() => {
                      navigate("/auth/forgot-password");
                    }}
                  >
                    Recovery password
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <LoadingButton
                    type="submit"
                    fullWidth
                    loading={loading}
                    sx={{
                      backgroundColor: "#fc4642",
                      color: "white",
                      padding: "10px 15px",
                      borderRadius: "20px",
                      boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
                      "&:hover": {
                        backgroundColor: "#fc211d",
                        boxShadow: "0 5px 8px 2px rgba(0, 0, 0, 0.15)",
                      },
                      textTransform: "none",
                      fontSize: "16px",
                    }}
                    variant="contained"
                  >
                    Login
                  </LoadingButton>
                </Grid>
                <Grid item xs={12}>
                  <Typography
                    align="center"
                    sx={{ fontFamily: "Ubuntu,sans-serif" }}
                  >
                    Not a member?{" "}
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
                      Register
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>
          {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
        </Container>
      </Paper>
    </Box>
  );
}
