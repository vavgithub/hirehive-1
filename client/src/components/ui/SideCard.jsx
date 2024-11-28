import React from 'react'
import { postedDate } from '../../utility/postedDate';
import EmploymentTypeIcon from '../../svg/Sidecards/EmploymentTypeIcon';
import DesignIcon from '../../svg/Sidecards/DesignIcon';
import ExperienceLevelIcon from '../../svg/Sidecards/ExperienceLevelIcon';
import PostedIcon from '../../svg/Sidecards/PostedIcon';

const SideCard = ({ formData }) => {
    const formattedDate = postedDate(formData.createdAt);
    return (

        <div className="grid grid-cols-2 gap-3 w-full rounded-xl p-6 bg-background-90 mt-4 md:flex md:flex-col md:gap-6  " >
            <div className="flex items-center typography-body">
                <EmploymentTypeIcon />
                <div className="ml-2">
                    <p className="large-p">{formData.employmentType}</p>
                    <p className="text-sm text-font-gray">Employment Type</p>
                </div>
            </div>
            <div className="flex items-center">
                <DesignIcon />
                <div className="ml-2">
                    <p className="large-p">{formData.jobProfile}</p>
                    <p className="text-sm text-font-gray">Job Profile</p>
                </div>
            </div>

            <div className="flex items-center">
                <ExperienceLevelIcon />
                <div className="ml-2">
                    <p className="large-p">{formData.experienceFrom} - {formData.experienceTo} Year</p>
                    <p className="text-sm text-font-gray">Experience Level</p>
                </div>
            </div>

            <div className="flex items-center">
                <PostedIcon />
                <div className="ml-2">
                    <p className="large-p ">{formattedDate}</p>
                    <p className="text-sm text-font-gray">Date Posted </p>
                </div>
            </div>

        </div>

    )
}


export default SideCard