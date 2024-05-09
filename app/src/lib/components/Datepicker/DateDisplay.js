import React, { Component } from "react";
import { Box, Typography, Chip, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Clear";
import moment from "moment";

class DateDisplayWithoutTheme extends Component {
  state = {
    selectedYear: false,
  };

  componentDidMount() {
    if (!this.props.monthDaySelected) {
      this.setState({ selectedYear: true });
    }
  }

  getFormatedDate = (date) => {
    return moment(date).format("ll");
  };

  removeDateAtIndex = (index) => () => {
    this.props.onRemoveAtIndex(index);
  };

  render() {
    const { theme, selectedDates, readOnly } = this.props;

    return (
      <Box
        width={240}
        backgroundColor={theme.palette.background.default}
        flexDirection="column"
        sx={{
          display: { xs: "none", sm: "flex" },
        }}
      >
        <Box
          margin={2}
          display="flex"
          alignItems="center"
          alignContent="center"
          justifyContent="space-between"
        >
          <Typography variant="subtitle1">
            {this.props.selectedDatesTitle}
          </Typography>
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
              label={this.getFormatedDate(date)}
              onDelete={!readOnly ? this.removeDateAtIndex(index) : null}
              deleteIcon={!readOnly ? <DeleteIcon /> : null}
              color={!readOnly ? "primary" : undefined}
              sx={{
                m: 0.5,
              }}
            />
          ))}
        </Box>
      </Box>
    );
  }
}

const DateDisplay = (props) => (
  <DateDisplayWithoutTheme {...props} theme={useTheme()} />
);

export default DateDisplay;
