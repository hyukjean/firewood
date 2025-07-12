import React from 'react';
import { AvatarProps } from '../../types';

const Avatar: React.FC<AvatarProps> = React.memo(({ 
  image, 
  name, 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-16 h-16 text-xl'
  };

  const baseClasses = `${sizeClasses[size]} rounded-full overflow-hidden flex items-center justify-center bg-gray-200 ${className}`;

  if (image) {
    return (
      <div className={baseClasses}>
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={`${baseClasses} bg-white font-semibold text-gray-600`}>
      {name.charAt(0).toUpperCase()}
    </div>
  );
});

export default Avatar; 