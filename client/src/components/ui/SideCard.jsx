import React from 'react'
import { postedDate } from '../../utility/postedDate';
import EmploymentTypeIcon from '../../svg/Sidecards/EmploymentTypeIcon';
import DesignIcon from '../../svg/Sidecards/DesignIcon';
import ExperienceLevelIcon from '../../svg/Sidecards/ExperienceLevelIcon';
import PostedIcon from '../../svg/Sidecards/PostedIcon';
import IconWrapper from '../Cards/IconWrapper';
import { Calendar, FileText, GraduationCap, PenTool } from 'lucide-react';

const SideCard = ({ formData }) => {
    const formattedDate = postedDate(formData.createdAt);
    return (

        <div className="grid grid-cols-2 gap-3 w-full rounded-xl p-6 bg-background-90 md:mt-4 md:flex md:flex-col md:gap-6  " >
            <div className="flex items-center typography-body ">
                <IconWrapper size={0} customIconSize={5} customStrokeWidth={1} isInActiveIcon icon={FileText} />
                <div className="ml-2">
                    <p className="large-p">{formData.employmentType}</p>
                    <p className="text-sm text-font-gray">Employment Type</p>
                </div>
            </div>
            <div className="flex items-center">
                <IconWrapper size={0} customIconSize={5} customStrokeWidth={1} isInActiveIcon icon={PenTool} />
                <div className="ml-2">
                    <p className="large-p">{formData.jobProfile}</p>
                    <p className="text-sm text-font-gray">Job Profile</p>
                </div>
            </div>

            <div className="flex items-center">
                <IconWrapper size={0} customIconSize={5} customStrokeWidth={1} isInActiveIcon icon={GraduationCap} />
                <div className="ml-2">
                    <p className="large-p">{formData.experienceFrom} - {formData.experienceTo} Year</p>
                    <p className="text-sm text-font-gray">Experience Level</p>
                </div>
            </div>

            <div className="flex items-center">
                <IconWrapper size={0} customIconSize={5} customStrokeWidth={1} isInActiveIcon icon={Calendar} />
                <div className="ml-2">
                    <p className="large-p ">{formattedDate}</p>
                    <p className="text-sm text-font-gray">Date Posted </p>
                </div>
            </div>

        </div>

    )
}


export default SideCard