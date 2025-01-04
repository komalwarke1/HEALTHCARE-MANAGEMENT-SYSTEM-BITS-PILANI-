import React from 'react';

export const Button = ({ children, variant = 'primary', size = 'medium', ...props }) => {
  const baseClasses = 'font-semibold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500 dark:bg-blue-500 dark:hover:bg-blue-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-blue-500 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-500 dark:text-gray-300 dark:hover:bg-gray-700',
  };
  const sizeClasses = {
    small: 'px-2 py-1 text-sm',
    medium: 'px-4 py-2',
    large: 'px-6 py-3 text-lg',
    icon: 'p-2',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`}
      {...props}
    >
      {children}
    </button>
  );
};

