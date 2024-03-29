import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Info from "../Profile/Info";
import {
  Avatar,
  Chip,
  Divider,
  FormHelperText,
  InputAdornment,
  Typography,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { blue, green, grey } from "@mui/material/colors";

const Recharge = () => {
  const predefinedValues = [10, 50, 100, 500];
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      amount: "",
    },
  });

  const onFormSubmit = (data) => {
    console.log(data);
  };

  return (
    <Box>
      <Info />
      <Typography marginLeft={3} fontWeight="600">
        Select Amount
      </Typography>
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
        <Divider>
          <Chip label="Or" size="small" />
        </Divider>
        <Box
          display="flex"
          gap={2}
          justifyContent="space-evenly"
          marginY={2}
          flexWrap="wrap"
        >
          {predefinedValues.map((value) => (
            <Button
              key={value}
              variant="outlined"
              onClick={() =>
                setValue("amount", value, { shouldValidate: true })
              }
              sx={{ color: "black", borderColor: grey[500] }}
            >
              ₹{value}
            </Button>
          ))}
        </Box>
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
          Recharge
        </Button>
      </Box>
    </Box>
  );
};

export default Recharge;
