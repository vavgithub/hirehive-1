import { DateTime } from 'luxon';

export function getLast12Months(userTimeZone) {
  const result = [];

  const now = DateTime.now().setZone(userTimeZone);

  for (let i = 0; i < 12; i++) {
    const monthDate = now.minus({ months: i }).startOf('month');

    const startDate = monthDate.startOf('month');
    const endDate = monthDate.endOf('month');

    result.push({
      monthName: startDate.toFormat('LLL'), // e.g., 'Apr'
      year: startDate.year,
      startDate: startDate.toUTC().toJSDate(),
      endDate: endDate.toUTC().toJSDate()
    });
  }

  return result.reverse(); // Oldest first
}

export function getLast4Weeks(userTimeZone) {
  const result = [];

  // Get start of current week (Sunday) in user's timezone
  const now = DateTime.now().setZone(userTimeZone);
  const currentWeekStart = now.startOf('week'); // Sunday as start of week

  for (let i = 0; i < 4; i++) {
    const weekStart = currentWeekStart.minus({ weeks: i });
    const weekEnd = weekStart.plus({ days: 7 }); // exclusive end

    result.push({
      weekLabel: `Week ${4 - i}`,
      startDate: weekStart.toUTC().toJSDate(),   // For DB queries
      endDate: weekEnd.toUTC().toJSDate(),       // For DB queries
      displayLabel: `${weekStart.toFormat('dd LLL')} - ${weekEnd.minus({ days: 1 }).toFormat('dd LLL')}` // For UI
    });
  }

  return result.reverse(); // Oldest week first
}

export function getLast7Days(userTimeZone) {
  const result = [];

  // Current date in user's timezone
  const today = DateTime.now().setZone(userTimeZone).startOf('day');

  for (let i = 0; i < 7; i++) {
    const date = today.minus({ days: i });

    const startDateUTC = date.startOf('day').toUTC().toJSDate();
    const endDateUTC = date.endOf('day').toUTC().toJSDate();

    result.push({
      dayLabel: startDateUTC, // For display
      startDate: startDateUTC,               // For DB queries
      endDate: endDateUTC
    });
  }

  return result.reverse(); // Oldest first
}

export function get24HoursOfYesterday(userTimeZone) {
  const result = [];

  // Get yesterday in user's timezone, at 00:00
  const yesterdayStart = DateTime.now()
    .setZone(userTimeZone)
    .minus({ days: 1 })
    .startOf('day');

  for (let i = 0; i < 24; i++) {
    const hourStart = yesterdayStart.plus({ hours: i });
    const hourEnd = hourStart.endOf('hour');

    result.push({
      hourLabel: hourStart, // e.g., "1 AM"
      startDate: hourStart.toUTC().toJSDate(), // For MongoDB query
      endDate: hourEnd.toUTC().toJSDate()
    });
  }

  return result;
}

export function formatDateRange(startDate, endDate) {
    const format = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: '2-digit'
    });

    const start = format.format(new Date(startDate));
    const end = format.format(new Date(endDate));

    return `${start} - ${end}`;
}
