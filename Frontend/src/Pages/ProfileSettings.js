import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  FormHelperText,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import Option from "../Components/Profile/Option";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { green, blue, purple, grey, orange } from "@mui/material/colors";
import CallIcon from "@mui/icons-material/Call";
import { Controller, useForm } from "react-hook-form";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export default function ProfileSettings() {
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

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onFormSubmit = (data) => {
    console.log(data);
  };

  const validatePasswordsMatch = (confirmPassword) => {
    const { password } = control._formValues;
    return password === confirmPassword || "Passwords do not match";
  };
  return (
    <Box>
      <Box
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        borderRadius={1}
        padding={2}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        gap={2}
      >
        <Typography fontWeight="600">Profile Details</Typography>
        <Option
          name="Gourav Kargwal"
          icon={
            <Avatar
              sx={{
                bgcolor: green[500],
              }}
            >
              <AccountCircleIcon sx={{ color: "text.white" }} />
            </Avatar>
          }
        />
        <Option
          name="7023074548"
          icon={
            <Avatar sx={{ bgcolor: purple[500] }}>
              <CallIcon sx={{ color: "text.white" }} />
            </Avatar>
          }
        />
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit(onFormSubmit)}
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        marginTop={1}
        borderRadius={1}
        padding={2}
      >
        <Typography fontWeight="600">Change Password</Typography>
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
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{
            bgcolor: blue[500],
            borderRadius: 10,
            padding: [2, 0],
          }}
        >
          Change Password
        </Button>
      </Box>
    </Box>
  );
}
