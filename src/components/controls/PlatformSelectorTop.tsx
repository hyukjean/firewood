import React from 'react';
import { motion } from 'framer-motion';
import { Platform } from '../../types';

interface PlatformSelectorTopProps {
  selectedPlatform: Platform;
  onPlatformChange: (platform: Platform) => void;
  className?: string;
}

const PlatformSelectorTop: React.FC<PlatformSelectorTopProps> = ({
  selectedPlatform,
  onPlatformChange,
  className = ''
}) => {
  const platforms = [
    { 
      id: 'kakaotalk' as Platform, 
      name: '카카오톡',
      icon: null // 아이콘 없이 텍스트만
    },
    { 
      id: 'instagram' as Platform, 
      name: 'Instagram',
      icon: 'instagram' // SVG 아이콘 사용
    }
  ];

  const renderIcon = (platform: any) => {
    if (platform.icon === 'instagram') {
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex gap-3 bg-gray-50 rounded-3xl px-6 py-4 border border-gray-200 ${className}`}
      style={{
        boxShadow: `
          12px 12px 24px #d1d5db,
          -12px -12px 24px #ffffff
        `
      }}
    >
      {platforms.map((platform) => (
        <motion.button
          key={platform.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onPlatformChange(platform.id)}
          className={`px-6 py-3 rounded-2xl transition-all duration-200 flex items-center gap-3 ${
            selectedPlatform === platform.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-50 text-gray-600'
          }`}
          style={selectedPlatform === platform.id ? {
            boxShadow: `
              8px 8px 16px #3b82f680,
              -8px -8px 16px #60a5fa80
            `
          } : {
            boxShadow: `
              6px 6px 12px #d1d5db,
              -6px -6px 12px #ffffff
            `
          }}
        >
          {renderIcon(platform)}
          <span className="text-sm font-medium whitespace-nowrap">{platform.name}</span>
        </motion.button>
      ))}
    </motion.div>
  );
};

export default PlatformSelectorTop; 