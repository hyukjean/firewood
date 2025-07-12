import React from 'react';
import { StatusBarProps } from '../../types';
import { IPHONE_DIMENSIONS, COLORS } from '../../constants';
import { Platform } from '../../types';

interface SimpleStatusBarProps extends StatusBarProps {
  platform?: Platform;
}

const SimpleStatusBar: React.FC<SimpleStatusBarProps> = ({ 
  time, 
  batteryLevel, 
  backgroundColor = 'transparent',
  platform = 'kakaotalk'
}) => {
  // 배터리 아이콘 색상 결정
  const getBatteryColor = (level: number) => {
    if (level <= 20) return '#FF3B30'; // iOS Red
    if (level <= 50) return '#FF9500'; // iOS Orange  
    return '#34C759'; // iOS Green
  };

  const batteryColor = getBatteryColor(batteryLevel);
  const isLowBattery = batteryLevel <= 20;

  // 플랫폼별 배경색 설정
  const getBackgroundColor = () => {
    if (backgroundColor !== 'transparent') return backgroundColor;
    return platform === 'kakaotalk' ? COLORS.KAKAO.BG : 'white';
  };

  return (
    <div 
      className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6 pt-3"
      style={{
        height: `${IPHONE_DIMENSIONS.statusBarHeight}px`,
        backgroundColor: getBackgroundColor(),
        fontSize: '16px',
        fontWeight: '600',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
      }}
    >
      {/* 시간 */}
      <div className="flex-1">
        <span style={{ 
          color: '#000000',
          fontSize: '16px',
          fontWeight: '600'
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
      <div className="flex items-center gap-1">
        {/* 신호 강도 */}
        <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
          <circle cx="2" cy="10" r="1.5" fill="#000000"/>
          <circle cx="6" cy="8" r="1.5" fill="#000000"/>
          <circle cx="10" cy="6" r="1.5" fill="#000000"/>
          <circle cx="14" cy="4" r="1.5" fill="#000000"/>
        </svg>
        
        {/* WiFi */}
        <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
          <path 
            d="M7.5 11C8.05 11 8.5 10.55 8.5 10C8.5 9.45 8.05 9 7.5 9C6.95 9 6.5 9.45 6.5 10C6.5 10.55 6.95 11 7.5 11Z" 
            fill="#000000"
          />
          <path 
            d="M7.5 7.5C9.43 7.5 11.17 8.39 12.36 9.86L13.64 8.64C12.11 6.85 9.91 5.75 7.5 5.75C5.09 5.75 2.89 6.85 1.36 8.64L2.64 9.86C3.83 8.39 5.57 7.5 7.5 7.5Z" 
            fill="#000000"
          />
        </svg>
        
        {/* 배터리 */}
        <div className="flex items-center gap-1">
          <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
            {/* 배터리 외곽 */}
            <rect
              x="1"
              y="2"
              width="20"
              height="8"
              rx="2"
              ry="2"
              stroke={isLowBattery ? batteryColor : '#000000'}
              strokeWidth="1"
              fill="none"
              opacity={isLowBattery ? 1 : 0.35}
            />
            {/* 배터리 양극 단자 */}
            <rect
              x="21.5"
              y="4"
              width="1.5"
              height="4"
              rx="0.5"
              ry="0.5"
              fill={isLowBattery ? batteryColor : '#000000'}
              opacity={isLowBattery ? 1 : 0.4}
            />
            {/* 배터리 충전량 */}
            {batteryLevel > 0 && (
              <rect
                x="2.5"
                y="3.5"
                width={Math.max(1, (batteryLevel / 100) * 17)}
                height="5"
                rx="1"
                ry="1"
                fill={batteryColor}
              />
            )}
          </svg>
          
          {/* 배터리 퍼센트 */}
          <span 
            style={{ 
              color: '#000000',
              fontSize: '16px',
              fontWeight: '400'
            }}
          >
            {batteryLevel}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default SimpleStatusBar; 