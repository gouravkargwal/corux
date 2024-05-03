import React, { useState } from "react";
import {
  Avatar,
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { blue, grey, orange } from "@mui/material/colors";
import { Controller, useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { useDispatch, useSelector } from "react-redux";
import LoadingButton from "../Components/UI/LoadingButton";
import API from "../Api/ApiCall";
import { toast } from "react-toastify";
import {
  logoutUser,
  selectAuthForgotPhoneData,
} from "../Feature/Auth/authSlice";
import { useNavigate } from "react-router-dom/dist/umd/react-router-dom.development";

export default function ResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const forgotPhoneData = useSelector(selectAuthForgotPhoneData);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onFormSubmit = async (data) => {
    try {
      const { password } = data;
      setLoading(true);
      console.log(forgotPhoneData);
      await API.forgotPasswordAPI({
        mobile_number: forgotPhoneData?.mobileNumber,
        password,
      });
      dispatch(logoutUser());
      navigate("/auth");
      toast.success("Password Changed Successful");
    } catch (error) {
      if (error.response) {
        return toast.error(error.response?.data?.detail);
      } else if (error.request) {
        return toast.error("No response received");
      } else {
        return toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const validatePasswordsMatch = (confirmPassword) => {
    const { password } = control._formValues;
    return password === confirmPassword || "Passwords do not match";
  };

  if (!forgotPhoneData?.otpVerified) {
    return navigate("/auth");
  }

  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        marginTop={1}
        borderRadius={1}
        padding={2}
      >
        <Typography fontWeight="600">Reset Password</Typography>
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password is required" }}
          render={({ field }) => (
            <TextField
              {...field}
              type={showPassword ? "text" : "password"}
              sx={{ borderColor: grey[500] }}
              variant="outlined"
              fullWidth
              placeholder="Enter New Password"
              error={!!errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar
                      sx={{
                        bgcolor: orange[500],
                      }}
                    >
                      <VpnKeyIcon sx={{ color: "text.white" }} />
                    </Avatar>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              margin="normal"
            />
          )}
        />
        <FormHelperText
          error={!!errors.password}
          sx={{ visibility: errors ? "visible" : "hidden", height: "20px" }}
        >
          {errors ? errors?.password?.message : " "}
        </FormHelperText>

        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirm Password is required",
            validate: validatePasswordsMatch,
          }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ borderColor: grey[500] }}
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              placeholder="Enter Confirm Password"
              error={!!errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar
                      sx={{
                        bgcolor: orange[500],
                      }}
                    >
                      <VpnKeyIcon sx={{ color: "text.white" }} />
                    </Avatar>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle confirm password visibility"
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              margin="normal"
            />
          )}
        />
        <FormHelperText
          error={!!errors.confirmPassword}
          sx={{ visibility: errors ? "visible" : "hidden", height: "20px" }}
        >
          {errors ? errors?.confirmPassword?.message : " "}
        </FormHelperText>
        <LoadingButton
          type="submit"
          variant="contained"
          loading={loading}
          fullWidth
          sx={{
            bgcolor: blue[500],
            borderRadius: 10,
            padding: [2, 0],
          }}
        >
          Reset Password
        </LoadingButton>
      </Box>
    </Box>
  );
}
