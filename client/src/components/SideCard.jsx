import React from 'react'
import { postedDate } from '../utility/postedDate';
import EmploymentTypeIcon from '../svg/EmploymentTypeIcon';
import DesignIcon from '../svg/DesignIcon';
import ExperienceLevelIcon from '../svg/ExperienceLevelIcon';
import PostedIcon from '../svg/PostedIcon';

const SideCard = ({ formData }) => {
    const formattedDate = postedDate(formData.createdAt);
    return (

        <div className="flex flex-col gap-2 border p-4 rounded w-max" >
            <div className="flex items-center">
                <EmploymentTypeIcon />
                <div className="ml-2">
                    <p className=" font-bold capitalize">{formData.employmentType}</p>
                    <p className="text-sm">Employment Type</p>
                </div>
            </div>
            <div className="flex items-center">
                <DesignIcon />
                <div className="ml-2">
                    <p className=" font-bold capitalize ">{formData.jobProfile}</p>
                    <p className="text-sm">Job Profile</p>
                </div>
            </div>

            <div className="flex items-center">
                <ExperienceLevelIcon />
                <div className="ml-2">
                    <p className=" font-bold capitalize ">{formData.fromExperience} - {formData.toExperience} Year</p>
                    <p className="text-sm">Experience Level</p>
                </div>
            </div>

            <div className="flex items-center">
                <PostedIcon />
                <div className="ml-2">
                    <p className=" font-bold capitalize ">{formattedDate}</p>
                    <p className="text-sm">Date Posted </p>
                </div>
            </div>

        </div>

    )
}


export default SideCard