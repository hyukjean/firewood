import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Edit3, Calendar, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { Platform, DeviceSettings, Profile } from '../../types';
import PlatformSelectorTop from './PlatformSelectorTop';
import InlineProfileEditor from './InlineProfileEditor';
import KakaoDateManager from './KakaoDateManager';

interface MobileControlPanelProps {
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

const MobileControlPanel: React.FC<MobileControlPanelProps> = ({
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
  const [showProfileEditor, setShowProfileEditor] = useState(false);

  return (
    <div className="space-y-2">
      {/* 플랫폼 선택기 - 더 컴팩트 */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <div className="scale-90 origin-center">
          <PlatformSelectorTop
            selectedPlatform={selectedPlatform}
            onPlatformChange={onPlatformChange}
          />
        </div>
      </motion.div>
      
      {/* 초컴팩트 액션 버튼들 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-xl p-2 border border-gray-200"
        style={{
          boxShadow: `
            6px 6px 12px #d1d5db,
            -6px -6px 12px #ffffff
          `
        }}
      >
        {/* 액션 버튼들 - 더 작게 */}
        <div className={`grid gap-1 ${selectedPlatform === 'instagram' ? 'grid-cols-3 justify-items-center' : 'grid-cols-4'}`}>
          {/* 카카오톡 날짜 버튼 */}
          {selectedPlatform === 'kakaotalk' && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowDateModule(!showDateModule)}
              className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-all ${
                showDateModule 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-50 text-gray-600'
              }`}
              style={showDateModule ? {
                boxShadow: `
                  3px 3px 6px #a855f780,
                  -3px -3px 6px #c084fc80
                `
              } : {
                boxShadow: `
                  3px 3px 6px #d1d5db,
                  -3px -3px 6px #ffffff
                `
              }}
            >
              <Calendar className="w-2.5 h-2.5" />
              <span className="text-[10px] font-medium">날짜</span>
            </motion.button>
          )}
          
          {/* 프로필 설정 버튼 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProfileEditor(!showProfileEditor)}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-all ${
              showProfileEditor 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-50 text-gray-600'
            }`}
            style={showProfileEditor ? {
              boxShadow: `
                3px 3px 6px #3b82f680,
                -3px -3px 6px #60a5fa80
              `
            } : {
              boxShadow: `
                3px 3px 6px #d1d5db,
                -3px -3px 6px #ffffff
              `
            }}
          >
            <Users className="w-2.5 h-2.5" />
            <span className="text-[10px] font-medium">프로필</span>
          </motion.button>
          
          {/* 수정 모드 버튼 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onEditMode}
            className={`flex flex-col items-center gap-0.5 p-1.5 rounded-lg transition-all ${
              isEditMode 
                ? 'bg-red-500 text-white' 
                : 'bg-gray-50 text-gray-600'
            }`}
            style={isEditMode ? {
              boxShadow: `
                3px 3px 6px #dc262680,
                -3px -3px 6px #ef444480
              `
            } : {
              boxShadow: `
                3px 3px 6px #d1d5db,
                -3px -3px 6px #ffffff
              `
            }}
          >
            <Edit3 className="w-2.5 h-2.5" />
            <span className="text-[10px] font-medium">
              {isEditMode ? "완료" : "수정"}
            </span>
          </motion.button>
          
          {/* 다운로드 버튼 */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onDownload}
            className="flex flex-col items-center gap-0.5 bg-green-500 text-white p-1.5 rounded-lg transition-all"
            style={{
              boxShadow: `
                3px 3px 6px #16a34a80,
                -3px -3px 6px #22c55e80
              `
            }}
          >
            <Download className="w-2.5 h-2.5" />
            <span className="text-[10px] font-medium">저장</span>
          </motion.button>
        </div>
      </motion.div>

      {/* 확장 가능한 섹션들 - 더 컴팩트 */}
      <div className="space-y-2">
        {/* 프로필 편집기 */}
        <AnimatePresence>
          {showProfileEditor && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="scale-95 origin-center">
                <InlineProfileEditor
                  senderProfile={senderProfile}
                  receiverProfile={receiverProfile}
                  onSenderProfileUpdate={onSenderProfileUpdate}
                  onReceiverProfileUpdate={onReceiverProfileUpdate}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 카카오톡 날짜 모듈 */}
        <AnimatePresence>
          {showDateModule && selectedPlatform === 'kakaotalk' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="scale-95 origin-center">
                <KakaoDateManager
                  currentDate={currentDate}
                  onDateChange={onDateChange}
                  showDateBar={showDateBar}
                  onToggleDateBar={onToggleDateBar}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MobileControlPanel; 