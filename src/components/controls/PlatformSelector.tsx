import React from 'react';
import { RefreshCw } from 'lucide-react';
import { Platform, PlatformConfig } from '../../types';
import { PLATFORM_CONFIGS } from '../../constants';

interface PlatformSelectorProps {
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  onReset: () => void;
}

const PlatformSelector: React.FC<PlatformSelectorProps> = ({
  selectedPlatform,
  onPlatformChange,
  onReset
}) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-base md:text-lg font-bold text-gray-800">플랫폼</h3>
        <button
          onClick={onReset}
          className="flex items-center gap-1 px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          aria-label="설정 초기화"
        >
          <RefreshCw className="w-3 h-3" />
          초기화
        </button>
      </div>
      <div className="flex justify-center gap-2">
        {PLATFORM_CONFIGS.map((platform: PlatformConfig) => (
          <button
            key={platform.id}
            onClick={() => onPlatformChange(platform.id)}
            className={`px-6 py-2 rounded-xl transition-all duration-200 ${
              selectedPlatform === platform.id
                ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}
            aria-pressed={selectedPlatform === platform.id}
          >
            <span className="text-lg mr-1">{platform.icon}</span>
            <span className="text-sm font-medium">{platform.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlatformSelector; 