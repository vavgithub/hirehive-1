const StatCard = ({ title, value }) => (
    <div className="bg-custom-complex-gradient w-[212px] flex-col  p-4 rounded-md shadow">
        <p className="typography-small-p text-font-gray">{title}</p>
        <p className="typography-h2 text-white" >{value}</p>
    </div>
);

const StatsGrid = ({ stats }) => (
    <div className=" mt-4 flex gap-4">
        {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
    </div>
);

export default StatsGrid;