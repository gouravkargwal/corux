import React from "react";
import {
  Button,
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
import {
  CheckCircleOutline,
  RemoveCircleOutline,
  ErrorOutline,
  Close as CloseIcon,
} from "@mui/icons-material";
import _ from "lodash";
import { green, red } from "@mui/material/colors";

const ResultDialogue = ({ open, onClose, data }) => {
  const theme = useTheme();

  return (
    <Dialog
      onClose={onClose}
      open={open}
      TransitionProps={{ timeout: 500 }}
      fullWidth={true}
      maxWidth="md"
      sx={{ width: "80%", maxWidth: 600, mx: "auto" }}
    >
      <DialogTitle
        sx={{
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          padding: theme.spacing(2),
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
          backgroundColor: theme.palette.background.default,
        }}
      >
        <List>
          {_.map(data, (item, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                {item.amount > 0 ? (
                  <picture>
                    <source
                      srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.webp"
                      type="image/webp"
                    />
                    <img
                      src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f973/512.gif"
                      alt="🥳"
                      width="32"
                      height="32"
                    />
                  </picture>
                ) : (
                  <picture>
                    <source
                      srcset="https://fonts.gstatic.com/s/e/notoemoji/latest/1f614/512.webp"
                      type="image/webp"
                    />
                    <img
                      src="https://fonts.gstatic.com/s/e/notoemoji/latest/1f614/512.gif"
                      alt="😔"
                      width="32"
                      height="32"
                    />
                  </picture>
                )}
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
      </DialogContent>
    </Dialog>
  );
};

export default ResultDialogue;
