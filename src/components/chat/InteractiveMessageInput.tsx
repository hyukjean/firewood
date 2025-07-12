import React, { useState } from 'react';
import { Send, RefreshCw } from 'lucide-react';

interface InteractiveMessageInputProps {
  onSendMessage: (text: string, isSender: boolean) => void;
  onRoleSwap?: () => void;
  platform: 'kakaotalk' | 'instagram';
  className?: string;
}

const InteractiveMessageInput: React.FC<InteractiveMessageInputProps> = ({
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

  const isKakaoTalk = platform === 'kakaotalk';

  return (
    <div className={`interactive-input screenshot-hide ${className}`} data-hide-in-screenshot="true">
      {/* ME/YOU 토글 버튼 및 역할 전환 */}
      <div className="flex justify-center mb-2">
        <div className="bg-white/90 backdrop-blur-sm rounded-full p-1 shadow-lg flex items-center gap-2">
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
        className={`flex items-center gap-2 px-3 py-2 ${
          isKakaoTalk 
            ? 'bg-white border-t border-gray-200' 
            : 'bg-white border-t border-gray-200'
        }`}
        style={{ minHeight: '56px' }}
      >
        <div 
          className={`flex-1 rounded-[22px] px-4 py-2.5 flex items-center ${
            isKakaoTalk 
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
            className="flex-1 bg-transparent outline-none text-sm text-gray-800 placeholder-gray-500"
          />
        </div>
        
        <button
          onClick={handleSend}
          disabled={!message.trim()}
          className={`p-2 rounded-full transition-all ${
            message.trim()
              ? 'bg-orange-500 text-white hover:bg-orange-600 shadow-lg'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default InteractiveMessageInput; 