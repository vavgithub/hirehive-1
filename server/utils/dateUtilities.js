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
