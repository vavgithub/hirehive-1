import React from 'react'
import { postedDate } from '../../utility/postedDate';
import IconWrapper from '../Cards/IconWrapper';
import { Calendar, FileText, GraduationCap, PenTool } from 'lucide-react';
import StyledCard from '../Cards/StyledCard';

const SideCard = ({ formData }) => {
    const formattedDate = postedDate(formData.createdAt);
    return (

        <StyledCard padding={2}>
            <h3 className='typography-h3 mr-8 mb-4'>Job Overview</h3>
            <div className="grid grid-cols-2 gap-3 w-full  md:flex md:flex-col md:gap-6  " >
                <div className="flex items-center w-full typography-body ">
                    <IconWrapper size={0} customIconSize={5} customStrokeWidth={1} isInActiveIcon icon={FileText} />
                    <div className="ml-2 w-full overflow-hidden">
                        <p className="typography-body">{formData.employmentType}</p>
                        <p className="typography-small-p text-font-gray whitespace-nowrap text-ellipsis overflow-hidden w-full">Employment Type</p>
                    </div>
                </div>
                <div className="flex items-center w-full">
                    <IconWrapper size={0} customIconSize={5} customStrokeWidth={1} isInActiveIcon icon={PenTool} />
                    <div className="ml-2 w-full overflow-hidden">
                        <p className="typography-body">{formData.jobProfile}</p>
                        <p className="typography-small-p text-font-gray whitespace-nowrap text-ellipsis overflow-hidden w-full">Job Profile</p>
                    </div>
                </div>

                <div className="flex items-center w-full">
                    <IconWrapper size={0} customIconSize={5} customStrokeWidth={1} isInActiveIcon icon={GraduationCap} />
                    <div className="ml-2 w-full overflow-hidden">
                        <p className="typography-body">{formData.experienceFrom} - {formData.experienceTo} Year</p>
                        <p className="typography-small-p text-font-gray whitespace-nowrap text-ellipsis overflow-hidden w-full">Experience Level</p>
                    </div>
                </div>

                <div className="flex items-center w-full">
                    <IconWrapper size={0} customIconSize={5} customStrokeWidth={1} isInActiveIcon icon={Calendar} />
                    <div className="ml-2 w-full overflow-hidden">
                        <p className="typography-body ">{formattedDate}</p>
                        <p className="typography-small-p text-font-gray whitespace-nowrap text-ellipsis overflow-hidden w-full">Date Posted </p>
                    </div>
                </div>

            </div>
        </StyledCard>

    )
}


export default SideCard