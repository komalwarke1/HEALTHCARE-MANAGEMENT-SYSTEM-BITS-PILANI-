import React from 'react';

export const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold';
  const variantStyles = {
    default: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    outline: 'border border-input bg-background text-foreground',
  };

  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
};
