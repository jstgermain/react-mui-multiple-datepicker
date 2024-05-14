import warning from 'warning';
import moment from 'moment';

const dayAbbreviation = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const monthList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const monthLongList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export function dateTimeFormat(locale: string, options: any): any {
    warning(
        locale === 'en-US',
        `Material-UI: The ${locale} locale is not supported by the built-in DateTimeFormat.
  Use the \`DateTimeFormat\` prop to supply an alternative implementation.`
    );

    return {
        format: function (this: any, date: Date) { // Add type annotation for 'this'
            if (options.month === 'short' && options.day === '2-digit' && options.year === 'numeric') {
                return `${date.getDate()} ${monthList[date.getMonth()]} ${date.getFullYear()}`;
            } else if (
                options.year === 'numeric' &&
                options.month === 'numeric' &&
                options.day === 'numeric'
            ) {
                return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
            } else if (options.year === 'numeric' && options.month === 'long') {
                return `${monthLongList[date.getMonth()]} ${date.getFullYear()}`;
            } else if (options.weekday === 'narrow') {
                return dayAbbreviation[date.getDay()];
            } else if (options.year === 'numeric') {
                return date.getFullYear().toString();
            } else if (options.day === 'numeric') {
                return date.getDate();
            }
            warning(false, 'Material-UI: Wrong usage of DateTimeFormat');
        }
    };
}

export function getYear(d: Date): number {
    return d.getFullYear();
}

export function setYear(d: Date, year: number): Date {
    const newDate = cloneDate(d);
    newDate.setFullYear(year);
    return newDate;
}

export function addDays(d: Date, days: number): Date {
    const newDate = cloneDate(d);
    newDate.setDate(d.getDate() + days);
    return newDate;
}

export function addMonths(d: Date, months: number): Date {
    const newDate = cloneDate(d);
    newDate.setMonth(d.getMonth() + months);
    return newDate;
}

export function addYears(d: Date, years: number): Date {
    const newDate = cloneDate(d);
    newDate.setFullYear(d.getFullYear() + years);
    return newDate;
}

export function cloneDate(d: Date): Date {
    return new Date(d.getTime());
}

export function cloneAsDate(d: Date): Date {
    const clonedDate = cloneDate(d);
    clonedDate.setHours(0, 0, 0, 0);
    return clonedDate;
}

export function getDaysInMonth(d: Date): number {
    const resultDate = getFirstDayOfMonth(d);
    resultDate.setMonth(resultDate.getMonth() + 1);
    resultDate.setDate(resultDate.getDate() - 1);
    return resultDate.getDate();
}

export function getFirstDayOfMonth(d: Date): Date {
    return moment(d)
        .startOf('month')
        .toDate();
}

export function getWeekArray(d: Date, firstDayOfWeek: number): (Date | null)[][] {
    const dayArray: Date[] = [];
    const daysInMonth = moment(d).daysInMonth();
    const weekArray: (Date | null)[][] = [];
    let week: (Date | null)[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
        dayArray.push(new Date(d.getFullYear(), d.getMonth(), i));
    }

    const addWeek = (week: (Date | null)[]) => {
        const emptyDays = 7 - week.length;
        for (let i = 0; i < emptyDays; ++i) {
            week[weekArray.length ? 'push' : 'unshift'](null);
        }
        weekArray.push(week);
    };

    dayArray.forEach(day => {
        if (week.length > 0 && day.getDay() === firstDayOfWeek) {
            addWeek(week);
            week = [];
        }
        week.push(day);
        if (dayArray.indexOf(day) === dayArray.length - 1) {
            addWeek(week);
        }
    });

    return weekArray;
}

// Convert date to ISO 8601 (YYYY-MM-DD) date string, accounting for current timezone
export function formatIso(date: Date): string {
    return new Date(`${date.toDateString()} 12:00:00 +0000`).toISOString().substring(0, 10);
}

export function isEqualDate(d1: Date, d2: Date): boolean {
    return (
        d1 &&
        d2 &&
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate()
    );
}

export function isBeforeDate(d1: Date, d2: Date): boolean {
    const date1 = cloneAsDate(d1);
    const date2 = cloneAsDate(d2);

    return date1.getTime() < date2.getTime();
}

export function isAfterDate(d1: Date, d2: Date): boolean {
    const date1 = cloneAsDate(d1);
    const date2 = cloneAsDate(d2);

    return date1.getTime() > date2.getTime();
}

export function isBetweenDates(dateToCheck: Date, startDate: Date, endDate: Date): boolean {
    return !isBeforeDate(dateToCheck, startDate) && !isAfterDate(dateToCheck, endDate);
}

export function monthDiff(d1: Date, d2: Date): number {
    let m;
    m = (d1.getFullYear() - d2.getFullYear()) * 12;
    m += d1.getMonth();
    m -= d2.getMonth();
    return m;
}

export const defaultUtils = {
    getYear,
    setYear,
    addDays,
    addMonths,
    addYears,
    getFirstDayOfMonth,
    getWeekArray,
    monthDiff,
};
