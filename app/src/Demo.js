import React, { useState, useCallback } from "react";
import {
  OutlinedInput,
  InputAdornment,
  IconButton,
  Button,
  Typography,
  styled,
  useTheme,
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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [dates, setDates] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const toggleOpen = useCallback(() => setOpen((o) => !o), [setOpen]);
  const onCancel = useCallback(() => setOpen(false), [setOpen]);
  const onSubmit = useCallback(
    (dates) => {
      setDates(dates.map((date) => date.toLocaleDateString())); // Convert Date objects to strings
      setOpen(false);
    },
    [setDates]
  );

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
  };

  const handleChipDelete = (chipToDelete) => () => {
    setDates((dates) => dates.filter((date) => date !== chipToDelete));
  };

  const handleChipAdd = (event) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setDates([...dates, inputValue.trim()]);
      setInputValue("");
    }
  };

  const renderTags = (value, getTagProps) => {
    const maxTags = 2; // Maximum number of tags to display
    const limitedValue = value.slice(0, maxTags); // Limit the number of displayed tags
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

  return (
    <BoxRoot>
      <MultipleDatePicker
        open={open}
        selectedDates={dates.map((date) => new Date(date))} // Convert back to Date objects
        onCancel={onCancel}
        onSubmit={onSubmit}
      />
      <Autocomplete
        multiple
        freeSolo
        forcePopupIcon
        options={[]}
        value={dates}
        inputValue={inputValue}
        popupIcon={<EventIcon />}
        onOpen={toggleOpen}
        limitTags={3}
        sx={{ width: 400 }}
        onChange={(event, newValue) => setDates(newValue)}
        onInputChange={handleInputChange}
        renderTags={renderTags}
        renderInput={(params) => (
          <TextField
            {...params}
            onKeyDown={handleChipAdd}
          />
        )}
      />
    </BoxRoot>
  );
};

export default Demo;
