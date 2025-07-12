import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ChatPreviewProps } from '../../types';
import IPhoneWrapper from '../ui/iPhoneWrapper';
import KakaoTalkChat from './KakaoTalkChat';
import InstagramChat from './InstagramChat';

const ChatPreview: React.FC<ChatPreviewProps> = ({
  messages,
  senderName,
  receiverName,
  senderImage,
  receiverImage,
  platform,
  deviceSettings,
  isMobile = false,
  onSendMessage,
  onDeleteMessage
}) => {
  const renderChatComponent = () => {
    const chatProps = {
      messages,
      senderName,
      receiverName,
      senderImage,
      receiverImage,
      onSendMessage
    };

    switch (platform) {
      case 'kakaotalk':
        return <KakaoTalkChat {...chatProps} />;
      case 'instagram':
        return <InstagramChat {...chatProps} />;
      default:
        return <KakaoTalkChat {...chatProps} />;
    }
  };

  return (
    <div className="relative">
      <IPhoneWrapper
        platform={platform}
        deviceTime={deviceSettings.time}
        batteryLevel={deviceSettings.batteryLevel}
        isMobile={isMobile}
      >
        {renderChatComponent()}
      </IPhoneWrapper>
      
      {/* 메시지 삭제 버튼들 - iPhone 프레임 우측 외부 */}
      {onDeleteMessage && messages.length > 0 && (
        <div className="absolute right-0 top-20 flex flex-col gap-2 transform translate-x-full pl-4">
          {messages.map((message, index) => (
            <motion.button
              key={`delete-${message.id}`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onDeleteMessage(message.id)}
              className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-lg"
              style={{
                marginTop: index === 0 ? '60px' : '10px' // 첫 번째 메시지는 상단 여백 추가
              }}
              title={`메시지 ${index + 1} 삭제`}
            >
              <X className="w-3 h-3" />
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ChatPreview; 