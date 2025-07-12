import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Battery, Users, Download, Edit3 } from 'lucide-react';
import { Platform, DeviceSettings } from '../../types';
import PlatformSelectorTop from './PlatformSelectorTop';

interface EnhancedControlPanelProps {
  selectedPlatform: Platform;
  deviceSettings: DeviceSettings;
  onPlatformChange: (platform: Platform) => void;
  onTimeChange: (time: string) => void;
  onBatteryChange: (battery: number) => void;
  onDownload: () => void;
  onEditMode: () => void;
  isEditMode: boolean;
}

const EnhancedControlPanel: React.FC<EnhancedControlPanelProps> = ({
  selectedPlatform,
  deviceSettings,
  onPlatformChange,
  onTimeChange,
  onBatteryChange,
  onDownload,
  onEditMode,
  isEditMode
}) => {
  const [batteryInput, setBatteryInput] = useState(deviceSettings.batteryLevel.toString());

  const handleBatteryInputChange = (value: string) => {
    setBatteryInput(value);
    const numValue = parseInt(value) || 0;
    const clampedValue = Math.min(100, Math.max(0, numValue));
    onBatteryChange(clampedValue);
  };

  const handleBatteryBlur = () => {
    const numValue = parseInt(batteryInput) || 0;
    const clampedValue = Math.min(100, Math.max(0, numValue));
    setBatteryInput(clampedValue.toString());
    onBatteryChange(clampedValue);
  };

  return (
    <div className="absolute left-1/2 transform -translate-x-1/2 w-full max-w-lg z-50"
         style={{ 
           top: 'calc(var(--center-y) - var(--iphone-height) / 2 - 180px)'
         }}>
      
      {/* 플랫폼 선택기 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex justify-center"
      >
        <PlatformSelectorTop
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
        />
      </motion.div>
      
      {/* 컨트롤 패널 - 뉴모피즘 스타일 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-3xl p-8 border border-gray-200"
        style={{
          boxShadow: `
            20px 20px 60px #d1d5db,
            -20px -20px 60px #ffffff,
            inset 0px 0px 0px rgba(255, 255, 255, 0.1)
          `
        }}
      >
        <div className="grid grid-cols-4 gap-6 items-center">
          
          {/* 시간 설정 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center gap-3 bg-gray-50 rounded-2xl p-5"
            style={{
              boxShadow: `
                8px 8px 16px #d1d5db,
                -8px -8px 16px #ffffff
              `
            }}
          >
            <Clock className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-500 font-medium">시간</span>
            <input
              type="time"
              value={deviceSettings.time}
              onChange={(e) => onTimeChange(e.target.value)}
              className="w-full text-center text-sm bg-transparent border-none outline-none text-gray-800 font-medium"
            />
          </motion.div>
          
          {/* 배터리 설정 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex flex-col items-center gap-3 bg-gray-50 rounded-2xl p-5"
            style={{
              boxShadow: `
                8px 8px 16px #d1d5db,
                -8px -8px 16px #ffffff
              `
            }}
          >
            <Battery className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-500 font-medium">배터리</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={batteryInput}
                onChange={(e) => handleBatteryInputChange(e.target.value)}
                onBlur={handleBatteryBlur}
                min="0"
                max="100"
                className="w-14 text-center text-sm bg-transparent border-none outline-none text-gray-800 font-medium"
              />
              <span className="text-xs text-gray-500">%</span>
            </div>
          </motion.div>
          
          {/* 수정 모드 버튼 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEditMode}
            className={`flex flex-col items-center gap-3 p-5 rounded-2xl transition-all ${
              isEditMode 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-50 text-gray-600'
            }`}
            style={isEditMode ? {
              boxShadow: `
                8px 8px 16px #dc262680,
                -8px -8px 16px #ef444480
              `
            } : {
              boxShadow: `
                8px 8px 16px #d1d5db,
                -8px -8px 16px #ffffff
              `
            }}
            title={isEditMode ? "수정 완료" : "메시지 수정"}
          >
            <Edit3 className="w-6 h-6" />
            <span className="text-xs font-medium">
              {isEditMode ? "완료" : "수정"}
            </span>
          </motion.button>
          
          {/* 다운로드 버튼 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDownload}
            className="flex flex-col items-center gap-3 bg-green-500 text-white p-5 rounded-2xl transition-all"
            style={{
              boxShadow: `
                8px 8px 16px #16a34a80,
                -8px -8px 16px #22c55e80
              `
            }}
            title="스크린샷 다운로드"
          >
            <Download className="w-6 h-6" />
            <span className="text-xs font-medium">저장</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default EnhancedControlPanel; 