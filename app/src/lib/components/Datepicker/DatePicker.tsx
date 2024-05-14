import React, {
  useCallback,
  useEffect,
  useReducer,
} from "react";
import DateUtilities from "./utils";
import Calendar from "./Calendar";

import { useTheme } from "@mui/material";
import Dialog, { DialogProps } from "@mui/material/Dialog";

interface DatePickerProps {
  open: boolean;
  readOnly?: boolean;
  onCancel: () => void;
  onSubmit: (selectedDates: Date[]) => void;
  selectedDates?: Date[];
  disabledDates?: Date[];
  DialogProps?: DialogProps;
  cancelButtonText?: string;
  submitButtonText?: string;
  selectedDatesTitle?: string;
}

interface DatePickerState {
  selectedDates: Date[];
  minDate: Date | null;
  maxDate: Date | null;
}

function initState(selectedDates?: Date[]): DatePickerState {
  return {
    selectedDates: selectedDates ? [...selectedDates] : [],
    minDate: null,
    maxDate: null,
  };
}

function reducer(
  state: DatePickerState,
  action: { type: string; payload: any }
): DatePickerState {
  switch (action.type) {
    case "setSelectedDates":
      return { ...state, selectedDates: action.payload };
    default:
      throw new Error("Wrong action type in multiple date picker reducer");
  }
}

const DatePicker: React.FC<DatePickerProps> = ({
  open,
  readOnly = false,
  onCancel,
  onSubmit,
  selectedDates: outerSelectedDates = [],
  disabledDates = [],
  DialogProps,
  cancelButtonText: initialCancelButtonText,
  submitButtonText = "Submit",
  selectedDatesTitle = "Selected Dates",
}) => {
  const theme = useTheme();
  const [{ selectedDates }, dispatch] = useReducer(
    reducer,
    initState(outerSelectedDates)
  );

  const onSelect = useCallback(
    (day: Date) => {
      if (readOnly) return;

      if (DateUtilities.dateIn(selectedDates, day)) {
        dispatch({
          type: "setSelectedDates",
          payload: selectedDates.filter(
            (date) => !DateUtilities.isSameDay(date, day)
          ),
        });
      } else {
        dispatch({
          type: "setSelectedDates",
          payload: [...selectedDates, day],
        });
      }
    },
    [selectedDates, dispatch, readOnly]
  );

  const onRemoveAtIndex = useCallback(
    (index: number) => {
      if (readOnly) return;
      const newDates = [...selectedDates];
      if (index > -1) {
        newDates.splice(index, 1);
      }

      dispatch({ type: "setSelectedDates", payload: newDates });
    },
    [selectedDates, dispatch, readOnly]
  );

  const dismiss = useCallback(() => {
    dispatch({ type: "setSelectedDates", payload: [] });
    onCancel();
  }, [dispatch, onCancel]);

  const handleCancel = useCallback(() => {
    dismiss();
  }, [dismiss]);

  const handleOk = useCallback(() => {
    if (readOnly) return;
    onSubmit(selectedDates);
  }, [onSubmit, selectedDates, readOnly]);

  useEffect(() => {
    if (open) {
      dispatch({ type: "setSelectedDates", payload: outerSelectedDates });
    }
  }, [open, outerSelectedDates]);

  // Sort selected dates before rendering
  selectedDates.sort((a, b) => a.getTime() - b.getTime());

  return (
    <Dialog
      {...DialogProps}
      open={open}
      PaperProps={{
        ...DialogProps?.PaperProps,
        sx: {
          ...DialogProps?.PaperProps?.sx,
          minHeight: 482,
          maxHeight: 482,
          display: "flex",
          xs: {
            margin: theme.spacing(1),
          },
        },
      }}
    >
      <Calendar
        selectedDates={selectedDates}
        disabledDates={disabledDates}
        onSelect={onSelect}
        onRemoveAtIndex={onRemoveAtIndex}
        onCancel={handleCancel}
        onOk={handleOk}
        readOnly={readOnly}
        cancelButtonText={
          initialCancelButtonText || (readOnly ? "Dismiss" : "Cancel")
        }
        submitButtonText={submitButtonText}
        selectedDatesTitle={selectedDatesTitle}
      />
    </Dialog>
  );
};

export default DatePicker;
