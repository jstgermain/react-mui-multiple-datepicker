import React, { useEffect, useRef, useState, useCallback } from "react";
import {
  styled,
  Autocomplete,
  TextField,
  Chip,
} from "@mui/material";
import MultipleDatePicker from "./lib";
import EventIcon from '@mui/icons-material/Event';

const BoxRoot = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
}));

const Demo = () => {
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null); // Create a ref for the TextField component

  const toggleOpen = useCallback(() => {
    setOpen(o => !o);
    if (!open && inputRef.current) {
      inputRef.current.blur(); // Blur the TextField to prevent typing
    }
  }, [open]);

  const onCancel = useCallback(() => setOpen(false), []);
  
  const onSubmit = useCallback(selectedDates => {
    setDates(selectedDates.map(date => date.toLocaleDateString()));
    setOpen(false);
    inputRef.current.blur();
  }, []);

  const handleInputChange = (_, newValue) => {
    setInputValue(newValue);
  };

  const handleChipDelete = chipToDelete => () => {
    setDates(prevDates => prevDates.filter(date => date !== chipToDelete));
  };

  const handleChipAdd = event => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setDates(prevDates => [...prevDates, inputValue.trim()]);
      setInputValue("");
    }
  };

  const renderTags = (value, getTagProps) => {
    const maxTags = 3;
    const limitedValue = value.slice(0, maxTags);
    const remainingCount = value.length - maxTags;
    
    return (
      <>
        {limitedValue.map((option, index) => (
          <Chip
            key={index}
            label={option}
            onDelete={handleChipDelete(option)}
            {...getTagProps({ index })}
          />
        ))}
        {remainingCount > 0 && (
          <>+{remainingCount}</>
        )}
      </>
    );
  };

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
    onChange: (_, newValue) => setDates(newValue),
    onInputChange: handleInputChange,
    renderTags: renderTags,
    renderInput: (params) => (
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
  };

  return (
    <BoxRoot>
      <MultipleDatePicker
        open={open}
        selectedDates={dates.map(date => new Date(date))}
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
      <Autocomplete {...autocompleteProps} />
    </BoxRoot>
  );
};

export default Demo;
