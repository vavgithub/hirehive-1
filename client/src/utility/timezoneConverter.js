import { DateTime } from "luxon";

//Get user's timezone
export const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

export function formatUTCForLocalDisplay(utcString) {
  return DateTime.fromISO(utcString, { zone: "utc" })
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .toFormat("yyyy-MM-dd HH:mm");
}

export function formatUTCTo12Hour(utcString) {
  return DateTime.fromISO(utcString, { zone: "utc" })
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .toFormat("yyyy-MM-dd hh:mm a"); // 12-hour format with AM/PM
}

export function formatUTCToDate(utcString) {
  return DateTime.fromISO(utcString, { zone: "utc" })
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .toFormat("yyyy-MM-dd"); // 12-hour format with AM/PM
}

export function UTCToDateFormatted(utcString) {
  return DateTime.fromISO(utcString, { zone: 'utc' })
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .toFormat('dd LLLL yyyy'); // e.g., "26 May 2025"
}

export function UTCToShortDate(utcString) {
  return DateTime.fromISO(utcString, { zone: 'utc' })
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .toFormat('dd LLL yy'); // e.g., "20 Apr 25"
}

export function UTCToShortMonth(utcString) {
  return DateTime.fromISO(utcString, { zone: 'utc' })
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .toFormat('dd LLL'); // e.g., "20 Apr"
}


export function formatUTCToTimein24Hour(utcString) {
  return DateTime.fromISO(utcString, { zone: "utc" })
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .toFormat("HH:mm"); // 12-hour format with AM/PM
}


export function formatUTCToLocalTimeAuto(utcString) {
  const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const userLocale = navigator.language || 'en-US';

  const is12Hour = new Intl.DateTimeFormat(userLocale, {
    hour: 'numeric'
  }).formatToParts(new Date()).some(part => part.type === 'dayPeriod');

  const dt = DateTime.fromISO(utcString, { zone: 'utc' })
    .setZone(userTimeZone)
    .setLocale(userLocale);

  if (is12Hour) {
    // Format as 12-hour with uppercase AM/PM
    return dt.toFormat('hh:mm a').toUpperCase();
  } else {
    // Format as 24-hour
    return dt.toFormat('HH:mm');
  }
}


export function formatUTCToTimein12Hour(utcString) {
  return DateTime.fromISO(utcString, { zone: "utc" })
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    .toFormat("hh:mm a"); // 12-hour format with AM/PM
}

export function convertLocalToUTC(localDate) {
  return DateTime.fromJSDate(localDate)
    .setZone(Intl.DateTimeFormat().resolvedOptions().timeZone) // Set local timezone based on browser
    .toUTC() // Convert to UTC
    .toISO(); // Returns the time in ISO 8601 format (UTC)
}

export function combineDateWithTime(localDate, timeString) {
  const year = localDate.getFullYear();
  const month = localDate.getMonth(); // Month is 0-indexed
  const day = localDate.getDate();
  
  // Create a new string combining the date and time (e.g., '2024-12-09T13:40')
  const combinedDateTimeString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}T${timeString}:00`;

  // Parse the combined string into a Date object
  return new Date(combinedDateTimeString);
}