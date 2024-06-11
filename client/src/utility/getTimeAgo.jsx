export const getTimeAgo = (date) => {
    const now = new Date();
    const createdAt = new Date(date);
    const diffInMs = now - createdAt;
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
        return `${diffInHours} hours ago`;
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    } else if (diffInWeeks < 5) {
        return `${diffInWeeks} weeks ago`;
    } else if (diffInMonths < 12) {
        return `${diffInMonths} months ago`;
    } else {
        return `${diffInYears} years ago`;
    }
};
