import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Info from "../Profile/Info";
import {
  Avatar,
  FormHelperText,
  InputAdornment,
  Typography,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { blue, green, grey } from "@mui/material/colors";
import SelectableCard from "./SelectableCard";

const Withdraw = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
      withdrawalMethod: "",
    },
  });

  const onFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onFormSubmit)}>
      <Info />
      <Typography marginLeft={3} fontWeight="600">
        Select Amount
      </Typography>
      <Box
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        marginTop={1}
        borderRadius={1}
        padding={2}
      >
        <Controller
          name="amount"
          control={control}
          rules={{
            required: "Amount is required",
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
              placeholder="Enter Amount"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Avatar
                      sx={{
                        bgcolor: green[500],
                      }}
                    >
                      <CurrencyRupeeIcon sx={{ color: "text.white" }} />
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
      </Box>
      <Typography marginLeft={3} fontWeight="600">
        Withdraw To
      </Typography>
      <Box
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        marginTop={1}
        borderRadius={1}
        padding={2}
      >
        <Controller
          name="withdrawalMethod"
          control={control}
          rules={{ required: "Please select a withdrawal method" }}
          render={({ field }) => (
            <SelectableCard
              options={[
                { id: 1, value: "Visa", label: "VISA" },
                { id: 2, value: "bank", label: "HDFC" },
              ]}
              selectedValue={field.value}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <FormHelperText
          error={!!errors.withdrawalMethod}
          sx={{ visibility: errors ? "visible" : "hidden", height: "20px" }}
        >
          {errors ? errors.withdrawalMethod?.message : " "}
        </FormHelperText>
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ bgcolor: blue[500], borderRadius: 10, padding: [2, 0] }}
        >
          Withdraw
        </Button>
      </Box>
    </Box>
  );
};

export default Withdraw;
