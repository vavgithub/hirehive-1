export const fetchActiveJobsStats = async () => {
    try {
        const response = await axios.get('http://localhost:8008/api/activeJobsFilterCount');
        setActiveJobsCountFilter(response.data);
    } catch (error) {
        console.error('Error fetching job statistics:', error);
    }
    console.log("hers the data" + statistics)
};
