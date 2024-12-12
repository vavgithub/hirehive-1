import React, { useEffect, useState } from 'react'

function useScroll() {
  const [scrollPosition,setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollPosition(window.scrollY)
        };
    
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll);
    
        // Clean up event listener on unmount
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

    return scrollPosition
}

export default useScroll
