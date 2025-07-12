import React from 'react';
import { BatteryIconProps } from '../../../types';

const BatteryIcon: React.FC<BatteryIconProps> = ({ level, className = '' }) => {
  const getLevelColor = (level: number) => {
    if (level <= 20) return '#ff3b30'; // iOS red
    if (level <= 50) return '#ff9500'; // iOS orange  
    return '#34c759'; // iOS green
  };

  const fillWidth = Math.max(0, Math.min(100, level));
  const color = getLevelColor(level);
  const isLowBattery = level <= 20;

  return (
    <div className={`inline-flex items-center gap-1 ${className}`}>
      {/* iOS 스타일 배터리 아이콘 */}
      <svg width="25" height="13" viewBox="0 0 25 13" fill="none">
        {/* 배터리 메인 바디 */}
        <rect
          x="1"
          y="2"
          width="20"
          height="9"
          rx="2.5"
          ry="2.5"
          stroke={isLowBattery ? color : '#000'}
          strokeWidth="1"
          fill="none"
          opacity={isLowBattery ? 1 : 0.4}
        />
        {/* 배터리 양극 단자 */}
        <rect
          x="21.5"
          y="4.5"
          width="2"
          height="4"
          rx="1"
          ry="1"
          fill={isLowBattery ? color : '#000'}
          opacity={isLowBattery ? 1 : 0.4}
        />
        {/* 배터리 충전량 표시 */}
        {fillWidth > 0 && (
          <rect
            x="2"
            y="3"
            width={Math.max(1, (fillWidth / 100) * 18)}
            height="7"
            rx="1.5"
            ry="1.5"
            fill={color}
          />
        )}
        {/* 번개 아이콘 (충전 중일 때 - 옵션) */}
        {level >= 95 && (
          <path
            d="M11 4L8 8h3v3l3-4h-3V4z"
            fill="white"
            stroke="none"
            fontSize="8"
          />
        )}
      </svg>
      {/* 배터리 퍼센트 */}
      <span 
        className="text-[15px] font-semibold"
        style={{ 
          color: isLowBattery ? color : '#000',
          fontWeight: '600',
          fontSize: '15px'
        }}
      >
        {level}%
      </span>
    </div>
  );
};

export default BatteryIcon; 