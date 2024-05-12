import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function GameRulesDialog({ open, onClose }) {
  const tradeCost = 100;

  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Game Trading and Winnings Overview</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 14,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <List>
          <ListItem>
            <ListItemText
              primary="Operational Hours"
              secondary="The game operates continuously, featuring 480 trading periods each day. Each period is a 3-minute and 1-second cycle, split into a trading phase of 2 minutes and 30 seconds, and a 30-second result reveal phase."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Trade Cost"
              secondary={`Participants spend ₹${tradeCost} per trade.`}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary="Wagering Options and Payouts"
              secondary="Participants can choose among Green, Red, Violet, or select a specific number for varied payouts based on the game results, ranging from 1.5 times to 9 times the contract value."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              inset
              primary="Join Green"
              secondary="Win ₹200 for results green, 1, 3, 7, 9; ₹150 for result 5 or green + violet."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              inset
              primary="Join Red"
              secondary="Win ₹200 for results red, 2, 4, 6, 8; ₹150 for result 0 or red + violet."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              inset
              primary="Join Violet"
              secondary="Win ₹450 for results violet, 0 and 5."
            />
          </ListItem>
          <ListItem>
            <ListItemText
              inset
              primary="Select Number"
              secondary="Win ₹900 if the selected number matches the result."
            />
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}

export default GameRulesDialog;
