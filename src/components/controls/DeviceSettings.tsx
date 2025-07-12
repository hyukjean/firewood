import React from 'react';
import { DeviceSettings as DeviceSettingsType } from '../../types';

interface DeviceSettingsProps {
  settings: DeviceSettingsType;
  onTimeChange: (time: string) => void;
  onBatteryChange: (battery: number) => void;
}

const DeviceSettings: React.FC<DeviceSettingsProps> = ({
  settings,
  onTimeChange,
  onBatteryChange
}) => {
  const handleBatteryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const clampedValue = Math.min(100, Math.max(0, value));
    onBatteryChange(clampedValue);
  };

  return (
    <div className="mb-4">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">디바이스</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="block text-xs text-gray-600 mb-1">시간</label>
          <input
            type="text"
            value={settings.time}
            onChange={(e) => onTimeChange(e.target.value)}
            className="w-full px-2 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            placeholder="5:12"
          />
        </div>
        <div>
          <label className="block text-xs text-gray-600 mb-1">배터리 (%)</label>
          <input
            type="number"
            value={settings.batteryLevel}
            onChange={handleBatteryChange}
            className="w-full px-2 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
            min="0"
            max="100"
            placeholder="34"
          />
        </div>
      </div>
    </div>
  );
};

export default DeviceSettings; 