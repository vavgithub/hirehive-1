import React, { useRef, useEffect, useState } from 'react';

// StatCard component (unchanged)
const StatCard = ({ title, value, icon: Icon ,statistics}) => {
    const [currentStatistics,setCurrentStatistics] = useState('');
    const [index,setIndex] = useState(0);
    const [show,setShow] = useState(false);   

    useEffect(() => {
      let interval;
      if(statistics && statistics?.monthly){
        setCurrentStatistics(statistics.monthly);
        setIndex(1);
         interval = setInterval(() => {
           setIndex(prev=>{
             
             setCurrentStatistics(Object.entries(statistics)[prev][1])
            
            return  prev === 2 ? 0 : prev + 1
          })
        },5000) 
      }
      return () => clearInterval(interval)
    },[statistics])

    useEffect(() => {
      setShow(false); // Remove class to restart animation
      const timer = setTimeout(() => setShow(true), 10); // Reapply after a slight delay
      return () => clearTimeout(timer)
    }, [currentStatistics]);

  return(
  <div className="flex flex-shrink-0 justify-between relative items-center bg-card-pattern w-[240px] rounded-md shadow h-[6.5rem] min-h-fit">
    <div className="ml-[15px] w-full ">
      <p className="typography-small-p text-font-gray w-max">{title}</p>
      <p className="typography-h2">{value ?? 0}</p>
      { <p key={currentStatistics}  className={`typography-small-p text-font-gray whitespace-nowrap flip ${show ? 'show' : ''}`}>
        <span className={/\-/.test(currentStatistics?.split(' ')[0]) ? 'text-red-40' : 'text-green-70'}>{currentStatistics && (/\-/.test(currentStatistics?.split(' ')[0]) || '+')}{currentStatistics?.split(' ')[0]}</span> {currentStatistics?.split(' ').slice(1).join(' ')}
      </p>}
    </div>
    <div className='absolute right-0'>
      <Icon />
    </div>
  </div>
)};

// Updated StatsGrid component with horizontal mouse wheel scroll
const StatsGrid = ({ stats }) => {
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const handleWheel = (e) => {
      if (scrollContainerRef.current) {
        e.preventDefault();
        scrollContainerRef.current.scrollLeft += e.deltaY;
      }
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div 
      ref={scrollContainerRef}
      className="flex gap-4 overflow-x-auto scrollbar-hide"
      style={{
        msOverflowStyle: 'none',  /* IE and Edge */
        scrollbarWidth: 'none',   /* Firefox */
      }}
    >
      {stats.map((stat, index) => (
        <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} statistics={stat.statistics} />
      ))}
    </div>
  );
};

export default StatsGrid;