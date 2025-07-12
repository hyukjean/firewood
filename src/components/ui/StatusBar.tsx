import React from 'react';
import { Signal, Wifi } from 'lucide-react';
import { StatusBarProps } from '../../types';
import { IPHONE_DIMENSIONS } from '../../constants';
import BatteryIcon from '../common/Icons/BatteryIcon';

const StatusBar: React.FC<StatusBarProps> = ({ 
  time, 
  batteryLevel, 
  backgroundColor = 'transparent' 
}) => {
  return (
    <div 
      className="absolute top-0 left-0 right-0 z-100 flex items-center justify-between px-6 pt-3.5 text-black font-semibold"
      style={{
        height: `${IPHONE_DIMENSIONS.statusBarHeight}px`,
        backgroundColor,
        fontSize: '17px',
        fontWeight: '600'
      }}
    >
      {/* 시간 */}
      <span className="min-w-[54px]">{time}</span>
      
      {/* Dynamic Island 공간 */}
      <div className="flex-1" />
      
      {/* 우측 상태 아이콘들 */}
      <div className="flex items-center gap-1.5">
        <Signal size={16} />
        <Wifi size={16} />
        <BatteryIcon level={batteryLevel} />
      </div>
    </div>
  );
};

export default StatusBar; 