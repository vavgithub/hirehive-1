export const getPreviousMonthRange = () => {
    const today = new Date();
    const firstDayCurrentMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const firstDayPreviousMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastDayPreviousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
  
    return { firstDayPreviousMonth, lastDayPreviousMonth, firstDayCurrentMonth };
  };

export const getPreviousWeekRange = () => {
const today = new Date();

// Get the current week's start (Monday)
const firstDayCurrentWeek = new Date(today);
firstDayCurrentWeek.setDate(today.getDate() - today.getDay() + 1); // Monday of current week
firstDayCurrentWeek.setHours(0, 0, 0, 0);

// Get the previous week's start (Monday) and end (Sunday)
const firstDayPreviousWeek = new Date(firstDayCurrentWeek);
firstDayPreviousWeek.setDate(firstDayCurrentWeek.getDate() - 7);

const lastDayPreviousWeek = new Date(firstDayPreviousWeek);
lastDayPreviousWeek.setDate(firstDayPreviousWeek.getDate() + 6);
lastDayPreviousWeek.setHours(23, 59, 59, 999);

return { firstDayPreviousWeek, lastDayPreviousWeek, firstDayCurrentWeek };
};

export const getYesterdayTodayRange = () => {
    const today = new Date();
    
    // Get the start of today (midnight)
    const startOfToday = new Date(today);
    startOfToday.setHours(0, 0, 0, 0);
  
    // Get the start of yesterday (midnight)
    const startOfYesterday = new Date(startOfToday);
    startOfYesterday.setDate(startOfToday.getDate() - 1);
  
    // Get the end of yesterday (23:59:59)
    const endOfYesterday = new Date(startOfYesterday);
    endOfYesterday.setHours(23, 59, 59, 999);
  
    return { startOfYesterday, endOfYesterday, startOfToday };
};