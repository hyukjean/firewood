import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const NavigationBar: React.FC = () => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-50 border-b border-gray-200"
      style={{
        boxShadow: `
          0 8px 16px rgba(209, 213, 219, 0.3),
          0 -8px 16px rgba(255, 255, 255, 0.8)
        `
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 및 브랜드 */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3"
          >
            <div className="text-2xl">🔥</div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">장작</h1>
              <p className="text-xs text-gray-600 hidden sm:block">커뮤니티를 활활 태울 장작을 제작해보세요</p>
            </div>
          </motion.div>

          {/* 우측 영역 - 이메일 표시 */}
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-gray-600"
            >
              je0ngjin@icloud.com
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default NavigationBar; 