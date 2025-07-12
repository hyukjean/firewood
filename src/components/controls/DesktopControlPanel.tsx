import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Edit3, Calendar } from 'lucide-react';
import { Platform, DeviceSettings, Profile } from '../../types';
import PlatformSelectorTop from './PlatformSelectorTop';
import InlineProfileEditor from './InlineProfileEditor';
import KakaoDateManager from './KakaoDateManager';

interface DesktopControlPanelProps {
  selectedPlatform: Platform;
  deviceSettings: DeviceSettings;
  senderProfile: Profile;
  receiverProfile: Profile;
  currentDate: string;
  showDateBar: boolean;
  onPlatformChange: (platform: Platform) => void;
  onTimeChange: (time: string) => void;
  onBatteryChange: (battery: number) => void;
  onDownload: () => void;
  onEditMode: () => void;
  isEditMode: boolean;
  onSenderProfileUpdate: (updates: Partial<Profile>) => void;
  onReceiverProfileUpdate: (updates: Partial<Profile>) => void;
  onDateChange: (date: string) => void;
  onToggleDateBar: (show: boolean) => void;
}

const DesktopControlPanel: React.FC<DesktopControlPanelProps> = ({
  selectedPlatform,
  deviceSettings,
  senderProfile,
  receiverProfile,
  currentDate,
  showDateBar,
  onPlatformChange,
  onTimeChange,
  onBatteryChange,
  onDownload,
  onEditMode,
  isEditMode,
  onSenderProfileUpdate,
  onReceiverProfileUpdate,
  onDateChange,
  onToggleDateBar
}) => {
  const [showDateModule, setShowDateModule] = useState(false);

  return (
    <div className="space-y-6 max-w-md">
      {/* 플랫폼 선택기 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <PlatformSelectorTop
          selectedPlatform={selectedPlatform}
          onPlatformChange={onPlatformChange}
        />
      </motion.div>

      {/* 액션 버튼들 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-3xl p-6 border border-gray-200"
        style={{
          boxShadow: `
            12px 12px 24px #d1d5db,
            -12px -12px 24px #ffffff
          `
        }}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          액션
        </h3>
        
        <div className="grid grid-cols-2 gap-4">
          {/* 카카오톡 날짜 버튼 */}
          {selectedPlatform === 'kakaotalk' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDateModule(!showDateModule)}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
                showDateModule 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-50 text-gray-600'
              }`}
              style={showDateModule ? {
                boxShadow: `
                  8px 8px 16px #a855f780,
                  -8px -8px 16px #c084fc80
                `
              } : {
                boxShadow: `
                  8px 8px 16px #d1d5db,
                  -8px -8px 16px #ffffff
                `
              }}
            >
              <Calendar className="w-5 h-5" />
              <span className="text-xs font-medium">날짜 설정</span>
            </motion.button>
          )}
          
          {/* 수정 모드 버튼 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEditMode}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all ${
              isEditMode 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-50 text-gray-600'
            } ${selectedPlatform === 'instagram' ? 'col-span-2' : ''}`}
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
          >
            <Edit3 className="w-5 h-5" />
            <span className="text-xs font-medium">
              {isEditMode ? "수정 완료" : "메시지 수정"}
            </span>
          </motion.button>
          
          {/* 다운로드 버튼 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDownload}
            className="flex flex-col items-center gap-2 bg-green-500 text-white p-4 rounded-2xl transition-all col-span-full"
            style={{
              boxShadow: `
                8px 8px 16px #16a34a80,
                -8px -8px 16px #22c55e80
              `
            }}
          >
            <Download className="w-5 h-5" />
            <span className="text-xs font-medium">스크린샷 다운로드</span>
          </motion.button>
        </div>
      </motion.div>

      {/* 프로필 설정 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <InlineProfileEditor
          senderProfile={senderProfile}
          receiverProfile={receiverProfile}
          onSenderProfileUpdate={onSenderProfileUpdate}
          onReceiverProfileUpdate={onReceiverProfileUpdate}
        />
      </motion.div>

      {/* 카카오톡 날짜 모듈 */}
      <AnimatePresence>
        {showDateModule && selectedPlatform === 'kakaotalk' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <KakaoDateManager
              currentDate={currentDate}
              onDateChange={onDateChange}
              showDateBar={showDateBar}
              onToggleDateBar={onToggleDateBar}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DesktopControlPanel; 