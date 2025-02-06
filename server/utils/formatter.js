export const getFormattedDateAndTime = (date,time) =>{
    const formattedDate = new Date(date);
    const [hour, minute] = time?.split(":");
    formattedDate.setHours(hour,minute,0,0);
    return formattedDate
}