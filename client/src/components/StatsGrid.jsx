const StatCard = ({ title, value }) => (
    <div className="bg-custom-complex-gradient w-[212px] flex-col  p-4 rounded-md shadow">
        <p className=" text-sm">{title}</p>
        <p className="text-red-600 font-bold text-xl">{value}</p>
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