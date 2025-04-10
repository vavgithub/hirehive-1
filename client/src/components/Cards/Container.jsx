import React, { forwardRef, useEffect } from "react";

const  Container = forwardRef(({
  children,
  customStyles = "",
  extraStyles = "",
  extraContainerStyles = "",
  hasBgColor = false,
  hasBgImage = false,
  mainProps = {},
  containerProps = {},
  hasContainerDiv = true,
  customPadding = ""
},ref) => {
    
  const basicMainStyles = ` w-full ${customPadding ? customPadding?.toString() : 'p-4'} min-h-screen `;
  const basicContainerStyles = " container ";

  const bgImageStyles = ` ${(typeof hasBgImage === 'string' && hasBgImage.trim() !== 'bg-main-bg') ? hasBgImage : " bg-main-bg " }  bg-cover `;
  const bgColorStyles = ` ${hasBgColor ? 
    (typeof hasBgColor === 'string' && hasBgColor.trim() !== 'bg-background-80') ? hasBgColor : " bg-background-80 " 
    : " bg-background-80 "} `;

    return (
    <div
      {...mainProps}
      ref={ref}
      className={
        customStyles ? customStyles : ` ${basicMainStyles} ${hasBgColor ? bgColorStyles : ""} ${hasBgImage ? bgImageStyles : ''}  ${extraStyles}`
      }
    >
        {/* Conditionally Rendering Container Div */}
      {hasContainerDiv ? 
      <div 
        {...containerProps}
        className={` ${basicContainerStyles}  ${extraContainerStyles} `}>
        {children}
      </div> 
      : 
      <>
        {children}
      </>}
    </div>
  );
})

export default Container;
