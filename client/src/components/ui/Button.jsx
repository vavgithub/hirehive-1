import React from 'react';
import classNames from 'classnames';

// Default icon SVG as a React component
const DefaultIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Button = React.forwardRef(({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  disabled = false,
  icon: IconComponent,
  iconPosition = "right",
  children,
  ...props
}, ref) => {
  const Comp = asChild ? React.Fragment : "button";

  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    primary: "bg-blue-100 w-full text-white typography-body hover:bg-blue-200",
    secondary: "bg-blue-300 w-full text-blue-100 typography-body hover:bg-blue-200",
    tertiary: "text-blue-600 typography-body hover:bg-blue-100",
    cancel: "bg-red-500 w-full text-white typography-body hover:bg-red-600",
    icon: "bg-blue-100 p-0"
  };

  const sizes = {
    default: "h-10 py-2 px-4",
    icon: "h-10 w-10"
  };

  const renderIcon = () => {
    if (IconComponent) {
      return <IconComponent />;
    } else if (variant === "icon") {
      return <DefaultIcon />;
    }
    return null;
  };

  const renderContent = () => {
    if (variant === "icon") {
      return renderIcon();
    }

    const iconElement = renderIcon();
    const textElement = <span>{children}</span>;

    return (
      <>
        {iconPosition === "left" && iconElement}
        {textElement}
        {iconPosition === "right" && iconElement}
      </>
    );
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
      {renderContent()}
    </Comp>
  );
});

Button.displayName = "Button";

export { Button };