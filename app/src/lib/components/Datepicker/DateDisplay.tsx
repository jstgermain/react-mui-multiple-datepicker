import React from "react";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Clear";
import moment from "moment";

interface DateDisplayProps {
  selectedDates: Date[];
  readOnly?: boolean;
  selectedDatesTitle: string;
  onRemoveAtIndex: (index: number) => void;
}

const DateDisplay: React.FC<DateDisplayProps> = ({
  selectedDates,
  readOnly = false,
  selectedDatesTitle,
  onRemoveAtIndex,
}) => {
  const theme = useTheme();

  const getFormattedDate = (date: Date) => {
    return moment(date).format("ll");
  };

  const removeDateAtIndex = (index: number) => () => {
    onRemoveAtIndex(index);
  };

  return (
    <Box
      width={240}
      flexDirection="column"
      sx={{
        display: { xs: "none", sm: "flex" },
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        margin={2}
        display="flex"
        alignItems="center"
        alignContent="center"
        justifyContent="space-between"
      >
        <Typography variant="subtitle1">{selectedDatesTitle}</Typography>
        <Typography
          variant="subtitle1"
          color={readOnly ? "textSecondary" : "primary"}
        >
          {selectedDates.length}
        </Typography>
      </Box>
      <Box
        display="flex"
        flexWrap="wrap"
        justifyContent="flex-start"
        p={1}
        sx={{ overflowY: "auto" }}
      >
        {selectedDates.map((date, index) => (
          <Chip
            key={`${date.toString()}`}
            label={getFormattedDate(date)}
            onDelete={!readOnly ? removeDateAtIndex(index) : undefined}
            deleteIcon={!readOnly ? <DeleteIcon /> : undefined}
            color={!readOnly ? "primary" : undefined}
            sx={{
              m: 0.5,
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default DateDisplay;
