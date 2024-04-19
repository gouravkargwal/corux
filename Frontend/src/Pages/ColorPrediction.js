import {
  Box,
  Button,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import "../../node_modules/ag-grid-community/styles/ag-grid.css";
import "../../node_modules/ag-grid-community/styles/ag-theme-alpine.css";
import { useForm } from "react-hook-form";
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
import {
  GreenButton,
  RedButton,
  VioletButton,
} from "../Components/UI/Button/ColorPredictionButton";
import theme from "../Theme/theme";
import WinnerTable from "../Components/ColorPrediction/WinnerTable";
import MyRecordTable from "../Components/ColorPrediction/MyRecordTable";
import socket from "../Util/socket";
import ColorPredictionTimer from "../Components/ColorPrediction/ColorPredictionTimer";
import _ from "lodash";
import { toast } from "react-toastify";
import NotListedLocationIcon from "@mui/icons-material/NotListedLocation";
import { grey } from "@mui/material/colors";
import GameRulesDialog from "../Components/ColorPrediction/GamesRulesDialogue";
import AuthDialogue from "../Components/UI/AuthDialogue";
import BettingDialogue from "../Components/ColorPrediction/BettingDialogue";
import InfoWithButton from "../Components/Wallet/InfoWithButton";
import { getBalance } from "../Feature/Balance/balanceSlice";
import ResultDialogue from "../Components/ColorPrediction/ResultDialogue";
import { getResultList } from "../Feature/Result/resultSlice";
import { getUserGameList } from "../Feature/User/userSlice";

const ColorPrediction = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const gameId = useSelector(selectGameId);
  const timer = useSelector(selectTimer);
  const loading = useSelector(selectBetLoading);
  const user = useSelector(selectAuthUser);
  const error = useSelector(selectBetError);
  const bettingAllowed = useSelector(selectBettingAllowed);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [loginDialog, setLoginDialog] = useState(false);
  const [rulesDialog, setRulesDialog] = useState(false);
  const [colorBidDialog, setColorBidDialog] = useState(false);

  const [resultDialogue, setResultDialogue] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
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
      if (data.user_list) {
        const matchingUsers = _.filter(data.user_list, { mobile_number: user });
        console.log(matchingUsers, "Matching user");
        if (matchingUsers?.length > 0) {
          setResult(matchingUsers);
          setResultDialogue(true);
        } else {
          setResult(null);
          setResultDialogue(false);
        }
      }
    });
    return () => socket.disconnect();
  }, [dispatch]);

  useEffect(() => {
    if (timer === 0) {
      dispatch(getResultList({ page: 1, size: 10 }));
    }
  }, [timer, dispatch]);

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

  const handleOpenRulesDialog = () => {
    setRulesDialog(true);
  };
  const handleCloseRulesDialog = () => {
    setRulesDialog(false);
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (timer < 30) {
      toast.error("Betting is closed for this round.");
      return;
    }
    try {
      if (token) {
        const betData = {
          bet_amount: data.amount,
          bet_on: selectedColor ? selectedColor : String(selectedNumber),
          game_id: gameId,
        };
        dispatch(createBet(betData));
        dispatch(getBalance());
        dispatch(getUserGameList({ page: 1, size: 10 }));
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

  useEffect(() => {
    if (timer < 30 && colorBidDialog) {
      setColorBidDialog(false);
      toast.info("Betting is closed for this round.");
    }
  }, [timer, colorBidDialog]);

  return (
    <>
      <Grid container direction="column">
        <InfoWithButton />
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
        <Grid item xs={4} margin={1} borderRadius={1} padding={2} height="40vh">
          <Grid item xs={12} my={1}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              aria-label="simple tabs example"
              variant="fullWidth"
              visibleScrollbar={false}
            >
              <Tab label="Winner" />
              <Tab label="My Record" />
            </Tabs>
          </Grid>
          <Grid item xs={12} my={1}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body1" fontWeight="500">
                {activeTab === 0 ? "Winner" : "My Record"}
              </Typography>
              <Typography variant="body2" fontWeight="500" color={grey[500]}>
                <IconButton onClick={handleOpenRulesDialog}>
                  <NotListedLocationIcon />
                </IconButton>
                Rules
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {activeTab === 0 && <WinnerTable />}
            {activeTab === 1 && <MyRecordTable />}
          </Grid>
        </Grid>
      </Grid>

      <GameRulesDialog open={rulesDialog} onClose={handleCloseRulesDialog} />

      <BettingDialogue
        open={colorBidDialog}
        onClose={handleCloseBidDialog}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        loading={loading}
        dialogType={dialogType}
        selectedColor={selectedColor}
        selectedNumber={selectedNumber}
      />

      <AuthDialogue open={loginDialog} onClose={handleCloseLoginDialog} />

      <ResultDialogue
        open={resultDialogue}
        onClose={() => {
          setResult(null);
          setResultDialogue(false);
        }}
        data={result}
      />
    </>
  );
};

export default ColorPrediction;
