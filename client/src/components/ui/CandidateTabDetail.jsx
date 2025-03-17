import React from 'react';
import StyledCard from '../Cards/StyledCard';
import CustomHeading from '../Heading/CustomHeading';
import { GridRow } from '../Grid/GridRow';

const Experience = ({ company, position, startDate, endDate, index }) => (
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-white mb-2">Experience {index + 1}</h3>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1">
        <GridRow label="Company Name" value={company} />
        <GridRow label="Position" value={position} />
        <GridRow label="Start Date" value={startDate} />
        <GridRow label="End Date" value={endDate} />
      </div>
    </div>
  );

const CandidateTabDetail = ({ data }) => {
  return (
      <div className='flex flex-col gap-4'>
          <StyledCard padding={2}>
            <CustomHeading  label={"Professional Details"} />
            <div className='grid grid-cols-2 gap-4 '>
              {data.professionalDetails.map((detail, index) => (
                <GridRow key={index} label={detail.label} value={detail.value} />
              ))}
            </div>
          </StyledCard>

          <StyledCard padding={2}>
            <CustomHeading  label={"Skill Set"} />
            <div className="flex flex-wrap gap-2">
                  {data.skillSet.map((skill, index) => (
                      <span key={index} className="bg-background-70 rounded-full typography-body py-3 px-4">
                          {skill}
                      </span>
                  ))}
              </div>
          </StyledCard>
      </div>
  );
};

// Remove the exampleData since we're using real data now
export default CandidateTabDetail;