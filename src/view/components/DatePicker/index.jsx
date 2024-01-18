import { useMemo, useRef, useState } from 'react';

import { classNames, mock } from 'Helpers';
import useClickOutside from 'Hooks/useClickOutside';

import CalendarDate from './CalendarDate';

const parseDate = ({ maxDate = '', minDate = '', setInputDate = mock, setPreview = mock }, input = '') => {
  let day, month, year;
  const separators = ['-', '.', '/', ' '];

  for (const separator of separators) {
    const parts = input.split(separator);

    // TODO: Maybe... check if user inputs date without any separator like: 01012024
    if (parts.length === 3) {
      let potentialDay, potentialMonth, potentialYear;

      const parsedParts = parts.map(part => parseInt(part, 10));

      // check if date starts with year first (yyyy)
      if (parsedParts?.at(0)?.toString()?.length === 4) {
        potentialDay = parsedParts.at(2);
        potentialMonth = parsedParts.at(1);
        potentialYear = parsedParts.at(0);
      } else {
        potentialDay = parsedParts.at(0);
        potentialMonth = parsedParts.at(1);
        potentialYear = parsedParts.at(2);
      }

      if (potentialYear >= 1000 && potentialYear <= 9999) {
        if (potentialMonth >= 1 && potentialMonth <= 12) {
          const maxDays = new Date(potentialYear, potentialMonth, 0).getDate();

          if (potentialDay >= 1 && potentialDay <= maxDays) {
            day = potentialDay;
            month = potentialMonth;
            year = potentialYear;
            break;
          }
        }
      } else if (potentialYear >= 0 && potentialYear <= 99) {
        let adjustedYear;
        const currentYear = new Date().getFullYear();

        // if the year is 2024 and user inputs 20 the year will be parsed as 2020
        // if the year is 2024 and user inputs 25 the year will be parsed as 1925
        if (currentYear % 100 < potentialYear) {
          adjustedYear = 1900 + potentialYear;
        } else {
          adjustedYear = currentYear - (currentYear % 100) + potentialYear;
        }

        if (potentialMonth >= 1 && potentialMonth <= 12) {
          const maxDays = new Date(adjustedYear, potentialMonth, 0).getDate();

          if (potentialDay >= 1 && potentialDay <= maxDays) {
            day = potentialDay;
            month = potentialMonth;
            year = adjustedYear;
            break;
          }
        }
      }
    }
  }

  if (day && month && year) {
    const parsedDate = new Date(year, month - 1, day);
    const isAfter = maxDate && parsedDate > new Date(maxDate);
    const isBefore = minDate && parsedDate < new Date(minDate);

    if (isAfter || isBefore) {
      setInputDate('');
      return null;
    }

    if (!isNaN(parsedDate.getTime())) {
      setPreview(parsedDate);
      setInputDate(parsedDate.toLocaleDateString('en-UK')); // transform back to dd/MMM/yyyy
      return parsedDate;
    }
  }

  setInputDate('');
  return null; // Return null if the date couldn't be parsed
};

const START_OF_THE_WEEK = 1; //MONDAY = 1, SUNDAY = 0
let WEEK_DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

if (START_OF_THE_WEEK === 0) {
  WEEK_DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
}

const daysInMonth = (year = 0, month = 0) => new Date(year, month + 1, 0).getDate();

const onDateClick = ({
  day = 0,
  isAfter = false,
  isBefore = false,
  preview = '',
  setInputDate = mock,
  onChange = mock,
}) => {
  if (!day || isAfter || isBefore) return;

  const newDate = new Date(preview?.getFullYear(), preview?.getMonth(), day);
  onChange(newDate);
  setInputDate(newDate.toLocaleDateString('en-UK'));
};

const getRowsOfWeek = (preview = '') => {
  let firstDayOfMonth = new Date(preview.getFullYear(), preview.getMonth(), 1).getDay() - START_OF_THE_WEEK;

  // refactor this shit
  if (START_OF_THE_WEEK === 1 && firstDayOfMonth === -1) {
    firstDayOfMonth = 6; // Sunday is 0, so if it's -1, set it to 6 (Saturday)
  }

  const totalDays = daysInMonth(preview.getFullYear(), preview.getMonth());
  const weeks = Math.ceil((totalDays + firstDayOfMonth) / 7);
  const days = [];

  let dayCount = 1;

  for (let i = 0; i < weeks; i++) {
    const week = [];
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDayOfMonth) {
        week.push(null);
      } else if (dayCount > totalDays) {
        week.push(null);
      } else {
        week.push(dayCount);
        dayCount++;
      }
    }
    days.push(week);
  }

  return days;
};

