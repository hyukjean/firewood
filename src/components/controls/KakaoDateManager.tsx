import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Plus, X } from 'lucide-react';

interface KakaoDateManagerProps {
  currentDate: string;
  onDateChange: (date: string) => void;
  showDateBar: boolean;
  onToggleDateBar: (show: boolean) => void;
}

const KakaoDateManager: React.FC<KakaoDateManagerProps> = ({
  currentDate,
  onDateChange,
  showDateBar,
  onToggleDateBar
}) => {
  const formatDisplayDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      const dayName = dayNames[date.getDay()];
      
      return `${year}년 ${month}월 ${day}일 ${dayName}`;
    } catch {
      return '2025년 1월 12일 일요일';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gray-50 rounded-3xl p-4 border border-gray-200"
      style={{
        boxShadow: `
          12px 12px 24px #d1d5db,
          -12px -12px 24px #ffffff
        `
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-600" />
          <span className="text-sm font-medium text-gray-700">날짜 표시</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onToggleDateBar(!showDateBar)}
          className={`w-8 h-8 rounded-2xl flex items-center justify-center transition-all ${
            showDateBar 
              ? 'bg-green-500 text-white' 
              : 'bg-gray-50 text-gray-600'
          }`}
          style={showDateBar ? {
            boxShadow: `
              6px 6px 12px #16a34a80,
              -6px -6px 12px #22c55e80
            `
          } : {
            boxShadow: `
              4px 4px 8px #d1d5db,
              -4px -4px 8px #ffffff
            `
          }}
          title={showDateBar ? "날짜 숨기기" : "날짜 표시"}
        >
          {showDateBar ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
        </motion.button>
      </div>

      {showDateBar && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="space-y-3"
        >
          <input
            type="date"
            value={currentDate}
            onChange={(e) => onDateChange(e.target.value)}
            className="w-full px-4 py-3 text-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-50"
            style={{
              boxShadow: `
                4px 4px 8px #d1d5db,
                -4px -4px 8px #ffffff
              `
            }}
          />
          <div className="text-center">
            <p className="text-xs text-gray-600">
              {formatDisplayDate(currentDate)}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default KakaoDateManager; 