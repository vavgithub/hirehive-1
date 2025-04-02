import React, { useRef, useEffect } from 'react';

// StatCard component (unchanged)
const StatCard = ({ title, value, icon: Icon }) => (
  <div className="flex flex-shrink-0 justify-between items-center bg-card-pattern w-[240px] min-h-[104px] relative rounded-md shadow overflow-hidden">
    <div className="ml-[15px] w-max">
      <p className="typography-small-p text-font-gray w-max">{title}</p>
      <p className="typography-h2">{value}</p>
    </div>
    <div className='absolute -right-5 -bottom-4 opacity-10'>
      <Icon />
    </div>
  </div>
);

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
        <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
      ))}
    </div>
  );
};

export default StatsGrid;