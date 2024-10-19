import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  FormHelperText,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import Option from "../Components/Profile/Option";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { grey } from "@mui/material/colors";
import CallIcon from "@mui/icons-material/Call";
import { useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import {
  getBalance,
  selectBalanceMobile,
  selectBalanceUsername,
} from "../Feature/Balance/balanceSlice";
import API from "../Api/ApiCall";
import { toast } from "react-toastify";
import AuthTextField from "../Components/Auth/AuthTextField";
import AuthButton from "../Components/Auth/AuthButton";
import { openSnackbar } from "../Feature/Snackbar/snackbarSlice";

export default function ProfileSettings() {
  const dispatch = useDispatch();
  const username = useSelector(selectBalanceUsername);
  const mobile = useSelector(selectBalanceMobile);
  useEffect(() => {
    dispatch(getBalance());
  }, [dispatch]);

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
      await API.changePasswordAPI({ password });
      dispatch(
        openSnackbar({
          message: "Password Changed Successful",
          type: "success",
        })
      );
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
      reset();
    }
  };

  const iconColor = grey[700];
  const hoverColor = "#fc211d";

  return (
    <Box>
      <Box
        sx={{
          padding: "40px",
          background: "rgba(255, 255, 255, 0.1)",
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(16px) saturate(180%)",
          "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: "12px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        }}
        margin={3}
        borderRadius={1}
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        gap={2}
        marginTop={0}
      >
        <Typography fontWeight="600">Profile Details</Typography>
        <Option
          name={username}
          icon={
            <Avatar
              sx={{
                bgcolor: "transparent",
                width: 40,
                height: 40,
                marginRight: 2,
                transition: "color 0.3s",
                "& .MuiSvgIcon-root": {
                  color: iconColor,
                },
                "&:hover .MuiSvgIcon-root": {
                  color: hoverColor,
                },
              }}
            >
              <AccountCircleIcon sx={{ color: "inherit" }} />
            </Avatar>
          }
        />
        <Option
          name={mobile}
          icon={
            <Avatar
              sx={{
                bgcolor: "transparent",
                width: 40,
                height: 40,
                marginRight: 2,
                transition: "color 0.3s",
                "& .MuiSvgIcon-root": {
                  color: iconColor,
                },
                "&:hover .MuiSvgIcon-root": {
                  color: hoverColor,
                },
              }}
            >
              <CallIcon sx={{ color: "inherit" }} />
            </Avatar>
          }
        />
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{
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
        margin={3}
        marginTop={1}
        borderRadius={1}
        padding={2}
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
          Change Password
        </Typography>
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
          Change Password
        </AuthButton>
      </Box>
    </Box>
  );
}
