import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../node_modules/ag-grid-community/styles/ag-grid.css";
import "../../node_modules/ag-grid-community/styles/ag-theme-alpine.css";
import { useForm } from "react-hook-form";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { selectAuthToken, selectAuthUser } from "../Feature/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createBet,
  selectBetError,
  selectBetLoading,
  selectBettingAllowed,
  selectGameId,
  selectTimer,
  setBettingAllowed,
  setGameId,
  setTimer,
} from "../Feature/ColorPrediction/colorPredictionSlice";
import LoadingButton from "../Components/UI/LoadingButton";
import {
  GreenButton,
  RedButton,
  VioletButton,
} from "../Components/UI/Button/ColorPredictionButton";
import theme from "../Theme/theme";
import WinnerTable from "../Components/ColorPrediction/WinnerTable";
import MyRecordTable from "../Components/ColorPrediction/MyRecordTable";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import socket from "../Util/socket";
import ColorPredictionTimer from "../Components/ColorPrediction/ColorPredictionTimer";
import _ from "lodash";
import { toast } from "react-toastify";

const ColorPrediction = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const gameId = useSelector(selectGameId);
  const timer = useSelector(selectTimer);
  const loading = useSelector(selectBetLoading);
  const user = useSelector(selectAuthUser);
  const error = useSelector(selectBetError);
  const bettingAllowed = useSelector(selectBettingAllowed);

  const [colorBidDialog, setColorBidDialog] = useState(false);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [loginDialog, setLoginDialog] = useState(false);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect(); // Connect when the component mounts if not already connected
    }
    socket.on("game_state", (data) => {
      if (data.error) {
        console.error(data.error);
      } else {
        if (data.phase === "betting") {
          dispatch(setBettingAllowed(true));
        } else {
          dispatch(setBettingAllowed(false));
        }
        dispatch(setTimer(data.remaining_time));
        dispatch(setGameId(data.game_id));
      }
    });
    socket.on("winner_notification", (data) => {
      console.log(data);
      if (data.user_list) {
        const matchingUser = _.find(data.user_list, { user: user });
        console.log(matchingUser);
        if (matchingUser) {
          console.log(matchingUser);
          toast.success(matchingUser.money);
        }
      }
    });
    return () => socket.disconnect();
  }, [dispatch]);

  const handleOpenBidDialog = (type, value) => {
    if (type === "color") {
      setSelectedColor(value);
      setSelectedNumber(null);
    } else {
      setSelectedNumber(value);
      setSelectedColor(null);
    }
    setDialogType(type);
    setColorBidDialog(true);
  };

  const handleCloseBidDialog = () => {
    setColorBidDialog(false);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      if (token) {
        const betData = {
          bet_amount: data.amount,
          bet_on: selectedColor ? selectedColor : String(selectedNumber),
        };
        dispatch(createBet(betData));
      } else {
        setLoginDialog(true);
      }
    } catch (error) {
    } finally {
      reset();
      handleCloseBidDialog();
    }
  };
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleCloseLoginDialog = () => {
    setLoginDialog(false);
  };

  return (
    <>
      <Grid container direction="column">
        <Grid
          item
          xs={4}
          sx={{ backgroundColor: theme.palette.background.main, boxShadow: 0 }}
          margin={3}
          borderRadius={1}
          padding={2}
          display="flex"
          justifyContent="space-between"
        >
          <Grid item xs={6}>
            <Typography color={theme.palette.text.grey}>GameId</Typography>
            <Typography>{gameId}</Typography>
          </Grid>
          <Grid item xs={6} textAlign="right">
            <Typography color={theme.palette.text.grey}>Count Down</Typography>
            <ColorPredictionTimer timer={timer} />
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ backgroundColor: theme.palette.background.main, boxShadow: 0 }}
          margin={3}
          borderRadius={1}
          padding={2}
        >
          <Grid container direction="column" display="flex">
            <Grid item container xs={12} justifyContent="space-between" mb={2}>
              <RedButton
                onClick={() => handleOpenBidDialog("color", "red")}
                disabled={!bettingAllowed}
              >
                Red
              </RedButton>
              <VioletButton
                onClick={() => handleOpenBidDialog("color", "violet")}
                disabled={!bettingAllowed}
              >
                Violet
              </VioletButton>
              <GreenButton
                onClick={() => handleOpenBidDialog("color", "green")}
                disabled={!bettingAllowed}
              >
                Green
              </GreenButton>
            </Grid>
            <Grid container item xs={12} justifyContent="space-between" gap={2}>
              {Array.from({ length: 10 }).map((_, index) => (
                <Grid item key={index}>
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={() => handleOpenBidDialog("number", index)}
                    disabled={!bettingAllowed}
                  >
                    {index}
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{ backgroundColor: theme.palette.background.main, boxShadow: 0 }}
          margin={3}
          borderRadius={1}
          padding={2}
          height="40vh"
        >
          <Grid item xs={12}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="simple tabs example"
            >
              <Tab label="Winner" />
              <Tab label="My Record" />
            </Tabs>
            <Grid item xs={12}>
              {activeTab === 0 && <WinnerTable />}
              {activeTab === 1 && <MyRecordTable />}
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog onClose={handleCloseBidDialog} open={colorBidDialog}>
        <DialogTitle
          component="div"
          onClose={handleCloseBidDialog}
          display="flex"
          justifyContent="space-between"
        >
          <Typography
            variant="h6"
            sx={{
              color: selectedColor
                ? theme.palette.text[selectedColor]
                : theme.palette.text.blue,
            }}
          >
            {dialogType === "color"
              ? `Join ${selectedColor}`
              : `Select ${selectedNumber}`}
          </Typography>
          <IconButton onClick={handleCloseBidDialog} size="small">
            <HighlightOffIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Box mt={3}>
              <TextField
                label="Amount"
                variant="outlined"
                fullWidth
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon color={theme.palette.button.green} />
                    </InputAdornment>
                  ),
                }}
                {...register("amount", {
                  required: true,
                  pattern: /^[0-9]+(\.[0-9]{1,2})?$/,
                  min: {
                    value: 10,
                    message: "Amount should be at least 10.",
                  },
                })}
                error={!!errors.amount}
                helperText={
                  errors.amount
                    ? "Amount is required and should be a valid number."
                    : ""
                }
              />
            </Box>

            <Box mt={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    {...register("termsAndConditions", { required: true })}
                    size="small"
                  />
                }
                label={
                  <Typography variant="body2">
                    I accept the terms and conditions
                  </Typography>
                }
              />

              {errors.termsAndConditions && (
                <FormHelperText error>
                  You must accept the terms and conditions.
                </FormHelperText>
              )}
            </Box>

            <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
              <Button onClick={handleCloseBidDialog} variant="text">
                Cancel
              </Button>
              <LoadingButton
                type="submit"
                loading={loading}
                variant="contained"
              >
                Submit
              </LoadingButton>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog onClose={handleCloseLoginDialog} open={loginDialog}>
        <DialogTitle>Login</DialogTitle>
        <DialogContent>
          <Button onClick={() => navigate("/login")}>Login</Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
          <Button onClick={handleCloseLoginDialog}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ColorPrediction;
