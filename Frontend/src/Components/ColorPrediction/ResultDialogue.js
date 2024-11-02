import React from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import _ from "lodash";
import { green, red } from "@mui/material/colors";
import ShareIcon from "@mui/icons-material/Share";
import HappyEmoji from "../../Assets/Images/3d-casual-life-money-and-phone.png";
import SadEmoji from "../../Assets/Images/3d-casual-life-sad-and-confused-chatgpt-robot.png";

const ResultDialogue = ({ open, onClose, data }) => {
  const theme = useTheme();
  const generateShareText = () => {
    const header = "🎉 Bet Results! 🎉";
    const results = data
      ?.map((item) =>
        item.amount > 0
          ? `🥳 You won ₹${item.amount} on ${item.bet_on}!`
          : `😔 You lost on ${item.bet_on}.`
      )
      .join("\n");
    const footer = `Check out more at Vega Gaming: ${process.env.REACT_APP_BASE_URL}`;

    return `${header}\n\n${results}\n\n${footer}`;
  };

  const handleShare = () => {
    const shareData = {
      title: "Bet Results",
      text: generateShareText(),
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Share successful"))
        .catch((error) => console.error("Error sharing", error));
    } else {
      alert("Share not supported on this browser.");
    }
  };

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionProps={{ timeout: 500 }}
      fullWidth={true}
      maxWidth="md"
      sx={{
        "& .MuiDialog-paper": {
          padding: 4,
          background: "rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px) saturate(180%) brightness(1.2)",
          WebkitBackdropFilter: "blur(20px) saturate(180%) brightness(1.2)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "16px",
          border: "1px solid rgba(209, 213, 219, 0.3)",
          mx: "auto",
          width: "80%",
          maxWidth: 600,
        },
      }}
    >
      <DialogTitle
        sx={{
          padding: theme.spacing(2),
          position: "relative",
        }}
      >
        <Typography variant="h6">Results</Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          padding: theme.spacing(2),
        }}
      >
        <List>
          {_.map(data, (item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <img
                  src={item.amount > 0 ? HappyEmoji : SadEmoji}
                  alt={item.amount > 0 ? "Win" : "Lose"}
                  style={{ width: 70, height: "auto" }}
                />
              </ListItemIcon>
              <ListItemText
                primary={
                  item.amount > 0 ? (
                    <Typography color={green[500]} variant="body2">
                      You won ₹{item?.amount} on {item?.bet_on}
                    </Typography>
                  ) : (
                    <Typography color={red[500]} variant="body2">
                      You Lost on {item?.bet_on}
                    </Typography>
                  )
                }
                primaryTypographyProps={{
                  variant: "body1",
                  sx: { fontWeight: "bold" },
                }}
              />
            </ListItem>
          ))}
        </List>

        <IconButton
          sx={{
            backgroundColor: "#fc4642",
            color: "white",
            padding: "5px 5px",
            borderRadius: "100%",
            boxShadow: "0 3px 5px 2px rgba(0, 0, 0, 0.1)",
            "&:hover": {
              backgroundColor: "#fc211d",
              boxShadow: "0 5px 8px 2px rgba(0, 0, 0, 0.15)",
            },
            textTransform: "none",
            fontSize: "10px",
          }}
          onClick={handleShare}
        >
          <ShareIcon fontSize="small" />
        </IconButton>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialogue;
