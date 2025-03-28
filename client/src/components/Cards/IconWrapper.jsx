import React from 'react';

function IconWrapper({ children,hasBg,size, ...props }) {  // Accept props explicitly
    const bgStyles = hasBg ? (typeof hasBg === "string" && hasBg?.trim() !== 'bg-background-70') ? hasBg : " bg-background-70 hover:bg-accent-300 " : "";
    
    const sizeOptions = {
        1 : 'w-4 h-4',
        2 : 'w-6 h-6',
        3 : 'w-9 h-9', 
        4 : 'w-11 h-11', 
        5 : 'w-12 h-12', 
    }

    const sizeStyles = ` ${(size && typeof size === 'number') ? sizeOptions[size] : sizeOptions[4]} `

  return (
    <div {...props} className={` ${bgStyles}  ${sizeStyles}  h-11 w-11 flex justify-center items-center rounded-xl `}>
      {children}
    </div>
  );
}

export default IconWrapper;
