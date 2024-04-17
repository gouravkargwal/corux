import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React from "react";

const ResultDialogue = ({ open, onClose, data }) => {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle
        component="div"
        onClose={onClose}
        display="flex"
        justifyContent="space-between"
      >
        <Typography variant="h6">Result</Typography>
      </DialogTitle>

      <DialogContent>
        <ul>
          {_.map(data, (item) => {
            <li>
              {item.amount === 0
                ? `You lost on ${item?.bet_on}`
                : `You won on ${item?.bet_on}`}
            </li>;
          })}
        </ul>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialogue;
