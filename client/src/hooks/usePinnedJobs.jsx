import { useEffect, useState } from 'react';

function getPinnedKey(email) {
  return `${email}-pinnedJobs`;
}

function usePinnedJobs(email) {
  const [pinnedJobsId, setPinnedJobsId] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStoredPinnedJobs = (key) => {
    const stored = localStorage.getItem(key);
    try {
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to parse pinned jobs from localStorage:', err);
      return [];
    }
  };

  const saveToLocalStorage = (key, jobs) => {
    localStorage.setItem(key, JSON.stringify(jobs));
  };

  const handleSetPinnedJobs = (jobId) => {
    const pinnedKey = getPinnedKey(email);

    if (!pinnedJobsId.includes(jobId)) {
      const updatedJobs = [jobId, ...pinnedJobsId];
      setPinnedJobsId(updatedJobs);
      saveToLocalStorage(pinnedKey, updatedJobs);
    }
  };

  const handleUnPinJobs = (jobId) => {
    const pinnedKey = getPinnedKey(email);

    if (pinnedJobsId.includes(jobId)) {
      const updatedJobs = pinnedJobsId.filter((id) => id !== jobId);
      setPinnedJobsId(updatedJobs);
      saveToLocalStorage(pinnedKey, updatedJobs);
    }
  };

  useEffect(() => {
    const pinnedKey = getPinnedKey(email);
    const storedJobs = getStoredPinnedJobs(pinnedKey);
    setPinnedJobsId(storedJobs);
    setLoading(false)
  }, [email]);

  return {
    pinnedJobs: pinnedJobsId,
    pinLoading : loading,
    setPinnedJobs: handleSetPinnedJobs,
    setUnPinnedJobs: handleUnPinJobs,
  };
}

export default usePinnedJobs;