const renderDayName = (dayName = '') => (
  <th key={dayName} className='w-10 h-10 rounded-md bg-emerald-100 text-gray-700'>
    {dayName}
  </th>
);

const renderDay = (
  { maxDate = '', minDate = '', onChange = mock, preview = '', setInputDate = mock, value = '' },
  day = 0,
  dayIndex = 0,
) => {
  const highlightDate =
    value?.getFullYear() === preview?.getFullYear() &&
    value?.getMonth() === preview?.getMonth() &&
    day === value?.getDate();

  const today = new Date();
  const todaysDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const previewDate = new Date(preview.getFullYear(), preview.getMonth(), day);
  const isAfter = maxDate && previewDate > new Date(maxDate);
  const isBefore = minDate && previewDate < new Date(minDate);

  const isToday = todaysDate.toLocaleDateString('en-UK') === previewDate.toLocaleDateString('en-UK');

  const disabled = isAfter || isBefore;

  // TODO: disable next and prev months accordingly

  return (
    <td
      key={dayIndex}
      onClick={onDateClick.bind(null, {
        day,
        isAfter,
        isBefore,
        preview,
        setInputDate,
        onChange,
      })}
      className={classNames(
        'w-10 h-10 shrink-0 rounded-md',
        (() => {
          let classNames = [];

          if (day !== null) {
            if (disabled) {
              classNames.push('bg-emerald-50 text-gray-500');
            } else {
              classNames.push('cursor-pointer');

              if (highlightDate) {
                classNames.push('bg-emerald-400 hover:bg-emerald-500 text-white');
              } else {
                classNames.push('bg-gray-50 hover:bg-emerald-300 hover:text-white text-gray-900');
              }
            }
          } else {
            classNames.push('bg-yellow-50');
          }

          return classNames.join(' ');
        })(),
      )}>
      <div className='flex items-center justify-center select-none relative'>
        {day}

        {isToday && <div className='h-1 w-1 shrink-0 bg-green-500 rounded-full absolute top-full'></div>}
      </div>
    </td>
  );
};

// max and min dates work as 2023-01-01 and as new Date() object
// TODO: make value work the same^

const DatePicker = ({ maxDate = '', minDate = '', onChange = mock, value = undefined }) => {
  const [inputDate, setInputDate] = useState(() => (value ? value.toLocaleDateString('en-UK') : undefined));
  const [preview, setPreview] = useState(() => value ?? new Date());

  const calendarRef = useRef(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const rowsOfWeeks = useMemo(() => getRowsOfWeek(preview), [preview]);

  useClickOutside(calendarRef, () => setShowCalendar(prev => !prev));

  return (
    <div className='relative'>
      <div className='relative'>
        <button
          disabled={false}
          onClick={() => setShowCalendar(prev => !prev)}
          className='absolute top-3 left-0'>
          <CalendarDate className='ml-3 w-4 h-4 text-gray-700 hover:scale-125' />
        </button>

        <input
          className='pl-8 pr-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-600 placeholder:font-normal font-medium outline-none border rounded-md'
          disabled={false}
          onBlur={e => onChange(parseDate({ maxDate, minDate, setInputDate, setPreview }, e.target.value))}
          onChange={e => setInputDate(e.target.value)}
          placeholder='dd/mm/yyyy'
          type='text'
          value={inputDate}
        />
      </div>

      {showCalendar && (
        <div
          ref={calendarRef}
          className='p-4 space-y-2 absolute top-full left-0 bg-white border shadow rounded-lg'>
          <div className='flex items-center justify-between'>
            <button
              disabled={false} // TODO: check for disabled dates
              className='w-8 h-8 rounded bg-emerald-500 hover:bg-emerald-600 text-white'
              onClick={() => setPreview(date => new Date(date.getFullYear(), date.getMonth() - 1, 1))}>
              {'<'}
            </button>

            <span className='mx-4 text-lg text-gray-600 font-bold'>
              {preview.toLocaleDateString('en-UK', { year: 'numeric', month: 'long' })}
            </span>

            <button
              disabled={false} // TODO: check for disabled dates
              className='w-8 h-8 rounded bg-emerald-500 hover:bg-emerald-600 text-white'
              onClick={() => setPreview(date => new Date(date.getFullYear(), date.getMonth() + 1, 1))}>
              {'>'}
            </button>
          </div>

          <table>
            <thead>
              <tr>{WEEK_DAY_NAMES.map(renderDayName)}</tr>
            </thead>

            <tbody>
              {rowsOfWeeks.map((weekRow = [], weekRowIndex = 0) => (
                <tr key={weekRowIndex}>
                  {weekRow.map(
                    renderDay.bind(null, { maxDate, minDate, onChange, preview, setInputDate, value }),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DatePicker;
