const StatCard = ({ title, value , icon:Icon }) => (
    <div className="flex justify-between items-center bg-card-pattern w-[240px] rounded-md shadow " >
        <div className="ml-[15px] w-max">
        <p className="typography-small-p text-font-gray">{title}</p>
        <p className="typography-h2 text-white" >{value}</p>
        </div>
        <div>
            <Icon/>
        </div>
    </div>
);

const StatsGrid = ({ stats }) => (
    <div className="m-4 flex gap-4">
        {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
    </div>
);

export default StatsGrid;