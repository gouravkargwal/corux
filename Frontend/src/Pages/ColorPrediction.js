import {
  Box,
  Button,
  Grid,
  IconButton,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import "../../node_modules/ag-grid-community/styles/ag-grid.css";
import "../../node_modules/ag-grid-community/styles/ag-theme-alpine.css";
import { useForm } from "react-hook-form";
import { selectAuthToken, selectAuthUser } from "../Feature/Auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  createBet,
  selectBetLoading,
  selectBettingAllowed,
  selectGameId,
  selectTimer,
  setBettingAllowed,
  setGameId,
  setTimer,
} from "../Feature/ColorPrediction/colorPredictionSlice";
import { selectIsBlocked } from "../Feature/Balance/balanceSlice";
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
import { getBalance } from "../Feature/Balance/balanceSlice";
import ResultDialogue from "../Components/ColorPrediction/ResultDialogue";
import { getResultList } from "../Feature/Result/resultSlice";
import { getUserGameList } from "../Feature/User/userSlice";
import ProfileColor from "../Components/ColorPrediction/ProfileColor";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import YouTubeIcon from "@mui/icons-material/YouTube";
import VideoDialog from "../Components/UI/VideoDialog";
import CustomLoadingIndicator from "../Components/UI/CustomLoadingIndicator";
import OnlineUsers from "../Components/ColorPrediction/OnlineUsers";

