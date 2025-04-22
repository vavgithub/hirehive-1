import React from 'react';

function IconWrapper({ icon  : Icon, isActiveIcon, inheritColor , isInActiveIcon, isErrorIcon, customIconSize, customStrokeWidth, children , hasBg , customBgHover ,size, ...props }) {  // Accept props explicitly
    const bgStyles = hasBg ? (typeof hasBg === "string" && hasBg?.trim() !== 'bg-background-70') ? hasBg : ` bg-background-70 ${customBgHover ? customBgHover : "hover:bg-accent-300"} ` : "";
    
    const sizeOptions = {
        0 : 'w-fit h-fit',
        1 : 'min-w-4 w-4 h-4',
        2 : 'min-w-6 w-6 h-6',
        3 : 'min-w-9 w-9 h-9', 
        4 : 'min-w-11 w-11 h-11', 
        5 : 'min-w-12 w-12 h-12', 
        6 : 'min-w-12 w-12 h-12',
        10 : 'min-w-24 w-24 h-24' 
    }

    const strokeWidthOptions = {
      0 : 1,
      1 : 1,
      2 : 1,
      3 : 1, 
      4 : 1.5, 
      5 : 1.5, 
      6 : 1.5,
      10 : 2,
      11 : 3,
    }

    const iconSizeOptions = {
      0 : 18,
      1 : 16,
      2 : 18,
      3 : 20, 
      4 : 22, 
      5 : 24, 
      6 : 26,
      7 : 28,
      10 : 100
    }

    const colors = {
      "primary" : "#18e9d0",
      "secondary" : "#808389",
      "error" : "#FF385C",
      "white" : "#ffffff",
    
    }

    const sizeStyles = ` ${(typeof size === 'number') ? sizeOptions[size] : sizeOptions[4]} `

  return (
    <div {...props} className={` ${bgStyles}  ${sizeStyles}  h-11 w-11 flex justify-center items-center rounded-xl `}>
      {Icon ? 
      <Icon 
      size={(typeof customIconSize === 'number') ? iconSizeOptions[customIconSize] : (typeof size === 'number') ?  iconSizeOptions[size] : 24} 
      color={inheritColor ? "currentColor" : isActiveIcon ? colors["primary"] : isInActiveIcon ? colors["secondary"] : isErrorIcon ? colors['error'] : colors["white"]} 
      strokeWidth={(typeof customStrokeWidth === 'number') ? strokeWidthOptions[customStrokeWidth] : (typeof size === 'number') ?  strokeWidthOptions[size] : 1.5} 
      /> 
      : children}
    </div>
  );
}

export default IconWrapper;
