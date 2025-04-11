export function getLast12Months() {
    const result = [];
    const today = new Date();
    const monthNames = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];

    for (let i = 0; i < 12; i++) {
        const date = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth() - i, 1));
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth();
        
        const firstDay = new Date(Date.UTC(year, month, 1));
        const lastDay = new Date(Date.UTC(year, month + 1, 0, 23, 59, 59, 999)); // End of the month

        result.push({
            monthName: monthNames[month], 
            year: year, 
            startDate: firstDay, 
            endDate: lastDay
        });
    }

    return result;
}

export function getLast4Weeks() {
    const result = [];
    const today = new Date();

    // Start of the current week (Sunday)
    const currentWeekStart = new Date(today);
    currentWeekStart.setDate(today.getDate() - today.getDay()); // Move to Sunday
    currentWeekStart.setHours(0, 0, 0, 0);

    for (let i = 0; i < 4; i++) {
        const weekStart = new Date(currentWeekStart);
        weekStart.setDate(currentWeekStart.getDate() - (7 * i));
        
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 7); // Next Sunday
        weekEnd.setHours(0, 0, 0, 0);

        result.push({
            weekLabel: `Week ${4 - i}`, // Optional label like Week 1 to Week 4
            startDate: weekStart,
            endDate: weekEnd
        });
    }

    return result;
}

export function getLast7Days() {
    const result = [];
    const today = new Date();

    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);

        const startDate = new Date(date);
        startDate.setHours(0, 0, 0, 0); // 12:00 AM

        const endDate = new Date(date);
        endDate.setHours(23, 58, 0, 0); // 11:58 PM

        result.push({
            dayLabel: startDate.toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short'
            }), // e.g., "10 Apr"
            startDate,
            endDate
        });
    }

    return result.reverse(); // Oldest first, today last
}

export function get24HoursOfYesterday() {
    const result = [];
    const today = new Date();

    // Move to yesterday and set to midnight
    today.setDate(today.getDate() - 1);
    today.setHours(0, 0, 0, 0); // 12:00 AM of yesterday

    for (let i = 0; i < 24; i++) {
        const startDate = new Date(today);
        startDate.setHours(i, 0, 0, 0); // Start of the hour

        const endDate = new Date(startDate);
        endDate.setMinutes(59, 59, 999); // End of the hour

        result.push({
            hourLabel: startDate.toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
            }), // e.g., "10:00 AM"
            startDate,
            endDate
        });
    }

    return result;
}


console.log(get24HoursOfYesterday())

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
