import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Battery, Users, Download } from 'lucide-react';
import { Platform, DeviceSettings } from '../../types';
import PlatformSelectorTop from './PlatformSelectorTop';

interface UnifiedControlPanelProps {
  selectedPlatform: Platform;
  deviceSettings: DeviceSettings;
  onPlatformChange: (platform: Platform) => void;
  onTimeChange: (time: string) => void;
  onBatteryChange: (battery: number) => void;
  onProfileSettings: () => void;
  onDownload: () => void;
}

const UnifiedControlPanel: React.FC<UnifiedControlPanelProps> = ({
  selectedPlatform,
  deviceSettings,
  onPlatformChange,
  onTimeChange,
  onBatteryChange,
  onProfileSettings,
  onDownload
}) => {
  return (
    <div className="absolute -top-32 left-1/2 transform -translate-x-1/2 w-full max-w-md">
      {/* 플랫폼 선택기 */}
      <div className="mb-4">
        <PlatformSelectorTop
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
        />
      </div>
      
      {/* 디바이스 설정 및 액션 버튼 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/90 backdrop-blur-sm rounded-2xl p-3 shadow-lg flex items-center justify-between gap-3"
      >
        {/* 시간 설정 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
        >
          <Clock className="w-4 h-4 text-gray-600" />
          <input
            type="time"
            value={deviceSettings.time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-16 text-sm bg-transparent border-none outline-none text-gray-800"
          />
        </motion.div>
        
        {/* 배터리 설정 */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2"
        >
          <Battery className="w-4 h-4 text-gray-600" />
          <div className="flex items-center gap-1">
            <button
              onClick={() => onBatteryChange(Math.max(0, deviceSettings.batteryLevel - 10))}
              className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <span className="text-xs">-</span>
            </button>
            <span className="text-sm text-gray-800 min-w-[2rem] text-center">
              {deviceSettings.batteryLevel}%
            </span>
            <button
              onClick={() => onBatteryChange(Math.min(100, deviceSettings.batteryLevel + 10))}
              className="w-5 h-5 bg-gray-200 rounded flex items-center justify-center hover:bg-gray-300 transition-colors"
            >
              <span className="text-xs">+</span>
            </button>
          </div>
        </motion.div>
        
        {/* 프로필 설정 버튼 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onProfileSettings}
          className="w-10 h-10 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-colors shadow-md"
          title="프로필 설정"
        >
          <Users className="w-5 h-5" />
        </motion.button>
        
        {/* 다운로드 버튼 */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onDownload}
          className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors shadow-md"
          title="스크린샷 다운로드"
        >
          <Download className="w-5 h-5" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default UnifiedControlPanel; 