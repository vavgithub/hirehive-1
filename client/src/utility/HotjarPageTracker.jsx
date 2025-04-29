import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function HotjarPageTracker() {
  const location = useLocation();

  useEffect(() => {
    // Check if the Hotjar function exists
    if (window.hj) {
      // Trigger the state change with the current path
      window.hj('stateChange', location.pathname);
    }
  }, [location]);

  return null;
}

export default HotjarPageTracker;
