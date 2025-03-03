export const updateDateWithTime = (date, time) => {
    const [hours, minutes] = time.split(':').map(Number); // Extract hour & minute
    const dateObj = new Date(date);
    dateObj.setHours(hours, minutes, 0, 0); // Update date with new time (UTC)
    return dateObj;
  };