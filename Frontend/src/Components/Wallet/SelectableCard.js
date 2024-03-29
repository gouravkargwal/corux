import React from "react";
import { Card, Badge, CardActionArea, Typography, Box } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

const SelectableCard = ({ options, selectedValue, onChange }) => {
  return (
    <Box display="flex" gap={2}>
      {options.map((option) =>
        selectedValue === option.value ? (
          <Badge
            key={option.value}
            badgeContent={<CheckIcon sx={{ height: 8, width: 9 }} />}
            color="success"
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Card
              variant="outlined"
              sx={{
                mb: 2,
                borderColor:"success.main"
              }}
            >
              <CardActionArea onClick={() => onChange(option.value)}>
                <Typography sx={{ padding: 2 }}>{option.label}</Typography>
              </CardActionArea>
            </Card>
          </Badge>
        ) : (
          <Card
            key={option.value}
            variant="outlined"
            sx={{
              mb: 2,
            }}
            onClick={() => onChange(option.value)}
          >
            <CardActionArea>
              <Typography sx={{ padding: 2 }}>{option.label}</Typography>
            </CardActionArea>
          </Card>
        )
      )}
    </Box>
  );
};

export default SelectableCard;
