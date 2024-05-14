import React, { useCallback } from 'react';
import { Typography, ButtonBase, useTheme } from '@mui/material';

interface CircleProps {
  label: string | React.ReactNode;
  disabled?: boolean;
  checked: boolean;
  onCheck: (checked: boolean) => void;
  isToday?: boolean;
  sx?: object;
}

const Circle: React.FC<CircleProps> = ({
  label,
  disabled = false,
  checked,
  onCheck,
  isToday,
  sx,
}) => {
  const theme = useTheme();

  const handleClick = useCallback(() => {
    if (!disabled) {
      onCheck(!checked);
    }
  }, [onCheck, disabled, checked]);

  return (
    <ButtonBase
      sx={{
        ...sx,
        width: 36,
        height: 36,
        borderRadius: '50%',
        background: isToday
          ? theme.palette.background.default
          : checked && !disabled
          ? theme.palette.primary.main
          : checked && disabled
          ? theme.palette.action.disabled
          : 'rgba(0, 0, 0, 0)',
        color:
          !checked && !disabled
            ? theme.palette.text.primary
            : disabled
            ? theme.palette.text.disabled
            : undefined,
      }}
      disabled={disabled}
      onClick={handleClick}
    >
      <Typography
        color="inherit"
        variant="body1"
        align="center"
        style={{
          color: !checked
            ? undefined
            : theme.palette.mode === 'dark'
            ? theme.palette.getContrastText(theme.palette.primary.main)
            : theme.palette.common.white,
        }}
      >
        {label}
      </Typography>
    </ButtonBase>
  );
};

export default Circle;
