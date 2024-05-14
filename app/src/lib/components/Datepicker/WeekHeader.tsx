import React from 'react';
import { Typography, Box, useTheme, styled, Theme } from '@mui/material';
import moment from 'moment';

interface WeekHeaderProps {
  className?: string;
}

const BoxRoot = styled(Box)(({ theme }: { theme: Theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  textAlign: 'center',
  marginBottom: theme.spacing(1),
  '& > *': {
    width: 36,
    margin: `${theme.spacing(0, 1)} !important`,
    [theme.breakpoints.down('xs')]: {
      margin: `0 2px`,
    },
  },
}));

const Week: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Typography variant="overline" color="textSecondary">
    {children}
  </Typography>
);

const WeekHeader: React.FC<WeekHeaderProps> = ({ className }) => {
  const theme = useTheme();
  const weekdayNames = moment.weekdaysShort(true);

  return (
    <BoxRoot className={className}>
      {weekdayNames.map((name) => (
        <Week key={name}>{name}</Week>
      ))}
    </BoxRoot>
  );
};

export default WeekHeader;
