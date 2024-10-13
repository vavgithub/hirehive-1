export const formatTime = (timeString) => {
    // Check if timeString is in HH:mm format
    if (/^\d{2}:\d{2}$/.test(timeString)) {
        const [hours, minutes] = timeString.split(':').map(Number);
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const formattedHours = hours % 12 || 12;
        return `${formattedHours}:${minutes.toString().padStart(2, '0')}${ampm}`;
    }
    
    // If not, assume it's a full date string and parse it
    const date = new Date(timeString);
    
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        console.error('Invalid time format:', timeString);
        return 'Invalid Time';
    }

    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const minutesStr = minutes.toString().padStart(2, '0');
    return `${hours}:${minutesStr}${ampm}`;
};