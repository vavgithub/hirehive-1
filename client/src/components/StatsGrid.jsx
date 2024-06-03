const StatCard = ({ title, value }) => (
    <div className="flex w-[212px] flex-col  p-4 bg-gray-100 rounded-md shadow">
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="font-bold text-xl">{value}</p>
    </div>
);

const StatsGrid = ({ stats }) => (
    <div className="mt-4 flex gap-4">
        {stats.map((stat, index) => (
            <StatCard key={index} title={stat.title} value={stat.value} />
        ))}
    </div>
);

export default StatsGrid;