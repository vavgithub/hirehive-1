export const getFormattedDateAndTime = (date,time) =>{
    const formattedDate = new Date(date);
    const [hour, minute] = time?.split(":");
    formattedDate.setHours(hour,minute,0,0);
    return formattedDate
}

export const convertToIST = (utcTimestamp) => {
    const date = new Date(utcTimestamp);

    // Convert to IST timezone
    const optionsDate = { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'Asia/Kolkata' };
    const optionsTime = { hour: '2-digit', minute: '2-digit', hour12: true, timeZone: 'Asia/Kolkata' };

    const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
    const formattedTime = date.toLocaleTimeString('en-GB', optionsTime)
    .replace(/^00/, "12")
    .replace('AM', 'AM IST')
    .replace('PM', 'PM IST');

    return {
        formattedDate: formattedDate.replace(" ", "-"), // Formatting to match "08-July-2025"
        formattedTime
    };
};
