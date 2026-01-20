import React from 'react';

export function Button({ 
  children, 
  onClick, 
  disabled = false, 
  type = 'button',
  variant = 'default', 
  size = 'md',
  className = '' 
}) {
  const baseStyles = 'font-semibold rounded-lg transition-all duration-200 flex items-center justify-center';
  
  const variants = {
    default: 'bg-indigo-600 text-white hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed',
    outline: 'border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 disabled:border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed',
    ghost: 'text-indigo-600 hover:bg-indigo-50 disabled:text-gray-400 disabled:cursor-not-allowed'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </button>
  );
}
