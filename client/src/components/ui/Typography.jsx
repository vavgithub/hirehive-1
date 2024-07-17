import React from 'react';

const Typography = ({ variant, children, className = '', ...props }) => {
  const styles = {
    h1: 'font-bricolage text-h1 font-[700] leading-[54px]',
    h3: 'font-bricolage text-h3 font-[600] leading-[150%]',
    body: 'font-outfit text-body font-[300] leading-[150%]',
    'large-p': 'font-outfit text-large-p font-[400] leading-[20.3px]',
  };

  const variantClass = styles[variant] || styles.body;

  return (
    <div className={`${variantClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Typography;