import React from "react";
import moment from "moment";
import Week from "./Week";
import { defaultUtils as utils } from "./dateUtils";

interface WeeksProps {
  displayDate: Date;
  selectedDates?: Date[];
  disabledDates?: Date[];
  minDate?: Date;
  maxDate?: Date;
  readOnly?: boolean;
  onSelect: (day: Date) => void;
  ref?:
    | React.RefObject<HTMLDivElement>
    | ((instance: HTMLDivElement | null) => void);
}

const Weeks: React.FC<WeeksProps> = ({
  displayDate,
  selectedDates,
  disabledDates = [],
  minDate,
  maxDate,
  readOnly = false,
  onSelect,
}) => {
  const weekArray = utils.getWeekArray(
    displayDate,
    moment.localeData().firstDayOfWeek()
  );

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        lineHeight: "1.25",
        position: "relative",
      }}
    >
      {weekArray.map((week, index) => (
        <Week
          key={index}
          week={week as (Date | null)[]}
          selectedDates={selectedDates}
          disabledDates={disabledDates}
          onSelect={onSelect}
          minDate={minDate}
          maxDate={maxDate}
          readOnly={readOnly}
        />
      ))}
    </div>
  );
};

export default Weeks;
