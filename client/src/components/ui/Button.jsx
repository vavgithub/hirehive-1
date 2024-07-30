import React from 'react';
import classNames from 'classnames';

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "default", 
  asChild = false, 
  disabled = false,
  children,
  ...props 
}, ref) => {
  const Comp = asChild ? React.Fragment : "button";
  
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-blue-100 text-blue-600 hover:bg-blue-200",
    tertiary: "text-blue-600 hover:bg-blue-100",
    cancel: "bg-red-500 text-white hover:bg-red-600"
  };
  
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
  };
  
  return (
    <Comp
      className={classNames(
        baseStyles,
        variants[variant],
        sizes[size],
        { 'opacity-50 cursor-not-allowed': disabled },
        className
      )}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button };