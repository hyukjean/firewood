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
          className="w-full h-full object-cover screenshot-optimized"
          crossOrigin="anonymous"
          loading="eager"
          decoding="sync"
          style={{
            // 이미지가 즉시 표시되도록 opacity 제거
            imageRendering: 'auto',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)', // 하드웨어 가속 활성화
            willChange: 'auto'
          }}
          onLoad={(e) => {
            // 이미지 로딩 완료 시 추가 처리
            const img = e.target as HTMLImageElement;
            console.log('Avatar image loaded:', img.src);
            img.style.opacity = '1';
          }}
          onError={(e) => {
            // 이미지 로딩 실패 시 기본 아바타로 fallback
            console.log('Avatar image failed to load:', (e.target as HTMLImageElement).src);
            const img = e.target as HTMLImageElement;
            img.style.display = 'none';
            const parent = img.parentElement;
            if (parent) {
              parent.innerHTML = `<div class="w-full h-full flex items-center justify-center bg-gray-200 font-semibold text-gray-600">${name.charAt(0).toUpperCase()}</div>`;
            }
          }}
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