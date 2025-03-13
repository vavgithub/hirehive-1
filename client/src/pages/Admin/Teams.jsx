import React from "react";
import StyledCard from "../../components/Cards/StyledCard";
import { Button } from "../../components/Buttons/Button";

function Teams() {
  return (
    <div className="container mx-4 pt-4 h-screen">
      <div className="flex flex-row justify-between mb-4">
        <h1 className="typography-h1">Teams</h1>
        
      </div>
        <div className="grid grid-cols-5 gap-6">
            {/* Add Card */}
            <StyledCard padding={2} extraStyles={'flex flex-col items-center gap-4'}>
                {/* Member Profile Picture */}
                <div className="relative w-full aspect-square rounded-xl overflow-hidden">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg" alt="" className='object-cover w-full overflow-hidden' />
                    <span className="absolute top-7 right-12 font-bold text-[#BBBFC1] scale-[3.4]">+</span>
                </div>
                {/* Memeber Details */}
                <div className="flex flex-col ">
                    <p className="typography-body font-bricolage font-medium text-center ">Add Team Member</p>
                </div>
                <div className="w-full flex  items-center justify-center">
                    <Button className="w-full">Add Member</Button>
                </div>
            </StyledCard>

            <StyledCard padding={2} extraStyles={'flex flex-col items-center gap-4'}>
                {/* Member Profile Picture */}
                <div className="w-full aspect-square rounded-xl overflow-hidden">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg" alt="" className='object-cover w-full overflow-hidden' />
                </div>
                {/* Memeber Details */}
                <div className="flex flex-col ">
                    <h3 className="typography-h3">San Hazare</h3>
                    <p className="typography-small-p text-center text-font-gray">Hiring Manager</p>
                </div>
                <div>
                    <p className="font-bricolage text-sm rounded-full font-medium tracking-wider border border-accent-100 text-accent-100 px-4 py-1">Invited</p>
                </div>
            </StyledCard>
        </div>
    </div>
  );
}

export default Teams;