const ColorPrediction = () => {
  const dispatch = useDispatch();
  const token = useSelector(selectAuthToken);
  const gameId = useSelector(selectGameId);
  const timer = useSelector(selectTimer);
  const loading = useSelector(selectBetLoading);
  const user = useSelector(selectAuthUser);
  const isBlock = useSelector(selectIsBlocked);
  const bettingAllowed = useSelector(selectBettingAllowed);

  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedNumber, setSelectedNumber] = useState(null);
  const [dialogType, setDialogType] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [loginDialog, setLoginDialog] = useState(false);
  const [rulesDialog, setRulesDialog] = useState(false);
  const [colorBidDialog, setColorBidDialog] = useState(false);
  const [videoDialog, setVideoDialog] = useState(false);

  const [resultDialogue, setResultDialogue] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }
    socket.on("game_state", (data) => {
      if (data?.phase === "betting") {
        dispatch(setBettingAllowed(true));
      } else {
        dispatch(setBettingAllowed(false));
      }
      dispatch(setTimer(data?.remaining_time));
      dispatch(setGameId(data?.game_id));
    });
    socket.on("winner_notification", (data) => {
      if (data.user_list) {
        dispatch(getResultList({ page: 1, size: 10 }));
        const matchingUsers = _.filter(data.user_list, { mobile_number: user });
        if (matchingUsers?.length > 0) {
          setResult(matchingUsers);
          dispatch(getBalance());
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
    reset();
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
        const result = await dispatch(createBet(betData));
        if (createBet.fulfilled.match(result)) {
          dispatch(getBalance());
          dispatch(getUserGameList({ page: 1, size: 10 }));
        }
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

  const getButtonColor = (number) => {
    const baseStyles = {
      background: "transparent",
      transition: "border-color 0.3s ease, background-color 0.3s ease", // Smooth transition for hover effects
      borderWidth: "2px",
      borderStyle: "solid",
      borderRadius: "8px",
      fontWeight: "bold",
    };

    switch (number) {
      case 1:
      case 3:
      case 7:
      case 9:
        return {
          ...baseStyles,
          color: "#28a745",
          border: "2px solid #28a745",
          "&:hover": {
            borderColor: "#1e7e34", // Darker green on hover
            backgroundColor: "rgba(40, 167, 69, 0.1)", // Light green background on hover
          },
        };
      case 2:
      case 4:
      case 6:
      case 8:
        return {
          ...baseStyles,
          color: "#ff4c4c",
          border: "2px solid #ff4c4c",
          "&:hover": {
            borderColor: "#d43737", // Darker red on hover
            backgroundColor: "rgba(255, 76, 76, 0.1)", // Light red background on hover
          },
        };
      case 0:
        return {
          ...baseStyles,
          color: "#ff4c4c",
          borderTopColor: "#ff4c4c", // Left-top in red
          borderLeftColor: "#ff4c4c", // Left-top in red
          borderRightColor: "#9b59b6", // Bottom-right in violet
          borderBottomColor: "#9b59b6", // Bottom-right in violet
          "&:hover": {
            borderTopColor: "#d43737", // Darker red on hover
            borderLeftColor: "#d43737",
            borderRightColor: "#8e44ad", // Darker violet on hover
            borderBottomColor: "#8e44ad",
            backgroundColor: "rgba(255, 76, 76, 0.05)", // Subtle red background on hover
          },
        };
      case 5:
        return {
          ...baseStyles,
          color: "#28a745",
          borderTopColor: "#28a745", // Left-top in green
          borderLeftColor: "#28a745", // Left-top in green
          borderBottomColor: "#9b59b6", // Bottom-right in violet
          borderRightColor: "#9b59b6", // Bottom-right in violet
          "&:hover": {
            borderTopColor: "#1e7e34", // Darker green on hover
            borderLeftColor: "#1e7e34",
            borderBottomColor: "#8e44ad", // Darker violet on hover
            borderRightColor: "#8e44ad",
            backgroundColor: "rgba(40, 167, 69, 0.05)", // Subtle green background on hover
          },
        };
      default:
        return {
          ...baseStyles,
          color: "#333",
          border: "2px solid #bdbdbd",
          "&:hover": {
            borderColor: "#9e9e9e", // Darker gray on hover
            backgroundColor: "rgba(189, 189, 189, 0.1)", // Light gray background on hover
          },
        };
    }
  };



  // General button styling with hover effects and shadows
  const buttonStyles = {
    height: "45px",
    width: "45px",
    borderRadius: "8px",
    fontWeight: "bold",
    boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
    transition: "transform 0.3s, box-shadow 0.3s, background 0.3s",
    "&:hover": {
      transform: "scale(1.1)",
      boxShadow: "0 8px 14px rgba(0, 0, 0, 0.25)",
    },
    "&:disabled": {
      opacity: 0.5,
      cursor: "not-allowed",
    },
  };

  return (
    <>
      <Grid
        container
        direction="column"
        className={resultDialogue || colorBidDialog ? "blur" : ""}
      >
        {token && <ProfileColor timer={timer} />}
        <Grid
          item
          xs={4}
          sx={{
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(16px) saturate(180%)",
            "-webkit-backdrop-filter": "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "12px",
            border: "1px solid rgba(209, 213, 219, 0.3)",
          }}
          marginY={1}
          marginX={3}
          borderRadius={1}
          padding={2}
        >
          <OnlineUsers />
          <Box display="flex">
            <Grid item xs={6}>
              <Typography
                color={theme.palette.text.grey}
                gutterBottom
                display="flex"
                alignItems="center"
              >
                <EmojiEventsIcon sx={{ height: 18 }} />
                GameId
              </Typography>
              <Typography>{gameId}</Typography>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Typography color={theme.palette.text.grey} gutterBottom>
                Count Down
              </Typography>
              <ColorPredictionTimer timer={timer} />
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            marginTop: 1,
            padding: 1,
            background: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            backgroundColor: "rgba(255, 255, 255, 0.5)",
            borderRadius: "16px",
            border: "1px solid rgba(209, 213, 219, 0.3)",
          }}
          marginX={3}
          marginY={1}
          borderRadius={1}
        >
          {isBlock && (
            <Typography
              variant="body2"
              color="error"
              align="center"
              sx={{ marginBottom: 2 }}
            >
              Important: Your account is blocked, so you are not allowed to
              create any bet. Please contact us for further assistance.
            </Typography>
          )}
          <Grid container direction="column" display="flex">
            <Grid item container xs={12} justifyContent="space-evenly" mb={2}>
              <RedButton
                onClick={() => handleOpenBidDialog("color", "red")}
                disabled={!bettingAllowed || isBlock}
                sx={{ ...buttonStyles }}
              >
                Red
              </RedButton>
              <VioletButton
                onClick={() => handleOpenBidDialog("color", "violet")}
                disabled={!bettingAllowed || isBlock}
                sx={{ ...buttonStyles }}
              >
                Violet
              </VioletButton>
              <GreenButton
                onClick={() => handleOpenBidDialog("color", "green")}
                disabled={!bettingAllowed || isBlock}
                sx={{ ...buttonStyles }}
              >
                Green
              </GreenButton>
            </Grid>
            <Grid
              container
              item
              xs={12}
              sm={10}
              justifyContent="space-evenly"
              gap={1}
            >
              {Array.from({ length: 10 }).map((_, index) => {
                return (
                  <Grid item key={index} xs={2} sm={1}>
                    <Button
                      variant="outlined"
                      fullWidth
                      onClick={() => handleOpenBidDialog("number", index)}
                      disabled={!bettingAllowed || isBlock}
                      sx={{
                        ...buttonStyles,
                        ...getButtonColor(index),
                        padding: 1,
                        minWidth: "55px",
                      }}
                    >
                      {index}
                    </Button>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          marginX={1}
          marginY={0}
          borderRadius={1}
          paddingX={2}
          height="40vh"
        >
          <Grid item xs={12}>
            <Paper
              elevation={3}
              sx={{
                marginTop: 1,
                paddingY: 1,
                paddingX: 3,
                background: "rgba(255, 255, 255, 0.1)",
                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(16px) saturate(180%)",
                WebkitBackdropFilter: "blur(16px) saturate(180%)",
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                borderRadius: "16px",
                border: "1px solid rgba(209, 213, 219, 0.3)",
              }}
            >
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                aria-label="simple tabs example"
                variant="fullWidth"
                visibleScrollbar={false}
                sx={{
                  "& .MuiTabs-indicator": {
                    backgroundColor: "#fc211d",
                  },
                  "& .MuiTab-root.Mui-selected": {
                    color: "#fc211d",
                  },
                  "& .MuiTab-root": {
                    transition: "color 0.3s, background-color 0.3s",
                    textTransform: "none",
                    fontWeight: "bold",
                    fontSize: "1rem",
                  },
                }}
              >
                <Tab label="Winner" />
                {token && <Tab label="My Record" />}
              </Tabs>
            </Paper>
          </Grid>
          <Grid item xs={12} my={1}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="body2" fontWeight="500" color={grey[500]}>
                <IconButton onClick={handleOpenRulesDialog}>
                  <NotListedLocationIcon />
                </IconButton>
                Rules
              </Typography>
              <Typography variant="body2" fontWeight="500" color={grey[500]}>
                <IconButton
                  onClick={() => {
                    setVideoDialog(true);
                  }}
                >
                  <YouTubeIcon />
                </IconButton>
                Guide
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12}>
            {activeTab === 0 && <WinnerTable activeTab={activeTab} />}
            {token && activeTab === 1 && (
              <MyRecordTable activeTab={activeTab} />
            )}
          </Grid>
        </Grid>
      </Grid>

      <Suspense fallback={<CustomLoadingIndicator />}>
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

        <VideoDialog
          open={videoDialog}
          onClose={() => {
            setVideoDialog(false);
          }}
          title="How to play"
          videoId="fRuOeAusQQA?si=RavJmLPcyvPqxmiR"
        />
      </Suspense>
    </>
  );
};

export default ColorPrediction;
