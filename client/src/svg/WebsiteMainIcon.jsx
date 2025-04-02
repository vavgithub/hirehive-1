import React from 'react';

const WebsiteMainIcon = ({sizeClasses}) => {
  return (
    <div className={`group ${sizeClasses ? sizeClasses : 'w-11 h-11'}`}>
        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full">
            <rect width="44" height="44" rx="12"
                className="fill-[#202122] group-hover:fill-accent-300 transition-colors duration-100" />
            <path
                d="M32 22C32 27.5228 27.5228 32 22 32M32 22C32 16.4772 27.5228 12 22 12M32 22H12M22 32C16.4772 32 12 27.5228 12 22M22 32C24.5013 29.2616 25.9228 25.708 26 22C25.9228 18.292 24.5013 14.7384 22 12M22 32C19.4987 29.2616 18.0772 25.708 18 22C18.0772 18.292 19.4987 14.7384 22 12M12 22C12 16.4772 16.4772 12 22 12"
                stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
        </svg> 
    </div>
  );
};

export default WebsiteMainIcon;
