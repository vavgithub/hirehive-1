import React from 'react';

const Card = ({ title, children, gridLayout = false , extraClass }) => (
    <div className={`bg-background-30 p-4 rounded-lg mb-4 ${extraClass}`} >
      <h2 className="typography-h3">{title}</h2>
      <div className={gridLayout ? "grid grid-cols-2 gap-4" : ""}>{children}</div>
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
      <Card title="Professional Details"  gridLayout={true}>
        {data.professionalDetails.map((detail, index) => (
          <DetailRow key={index} label={detail.label} value={detail.value} />
        ))}
      </Card>

      <Card title="Previous Experiences">
        <div className="grid grid-cols-1 gap-4">
          {data.previousExperiences.map((exp, index) => (
            <Experience key={index} {...exp} index={index} />
          ))}
        </div>
      </Card>

      <Card title="Skill Set">
        <div className="flex flex-wrap gap-2">
          {data.skillSet.map((skill, index) => (
            <span key={index} className="bg-background-70 rounded-xl typography-body px-2 py-1">
              {skill}
            </span>
          ))}
        </div>
      </Card>
    </div>
  );
};

// Example usage
const exampleData = {
  professionalDetails: [
    { label: "Experience", value: "8 Years" },
    { label: "Notice Period", value: "1 Month" },
    { label: "Current CTC", value: "4 LPA" },
    { label: "Expected CTC", value: "8 LPA" },
  ],
  previousExperiences: [
    {
      company: "ABC Company",
      position: "UI Designer",
      startDate: "21 Jan 2022",
      endDate: "05 July 2024",
    },
    {
      company: "DEF Company",
      position: "Junior UI Designer",
      startDate: "16 Feb 2019",
      endDate: "27 Sept 2021",
    },
  ],
  skillSet: ["Figma", "Sketch", "Adobe Suites", "Zeplin"],
};

export default () => <CandidateTabDetail data={exampleData} />;