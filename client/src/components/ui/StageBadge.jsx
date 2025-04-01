const getStageDotColor = (stage) => {
    switch (stage.toLowerCase()) {
      case 'portfolio':
        return 'bg-blue-500';
      case 'screening':
        return 'bg-yellow-500';
      case 'design task':
        return 'bg-purple-500';
      case 'round 1':
        return 'bg-green-500';
      case 'round 2':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };
  
  const StageBadge = ({ stage , customWidth}) => {
    const dotColor = getStageDotColor(stage);
  
    return (
      <div className={"flex items-center rounded-xl justify-start px-6 py-2 h-8 bg-background-70 " + (customWidth ? customWidth : 'w-[85%]')}>
        {/* Circular dot */}
        <div className={`w-3 h-3 rounded-full ${dotColor} mr-2`}></div>
        {/* Stage text */}
        <span className="typography-body">{stage}</span>
      </div>
    );
  };
  
  export default StageBadge;
  