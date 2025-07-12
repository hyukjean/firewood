import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, RefreshCw } from 'lucide-react';

interface FloatingMessageControlProps {
  onSendMessage: (text: string, isSender: boolean) => void;
  onRoleSwap?: () => void;
  platform: 'kakaotalk' | 'instagram';
  className?: string;
}

const FloatingMessageControl: React.FC<FloatingMessageControlProps> = ({
  onSendMessage,
  onRoleSwap,
  platform,
  className = ''
}) => {
  const [message, setMessage] = useState('');
  const [isSender, setIsSender] = useState(true);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim(), isSender);
      setMessage('');
    }
  };

  const handleRoleSwitch = () => {
    if (onRoleSwap) {
      onRoleSwap();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-sm px-4 ${className}`}
    >
      {/* ME/YOU 토글 버튼 및 역할 전환 */}
      <div className="flex justify-center mb-2">
        <div className="bg-white/95 backdrop-blur-sm rounded-full p-1 shadow-lg flex items-center gap-2 border border-gray-200">
          <div className="flex">
            <button
              onClick={() => setIsSender(true)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                isSender 
                  ? 'bg-orange-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              ME
            </button>
            <button
              onClick={() => setIsSender(false)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                !isSender 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              YOU
            </button>
          </div>
          
          {/* 역할 전환 버튼 */}
          <div className="w-px h-6 bg-gray-300" />
          <button
            onClick={handleRoleSwitch}
            className="p-2 rounded-full transition-all text-gray-600 hover:text-gray-800 hover:bg-gray-100"
            title="역할 전환 (전체 대화의 ME ↔ YOU 바꾸기)"
          >
            <RefreshCw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 입력창 */}
      <div 
        className="flex items-center gap-2 px-3 py-2 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200 w-full"
      >
        <div 
          className={`flex-1 rounded-[18px] px-4 py-2.5 flex items-center min-w-0 ${
            platform === 'kakaotalk' 
              ? 'bg-gray-100' 
              : 'bg-gray-50'
          }`}
        >
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`${isSender ? 'ME' : 'YOU'} 메시지를 입력하세요...`}
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500 min-w-0"
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`p-2.5 rounded-full transition-all flex-shrink-0 ${
            message.trim()
              ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
          style={{ minWidth: '40px', minHeight: '40px' }}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export default FloatingMessageControl; 