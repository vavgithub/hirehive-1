const StatCard = ({ title, value , icon:Icon }) => (
    <div className="flex flex-shrink-0 justify-between items-center bg-card-pattern w-[240px] rounded-md shadow " >
        <div className="ml-[15px] w-max">
        <p className="typography-small-p text-font-gray w-max">{title}</p>
        <p className="typography-h2" >{value}</p>
        </div>
        <div>
            <Icon/>
        </div>
    </div>
);

const StatsGrid = ({ stats }) => (
    <div className="flex  gap-4 overflow-x-auto scrollbar-hide">
        {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
    </div>
);

export default StatsGrid;