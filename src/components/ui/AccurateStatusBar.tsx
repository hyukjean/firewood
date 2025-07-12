import React from 'react';
import { StatusBarProps } from '../../types';
import { IPHONE_DIMENSIONS } from '../../constants';

const AccurateStatusBar: React.FC<StatusBarProps> = ({ 
  time, 
  batteryLevel, 
  backgroundColor = 'transparent' 
}) => {
  // 배터리 아이콘 색상 결정
  const getBatteryColor = (level: number) => {
    if (level <= 20) return '#FF3B30'; // iOS Red
    if (level <= 50) return '#FF9500'; // iOS Orange  
    return '#34C759'; // iOS Green
  };

  const batteryColor = getBatteryColor(batteryLevel);
  const isLowBattery = batteryLevel <= 20;

  return (
    <div 
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-8 pt-[14px]"
      style={{
        height: `${IPHONE_DIMENSIONS.statusBarHeight}px`,
        backgroundColor,
        fontSize: '17px',
        fontWeight: '600',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
      }}
    >
      {/* 시간 */}
      <div className="flex-1">
        <span style={{ 
          color: '#000000',
          fontSize: '17px',
          fontWeight: '600',
          letterSpacing: '-0.41px'
        }}>
          {time}
        </span>
      </div>
      
      {/* 뉴모피즘 Dynamic Island */}
      <div className="flex-1 flex justify-center">
        <div 
          className="bg-gray-200 rounded-full border border-gray-300"
          style={{
            width: '126px',
            height: '37px',
            marginTop: '-3px',
            boxShadow: `
              inset 4px 4px 8px rgba(209, 213, 219, 0.8),
              inset -4px -4px 8px rgba(255, 255, 255, 0.9)
            `
          }}
        />
      </div>
      
      {/* 우측 상태 아이콘들 */}
      <div className="flex-1 flex items-center justify-end gap-[6px]">
        {/* 신호 강도 */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <circle cx="2" cy="10" r="1.5" fill="#000000"/>
          <circle cx="6" cy="8" r="1.5" fill="#000000"/>
          <circle cx="10" cy="6" r="1.5" fill="#000000"/>
          <circle cx="14" cy="4" r="1.5" fill="#000000"/>
        </svg>
        
        {/* WiFi */}
        <svg width="17" height="12" viewBox="0 0 17 12" fill="none">
          <path 
            d="M8.5 12C9.05 12 9.5 11.55 9.5 11C9.5 10.45 9.05 10 8.5 10C7.95 10 7.5 10.45 7.5 11C7.5 11.55 7.95 12 8.5 12Z" 
            fill="#000000"
          />
          <path 
            d="M8.5 8.5C10.43 8.5 12.17 9.39 13.36 10.86L14.64 9.64C13.11 7.85 10.91 6.75 8.5 6.75C6.09 6.75 3.89 7.85 2.36 9.64L3.64 10.86C4.83 9.39 6.57 8.5 8.5 8.5Z" 
            fill="#000000"
          />
          <path 
            d="M8.5 5C11.81 5 14.79 6.69 16.64 9.36L17.86 8.14C15.61 5.08 12.21 3.25 8.5 3.25C4.79 3.25 1.39 5.08 -0.86 8.14L0.36 9.36C2.21 6.69 5.19 5 8.5 5Z" 
            fill="#000000"
          />
        </svg>
        
        {/* 배터리 */}
        <div className="flex items-center gap-[2px]">
          <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
            {/* 배터리 외곽 */}
            <rect
              x="1"
              y="2"
              width="22"
              height="9"
              rx="2.5"
              ry="2.5"
              stroke={isLowBattery ? batteryColor : '#000000'}
              strokeWidth="1"
              fill="none"
              opacity={isLowBattery ? 1 : 0.35}
            />
            {/* 배터리 양극 단자 */}
            <rect
              x="23.5"
              y="4.5"
              width="2"
              height="4"
              rx="1"
              ry="1"
              fill={isLowBattery ? batteryColor : '#000000'}
              opacity={isLowBattery ? 1 : 0.4}
            />
            {/* 배터리 충전량 */}
            {batteryLevel > 0 && (
              <rect
                x="2.5"
                y="3.5"
                width={Math.max(1, (batteryLevel / 100) * 19)}
                height="6"
                rx="1.5"
                ry="1.5"
                fill={batteryColor}
              />
            )}
          </svg>
          
          {/* 배터리 퍼센트 (iOS 스타일) */}
          <span 
            style={{ 
              color: '#000000',
              fontSize: '17px',
              fontWeight: '400',
              letterSpacing: '-0.41px'
            }}
          >
            {batteryLevel}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccurateStatusBar; 