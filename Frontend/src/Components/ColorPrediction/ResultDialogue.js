import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
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
        <List>
          {_.map(data, (item, index) => {
            return (
              <ListItem
                key={index}
                primary={
                  item.amount === 0
                    ? `You lost ${item?.amount} on ${item?.bet_on}`
                    : `You won ${item?.amount} on ${item?.bet_on}`
                }
              />
            );
          })}
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialogue;
