import dayjs from 'dayjs';

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

/**
 * Define a type for the DateArray, which can have different lengths
 * depending on the level of granularity required (year, month, date, hour, minute).
 */
type DateArray =
  | [number, number, number, number, number]
  | [number, number, number, number]
  | [number, number, number];

/**
 * Convert a given date string and timezone to an array containing
 * year, month, date, hour, and minute in the UTC format.
 *
 * @param dateString - A string representing the date and time (e.g., "2023-03-28")
 * @param timezone - A string representing the timezone (e.g., "Asia/Seoul")
 * @returns A DateArray containing the year, month, date, hour, and minute in UTC format
 */
export function getTimeArray(dateString: string, timezone?: string): DateArray {
  const dayjsObj = dayjs.tz(dateString, timezone || 'UTC').utc();
  return [
    dayjsObj.get('year'),
    dayjsObj.get('month') + 1,
    dayjsObj.get('date'),
    dayjsObj.get('hour'),
    dayjsObj.get('minute'),
  ];
}
