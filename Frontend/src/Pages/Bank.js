import React from "react";
import { useForm, Controller } from "react-hook-form";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { FormHelperText, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const Bank = () => {
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
      <Box
        sx={{ backgroundColor: "background.main", boxShadow: 0 }}
        margin={3}
        borderRadius={1}
        padding={2}
      >
        <Typography fontWeight="600">Bank</Typography>
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
    </Box>
  );
};

export default Bank;
