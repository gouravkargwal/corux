import React, { useState } from "react";
import {
  Box,
  TextField,
  InputAdornment,
  Avatar,
  FormHelperText,
  Typography,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import LoadingButton from "../../UI/LoadingButton";
import { blue, grey, red } from "@mui/material/colors";
import ReceiptIcon from "@mui/icons-material/Receipt";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const ManualAddMoney = () => {
  let { amount } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(null);
  const [showCopyConfirmation, setShowCopyConfirmation] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      utr: "",
    },
  });
  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setShowCopyConfirmation(true);
        setTimeout(() => {
          setShowCopyConfirmation(false);
        }, 3000);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);
      console.log(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
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
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography>UPI ID</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>gouravkargwal@oksbi</Typography>
            <IconButton
              onClick={() => copyToClipboard("Hello")}
              aria-label="copy"
            >
              <ContentCopyIcon />
            </IconButton>
            {showCopyConfirmation ? (
              <Typography variant="body2" color="success.main">
                Copied!
              </Typography>
            ) : (
              <Typography variant="body2" color="success.main"></Typography>
            )}
          </Box>
        </Box>
        <Typography>Amount {amount}</Typography>
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
        <Controller
          name="utr"
          control={control}
          rules={{
            required: "UTR is required",
            validate: (value) => value > 0 || "Amount must be greater than 0",
          }}
          render={({ field }) => (
            <TextField
              {...field}
              sx={{ borderColor: grey[500] }}
              error={!!errors.amount}
              variant="outlined"
              fullWidth
              margin="normal"
              type="number"
              placeholder="Enter UTR"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar
                      sx={{
                        bgcolor: red[500],
                      }}
                    >
                      <ReceiptIcon sx={{ color: "text.white" }} />
                    </Avatar>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <FormHelperText
          error={!!errors.amount}
          sx={{ visibility: errors ? "visible" : "hidden", height: "20px" }}
        >
          {errors ? errors?.amount?.message : " "}
        </FormHelperText>
        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          loading={loading}
          sx={{
            bgcolor: blue[500],
            borderRadius: 10,
            padding: [2, 0],
          }}
        >
          Submit
        </LoadingButton>
      </Box>
    </Box>
  );
};

export default ManualAddMoney;
