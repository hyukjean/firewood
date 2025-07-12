import React from 'react';
import { Platform } from '../../types';
import { IPHONE_DIMENSIONS, COLORS } from '../../constants';

interface iPhoneWrapperProps {
  children: React.ReactNode;
  platform: Platform;
  deviceTime: string;
  batteryLevel: number;
  isMobile?: boolean;
}

const iPhoneWrapper: React.FC<iPhoneWrapperProps> = ({
  children,
  platform,
  deviceTime,
  batteryLevel,
  isMobile = false
}) => {
  return (
    <div 
      className="mx-auto bg-gray-50 rounded-[40px] p-3 border border-gray-200"
      style={{
        width: `${IPHONE_DIMENSIONS.width}px`,
        height: `${IPHONE_DIMENSIONS.height}px`,
        transform: isMobile ? 'scale(0.8)' : 'scale(1)',
        transformOrigin: 'center top',
        boxShadow: `
          20px 20px 40px rgba(209, 213, 219, 0.8),
          -20px -20px 40px rgba(255, 255, 255, 0.9),
          inset 0 0 0 1px rgba(255, 255, 255, 0.2)
        `
      }}
    >
      <div 
        className="w-full h-full bg-white rounded-[32px] overflow-hidden relative border border-gray-100"
        style={{
          boxShadow: `
            inset 8px 8px 16px rgba(209, 213, 219, 0.3),
            inset -8px -8px 16px rgba(255, 255, 255, 0.8)
          `
        }}
      >
        {/* 채팅 컨텐츠 - 전체 화면 사용 */}
        <div className="h-full box-border">
          {children}
        </div>
      </div>
    </div>
  );
};

export default iPhoneWrapper; 