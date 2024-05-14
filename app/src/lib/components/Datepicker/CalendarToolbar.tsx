import React from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import LeftIcon from '@mui/icons-material/ArrowLeft';
import RightIcon from '@mui/icons-material/ArrowRight';
import moment from 'moment';
import { capitalizeFirstLetter } from './utils';

interface CalendarToolbarProps {
  displayDate: Date;
  nextMonth?: boolean;
  prevMonth?: boolean;
  onMonthChange?: (months: number) => void;
}

const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  displayDate,
  nextMonth = true,
  prevMonth = true,
  onMonthChange
}) => {
  const handleTouchTapPrevMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onMonthChange) {
      onMonthChange(-1);
    }
  };

  const handleTouchTapNextMonth = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (onMonthChange) {
      onMonthChange(1);
    }
  };

  const dateTimeFormatted = moment(displayDate).format('MMMM YYYY');

  return (
    <Box
      display='flex'
      alignItems='center'
      alignContent='center'
      justifyContent='space-between'
      my={1}
    >
      <IconButton disabled={!prevMonth} onClick={handleTouchTapPrevMonth}>
        <LeftIcon />
      </IconButton>
      <Typography variant='subtitle1'>{capitalizeFirstLetter(dateTimeFormatted)}</Typography>
      <IconButton disabled={!nextMonth} onClick={handleTouchTapNextMonth}>
        <RightIcon />
      </IconButton>
    </Box>
  );
};

export default CalendarToolbar;
