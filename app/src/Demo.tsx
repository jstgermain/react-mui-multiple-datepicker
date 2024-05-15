import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  Chip,
  styled,
  Autocomplete,
  TextField,
  useTheme,
  Theme,
} from "@mui/material";
import MultipleDatePicker from "./lib";
import EventIcon from "@mui/icons-material/Event";

const BoxRoot = styled("div")(({ theme }: { theme: Theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Demo: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = useState<boolean>(false);
  const [dates, setDates] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null); // Create a ref for the TextField component

  const toggleOpen = useCallback(() => {
    setOpen((o) => !o);
    if (!open && inputRef.current) {
      inputRef.current.blur(); // Blur the TextField to prevent typing
    }
  }, [open]);

  const onCancel = useCallback(() => setOpen(false), []);

  const onSubmit = useCallback((selectedDates: Date[]) => {
    setDates(selectedDates.map((date) => date.toLocaleDateString()));
    setOpen(false);
    inputRef.current?.blur();
  }, []);

  const handleInputChange = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      setInputValue(newValue);
    },
    []
  );
  
  const handleChipDelete = useCallback(
    (chipToDelete: string) => () => {
      setDates((prevDates) =>
        prevDates.filter((date) => date !== chipToDelete)
      );
    },
    []
  );

  const handleChipAdd = useCallback(
    (event: React.KeyboardEvent) => {
      if (event.key === "Enter" && inputValue.trim() !== "") {
        setDates((prevDates) => [...prevDates, inputValue.trim()]);
        setInputValue("");
      }
    },
    [inputValue]
  );

  useEffect(() => {
    const handleFocus = () => {
      if (inputRef.current) {
        inputRef.current.blur();
      }
    };

    if (open) {
      // Listen for focus event on Autocomplete
      document.addEventListener("focus", handleFocus, true);
    } else {
      // Remove focus event listener when Autocomplete is closed
      document.removeEventListener("focus", handleFocus, true);
    }

    return () => {
      // Cleanup: remove event listener when component unmounts
      document.removeEventListener("focus", handleFocus, true);
    };
  }, [open]);

  const autocompleteProps = {
    multiple: true,
    freeSolo: true,
    forcePopupIcon: true,
    options: [],
    value: dates,
    inputValue: inputValue,
    popupIcon: <EventIcon />,
    onOpen: toggleOpen,
    limitTags: 3,
    sx: { width: 500 },
    onChange: (_: any, newValue: string | string[] | null) => {
      if (Array.isArray(newValue)) {
        setDates(newValue);
      }
    },
    onInputChange: handleInputChange,
    renderInput: (params: any) => (
      <TextField
        {...params}
        inputRef={inputRef}
        onKeyDown={(event) => {
          if (event.key !== "Tab") {
            event.preventDefault();
          }
          handleChipAdd(event);
        }}
      />
    ),
    renderTags: (value: string[]) =>
      value.map((option, index) => (
        <Chip
          key={`tag-${index}`}
          label={option}
          onDelete={handleChipDelete(option)}
          sx={{ margin: theme.spacing(0.25) }}
        />
      )),
  };

  return (
    <BoxRoot>
      <MultipleDatePicker
        open={open}
        selectedDates={dates.map((date) => new Date(date))}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
      <Autocomplete {...autocompleteProps} />
    </BoxRoot>
  );
};

export default Demo;
