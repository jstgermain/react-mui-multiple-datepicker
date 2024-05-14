const DateUtilities = {
  pad(value: string | number, length: number): string {
    let stringValue = String(value);
    while (stringValue.length < length) stringValue = `0${stringValue}`;
    return stringValue;
  },

  clone(date: Date): Date {
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds(),
      date.getMilliseconds()
    );
  },

  toString(date: Date): string {
    return `${date.getFullYear()}-${DateUtilities.pad(
      date.getMonth() + 1,
      2
    )}-${DateUtilities.pad(date.getDate(), 2)}`;
  },

  toDayOfMonthString(date: Date): string {
    return DateUtilities.pad(date.getDate(), 2);
  },

  toMonthAndYearString(date: Date): string {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return `${months[date.getMonth()]} ${date.getFullYear()}`;
  },

  moveToDayOfWeek(date: Date, dayOfWeek: number): Date {
    while (date.getDay() !== dayOfWeek) date.setDate(date.getDate() - 1);
    return date;
  },

  isSameDay(first: Date, second: Date): boolean {
    return (
      first.getFullYear() === second.getFullYear() &&
      first.getMonth() === second.getMonth() &&
      first.getDate() === second.getDate()
    );
  },

  dateIn(datesArray: Date[], date: Date): boolean {
    return datesArray.some(day => DateUtilities.isSameDay(day, date));
  },

  isBefore(first: Date, second: Date): boolean {
    if (DateUtilities.isSameDay(first, second)) return false;
    return first.getTime() < second.getTime();
  },

  isAfter(first: Date, second: Date): boolean {
    return first.getTime() > second.getTime();
  }
};

export default DateUtilities;

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
