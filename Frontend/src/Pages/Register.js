import React, { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { blue, green, grey, orange, purple } from "@mui/material/colors";

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isDirty, isValid },
  } = useForm();

  const password = watch("password");

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();

  const [loadingBtn, setLoadingBtn] = useState(false);

  const onSubmitRegistration = async (data) => {
    try {
      setLoadingBtn(true);
      const dataToSend = {
        mobile_number: data.mobileNumber,
      };
      dispatch(setRegistrationData(data));
      await API.checkUserAPI(dataToSend);
      await API.sendOtpAPI(dataToSend);
      navigate("/otp-verify");
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

  return (
    <Box height="100vh">
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
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
          <Typography variant="h5" fontSize="600">
            Register Now
          </Typography>
          <Typography variant="caption" fontSize="600" color={grey[500]}>
            Please enter details to continue
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmitRegistration)}
            sx={{ mt: 1 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  fullWidth
                  sx={{ borderColor: grey[500] }}
                  placeholder="Name"
                  {...register("name", { required: "Name is required" })}
                  error={!!errors.name}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Avatar
                          sx={{
                            bgcolor: green[500],
                          }}
                        >
                          <PersonOutlineIcon sx={{ color: "text.white" }} />
                        </Avatar>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormHelperText
                  error={!!errors.name}
                  sx={{
                    visibility: errors ? "visible" : "hidden",
                    height: "10px",
                  }}
                >
                  {errors ? errors?.name?.message : " "}
                </FormHelperText>
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
                  sx={{ borderColor: grey[500] }}
                  error={!!errors.mobileNumber}
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
                  }}
                />
                <FormHelperText
                  error={!!errors.mobileNumber}
                  sx={{
                    visibility: errors ? "visible" : "hidden",
                    height: "10px",
                  }}
                >
                  {errors ? errors?.mobileNumber?.message : " "}
                </FormHelperText>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  sx={{ borderColor: grey[500] }}
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
                />
              </Grid>
              <FormHelperText
                error={!!errors.password}
                sx={{
                  visibility: errors ? "visible" : "hidden",
                  height: "10px",
                }}
              >
                {errors ? errors?.password?.message : " "}
              </FormHelperText>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  type={showPassword ? "text" : "password"}
                  sx={{ borderColor: grey[500] }}
                  fullWidth
                  {...register("confirmPassword", {
                    validate: (value) =>
                      value === password || "The passwords do not match",
                  })}
                  placeholder="Confirm Password"
                  error={!!errors.confirmPassword}
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
                />
                <FormHelperText
                  error={!!errors.confirmPassword}
                  sx={{
                    visibility: errors ? "visible" : "hidden",
                    height: "10px",
                  }}
                >
                  {errors ? errors?.confirmPassword?.message : " "}
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
                    />
                  }
                  label="I agree to all statements included in the terms & conditions"
                />
                {errors.agreeToTerms && (
                  <FormHelperText
                    error={!!errors.agreeToTerms}
                    sx={{
                      visibility: errors ? "visible" : "hidden",
                      height: "10px",
                    }}
                  >
                    {errors ? errors?.agreeToTerms?.message : " "}
                  </FormHelperText>
                )}
              </Grid>
              <LoadingButton
                type="submit"
                variant="contained"
                fullWidth
                disabled={!(isValid && isDirty)}
                loading={loadingBtn}
                sx={{
                  bgcolor: blue[500],
                  borderRadius: 10,
                  padding: [2, 0],
                  my: 2,
                }}
              >
                Register
              </LoadingButton>
              <Grid container justifyContent="center">
                <Grid item>
                  <Typography sx={{ textAlign: "center", m: 1 }}>
                    Already have an account?{" "}
                    <Typography
                      onClick={() => {
                        navigate("/");
                      }}
                      sx={{
                        color: blue[500],
                        cursor: "pointer",
                      }}
                      component="span"
                    >
                      Login
                    </Typography>
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
