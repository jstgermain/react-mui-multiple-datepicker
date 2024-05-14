import React, { useMemo } from "react";
import { Box, useTheme } from "@mui/material";
import DateUtilities from "./utils";
import Circle from "./Circle";

interface WeekProps {
  week: (Date | null)[]; // Allow null values in the week prop
  selectedDates?: Date[];
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  readOnly?: boolean;
  onSelect: (day: Date) => void;
}

const Week: React.FC<WeekProps> = ({
  week,
  selectedDates = [],
  disabledDates = [],
  minDate,
  maxDate,
  readOnly = false,
  onSelect,
}) => {
  const theme = useTheme();
  const todayDate = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const isToday = (day: Date) => day.toISOString().slice(0, 10) === todayDate;

  const isDisabled = (day: Date) => {
    if (readOnly) return true;

    const disabledDate = disabledDates.find((d) =>
      DateUtilities.isSameDay(d, day)
    );
    if (disabledDate !== undefined) return true;

    return (
      (minDate && DateUtilities.isBefore(day, minDate)) ||
      (maxDate && DateUtilities.isAfter(day, maxDate))
    );
  };

  const isSelected = (day: Date) =>
    selectedDates.some((date) => DateUtilities.isSameDay(date, day));


  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      height={34}
      marginBottom={2}
    >
      {week.map((day, i) => {
        if (day === null || day === undefined) {
          return (
            <Box
              key={`blank-${i}`}
              sx={{ margin: theme.spacing(0, 1) }}
              mx={1}
              width={36}
              height={36}
            />
          );
        }

        return (
          <Circle
            key={`day-${day}`}
            label={day.getDate().toString()}
            disabled={isDisabled(day)}
            checked={isSelected(day)}
            onCheck={() => onSelect(day)}
            isToday={isToday(day)}
            sx={{ margin: theme.spacing(0, 1) }}
          />
        );
      })}
    </Box>
  );
};

export default Week;
