import React from 'react';
import classNames from 'classnames';
import { Check } from '@/components/geode/icons';

export const DefaultIcon = () => <Check aria-hidden="true" />;

const Button = React.forwardRef(({
  className,
  variant = "primary",
  size = "default",
  asChild = false,
  disabled = false,
  icon: IconComponent,
  iconPosition = "left",
  children,
  ...props
}, ref) => {
  const Comp = asChild ? React.Fragment : "button";

  const baseStyles = "inline-flex items-center justify-center gap-2 rounded-xl typography-body  transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";

  const variants = {
    primary: "bg-blue-100 text-white typography-body hover:bg-blue-200",
    secondary: "bg-blue-300 text-blue-100 typography-body hover:bg-blue-400",
    tertiary: "text-blue-600 typography-body hover:bg-blue-400",
    white : 'bg-button-white text-black-100 hover:bg-button-whiteHover',
    cancel: "bg-red-500 text-white typography-body hover:bg-red-600",
    cancelSec: "bg-red-80 text-red-100 typography-body hover:bg-red-60",
    icon: "bg-blue-100",
    iconSec: "bg-blue-300 hover:bg-blue-400 "
  };

  const sizes = {
    default: "h-11 px-12 w-fit",
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
    if (variant === "icon" || variant === "iconSec") {
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
        'app-button',
        baseStyles,
        variants[variant],
        sizes[size],
        { 'opacity-50 cursor-not-allowed': disabled },
        className
      )}
      data-variant={variant}
      data-size={size}
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