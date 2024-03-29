import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormHelperText,
  Grid,
  InputAdornment,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import PhoneAndroidOutlinedIcon from "@mui/icons-material/PhoneAndroidOutlined";
import { useForm } from "react-hook-form";
import API from "../Api/ApiCall";

export default function ForgotPassword() {
  const [combinedData, setCombinedData] = useState("");
  const [showOtpDialog, setShowOtpDialog] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Separate useForm instances for each form
  const {
    register: registerMobile,
    handleSubmit: handleSubmitMobile,
    formState: { errors: mobileErrors },
    reset: resetMobile,
  } = useForm();

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    formState: { errors: otpErrors },
    reset: resetOtp,
  } = useForm();

  const {
    register: registerReset,
    handleSubmit: handleSubmitReset,
    watch,
    formState: { errors: resetErrors },
    reset: resetPassword,
  } = useForm();
  const newPassword = watch("newPassword");

  const onSubmitMobile = async (data) => {
    try {
      console.log("Mobile data:", data);
      await API.resetPassword(data);
      setShowOtpDialog(true);
    } catch (error) {}
  };

  const onVerifyOtp = async (data) => {
    try {
      console.log("OTP data:", data);
      setCombinedData({ ...combinedData, data });
      await API.resetPasswordVerifyOtp({ ...combinedData, data });
      setShowOtpDialog(false);
      setShowResetModal(true);
    } catch (error) {}
  };

  const onResetPassword = async (data) => {
    try {
      console.log("Reset Password data:", data);
      setCombinedData({ ...combinedData, data });
      await API.resetPasswordChangePassword({ ...combinedData, data });
      setShowResetModal(false);
      resetPassword();
      resetOtp();
      resetMobile();
    } catch (error) {}
  };

  return (
    <>
      <Box id="login" className="main_content">
        {/* Mobile number submission form */}
        <Grid container spacing={0}>
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Box className="login_info">
              <form onSubmit={handleSubmitMobile(onSubmitMobile)}>
                <Box mt={3}>
                  <TextField
                    fullWidth
                    id="phone"
                    name="phone"
                    variant="outlined"
                    className="input_field"
                    placeholder="Mobile Number"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <PhoneAndroidOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                    {...registerMobile("phone", {
                      required: "Mobile number is required",
                      pattern: {
                        value: /^\+?([0-9]{1,3})?([0-9]{10})$/,
                        message: "Invalid mobile number",
                      },
                    })}
                    error={!!mobileErrors.phone}
                  />
                  {mobileErrors.phone && (
                    <FormHelperText error={true}>
                      {mobileErrors.phone.message}
                    </FormHelperText>
                  )}
                </Box>
                <Box mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    className="login_btn"
                    fullWidth
                  >
                    Send
                  </Button>
                </Box>
              </form>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* OTP Verification Dialog */}
      <Dialog open={showOtpDialog} onClose={() => setShowOtpDialog(false)}>
        <Box component="form" onSubmit={handleSubmitOtp(onVerifyOtp)}>
          <DialogTitle>Verify OTP</DialogTitle>
          <DialogContent>
            <TextField
              {...registerOtp("otp", { required: "OTP is required" })}
              error={!!otpErrors.otp}
              helperText={otpErrors.otp?.message}
              placeholder="Enter OTP"
              fullWidth
            />
            <Button type="submit">Verify</Button>
          </DialogContent>
        </Box>
      </Dialog>

      {/* Password Reset Modal */}
      <Modal open={showResetModal} onClose={() => setShowResetModal(false)}>
        <Box
          component="form"
          onSubmit={handleSubmitReset(onResetPassword)}
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6">Reset Password</Typography>
          <TextField
            {...registerReset("newPassword", {
              required: "New Password is required",
              minLength: {
                value: 8,
                message: "Password must be at least 8 characters long",
              },
            })}
            error={!!resetErrors.newPassword}
            helperText={resetErrors.newPassword?.message}
            placeholder="New Password"
            type="password"
            fullWidth
          />
          <TextField
            {...registerReset("confirmNewPassword", {
              validate: (value) =>
                value === newPassword || "The passwords do not match",
            })}
            error={!!resetErrors.confirmNewPassword}
            helperText={resetErrors.confirmNewPassword?.message}
            placeholder="Confirm New Password"
            type="password"
            fullWidth
          />
          <Button type="submit" sx={{ mt: 2 }}>
            Reset Password
          </Button>
        </Box>
      </Modal>
    </>
  );
}
