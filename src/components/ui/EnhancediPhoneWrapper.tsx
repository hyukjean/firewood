import React from 'react';
import { Platform } from '../../types';
import { IPHONE_DIMENSIONS } from '../../constants';
import EnhancedKakaoTalkChat from '../chat/EnhancedKakaoTalkChat';
import EnhancedInstagramChat from '../chat/EnhancedInstagramChat';

interface EnhancediPhoneWrapperProps {
  children?: React.ReactNode;
  platform: Platform;
  deviceTime: string;
  batteryLevel: number;
  isMobile?: boolean;
  messages: any[];
  senderName: string;
  receiverName: string;
  senderImage: string | null;
  receiverImage: string | null;
  onSendMessage?: (text: string, isSender: boolean) => void;
  isEditMode?: boolean;
  selectedMessages?: Set<number>;
  onMessageClick?: (messageId: number) => void;
  showDateBar?: boolean;
  currentDate?: string;
}

const EnhancediPhoneWrapper: React.FC<EnhancediPhoneWrapperProps> = ({
  platform,
  deviceTime,
  batteryLevel,
  isMobile = false,
  messages,
  senderName,
  receiverName,
  senderImage,
  receiverImage,
  onSendMessage,
  isEditMode = false,
  selectedMessages = new Set(),
  onMessageClick,
  showDateBar = true,
  currentDate = '2025-01-12'
}) => {
  const renderChatComponent = () => {
    const commonProps = {
      messages,
      senderName,
      receiverName,
      senderImage,
      receiverImage,
      onSendMessage,
      isEditMode,
      selectedMessages,
      onMessageClick
    };

    switch (platform) {
      case 'kakaotalk':
        return (
          <EnhancedKakaoTalkChat
            {...commonProps}
            showDateBar={showDateBar}
            currentDate={currentDate}
          />
        );
      case 'instagram':
        return <EnhancedInstagramChat {...commonProps} />;
      default:
        return (
          <EnhancedKakaoTalkChat
            {...commonProps}
            showDateBar={showDateBar}
            currentDate={currentDate}
          />
        );
    }
  };

  return (
    <div className="relative">
      {/* iPhone 15 외곽 프레임 */}
      <div
        className="relative bg-black rounded-[40px] p-2 shadow-2xl"
        style={{
          width: `${IPHONE_DIMENSIONS.width}px`,
          height: `${IPHONE_DIMENSIONS.height}px`
        }}
      >
        {/* iPhone 15 스크린 - 상단바 없이 전체 화면 */}
        <div
          className="relative bg-white rounded-[32px] overflow-hidden"
          style={{
            width: `${IPHONE_DIMENSIONS.width - 16}px`,
            height: `${IPHONE_DIMENSIONS.height - 16}px`
          }}
        >
          {/* 채팅 컨텐츠 - 전체 화면 사용 */}
          <div className="absolute inset-0 overflow-hidden">
            {renderChatComponent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancediPhoneWrapper; 