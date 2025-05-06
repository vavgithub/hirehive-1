export const updateDateWithTime = (date, time) => {
  const [hours, minutes] = time.split(":").map(Number); // Extract hour & minute
  const dateObj = new Date(date);
  dateObj.setHours(hours, minutes, 0, 0); // Update date with new time (UTC)
  return dateObj;
};

export function formatUtcReadable(date) {
  return (
    date
      .toLocaleString("en-GB", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
      .replace(",", "") + " UTC"
  );
}
