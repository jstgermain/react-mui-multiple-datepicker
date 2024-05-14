import React from 'react';
import { Button, DialogActions, useTheme } from '@mui/material';

interface CalendarActionButtonProps {
  cancelButtonText: string;
  submitButtonText: string;
  onCancel: () => void;
  onOk: () => void;
  readOnly?: boolean;
}

const CalendarActionButton: React.FC<CalendarActionButtonProps> = ({
  cancelButtonText,
  submitButtonText,
  onCancel,
  onOk,
  readOnly = false
}) => {
  const theme = useTheme();

  return (
    <DialogActions>
      <Button
        onClick={onCancel}
        sx={{
          color: theme.palette.text.primary,
          '&:hover': {
            backgroundColor: theme.palette.action.hover
          }
        }}
      >
        {cancelButtonText}
      </Button>
      {!readOnly && (
        <Button onClick={onOk}>
          {submitButtonText}
        </Button>
      )}
    </DialogActions>
  );
};

export default CalendarActionButton;
