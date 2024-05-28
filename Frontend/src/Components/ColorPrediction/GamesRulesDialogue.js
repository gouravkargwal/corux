import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { DialogContent, IconButton, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { grey } from "@mui/material/colors";

function GameRulesDialog({ open, onClose }) {
  const tradeCost = 100;

  return (
    <Dialog
      onClose={onClose}
      open={open}
      sx={{
        "& .MuiDialog-paper": {
          padding: 4,
          background: "rgba(255, 255, 255, 0.6)",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(20px) saturate(180%) brightness(1.2)",
          WebkitBackdropFilter: "blur(20px) saturate(180%) brightness(1.2)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderRadius: "16px",
          maxWidth: "500px",
          width: "100%",
          border: "1px solid rgba(209, 213, 219, 0.3)",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Ubuntu, sans-serif",
          }}
        >
          Game Trading and Winnings Overview
        </Typography>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 14,
            color: grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <List>
          <ListItem>
            <ListItemText
              primary="Operational Hours"
              secondary="The game operates continuously, featuring 480 trading periods each day. Each period is a 3-minute and 1-second cycle, split into a trading phase of 2 minutes and 30 seconds, and a 30-second result reveal phase."
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: "bold",
                },
                "& .MuiListItemText-secondary": {
                  marginTop: 1,
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Trade Cost"
              secondary={`Participants spend ₹${tradeCost} per trade.`}
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: "bold",
                },
                "& .MuiListItemText-secondary": {
                  marginTop: 1,
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Wagering Options and Payouts"
              secondary="Participants can choose among Green, Red, Violet, or select a specific number for varied payouts based on the game results, ranging from 1.5 times to 9 times the contract value."
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: "bold",
                },
                "& .MuiListItemText-secondary": {
                  marginTop: 1,
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              inset
              primary="Join Green"
              secondary="Win ₹200 for results green, 1, 3, 7, 9; ₹150 for result 5 or green + violet."
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: "bold",
                },
                "& .MuiListItemText-secondary": {
                  marginTop: 1,
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              inset
              primary="Join Red"
              secondary="Win ₹200 for results red, 2, 4, 6, 8; ₹150 for result 0 or red + violet."
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: "bold",
                },
                "& .MuiListItemText-secondary": {
                  marginTop: 1,
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              inset
              primary="Join Violet"
              secondary="Win ₹450 for results violet, 0 and 5."
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: "bold",
                },
                "& .MuiListItemText-secondary": {
                  marginTop: 1,
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              inset
              primary="Select Number"
              secondary="Win ₹900 if the selected number matches the result."
              sx={{
                "& .MuiListItemText-primary": {
                  fontWeight: "bold",
                },
                "& .MuiListItemText-secondary": {
                  marginTop: 1,
                },
              }}
            />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default GameRulesDialog;
