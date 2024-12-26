import React from 'react';

const Card = ({ title, children, gridLayout = false , extraClass }) => (
    <div className={`bg-background-30 p-4 rounded-xl mb-4 ${extraClass}`} >
      <h2 className="typography-h3 mb-5">{title}</h2>
      <div className={gridLayout ? "grid grid-cols-2 gap-3" : ""}>{children}</div>
    </div>
  );

const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-2">
    
    <span className="text-font-gray typography-body">{label}</span>
    <span className="typography-body">{value}</span>
  </div>
);

const Experience = ({ company, position, startDate, endDate, index }) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-white mb-2">Experience {index + 1}</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <DetailRow label="Company Name" value={company} />
        <DetailRow label="Position" value={position} />
        <DetailRow label="Start Date" value={startDate} />
        <DetailRow label="End Date" value={endDate} />
      </div>
    </div>
  );

  const CandidateTabDetail = ({ data }) => {
    return (
        <div>
            <Card title="Professional Details" gridLayout={true}>
                {data.professionalDetails.map((detail, index) => (
                    <DetailRow key={index} label={detail.label} value={detail.value} />
                ))}
            </Card>

            <Card title="Skill Set">
                <div className="flex flex-wrap gap-2">
                    {data.skillSet.map((skill, index) => (
                        <span key={index} className="bg-background-70 rounded-full typography-body py-3 px-4">
                            {skill}
                        </span>
                    ))}
                </div>
            </Card>
        </div>
    );
};

// Remove the exampleData since we're using real data now
export default CandidateTabDetail;