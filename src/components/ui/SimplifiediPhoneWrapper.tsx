import React from 'react';
import { Platform } from '../../types';
import { IPHONE_DIMENSIONS } from '../../constants';
import EnhancedKakaoTalkChat from '../chat/EnhancedKakaoTalkChat';
import EnhancedInstagramChat from '../chat/EnhancedInstagramChat';

interface SimplifiediPhoneWrapperProps {
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
  onRoleSwap?: () => void;
  isEditMode?: boolean;
  selectedMessages?: Set<number>;
  onMessageClick?: (messageId: number) => void;
  showDateBar?: boolean;
  currentDate?: string;
}

const SimplifiediPhoneWrapper: React.FC<SimplifiediPhoneWrapperProps> = ({
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
  onRoleSwap,
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
      onSendMessage: undefined, // 인터랙티브 요소 완전 제거
      onRoleSwap: undefined, // 인터랙티브 요소 완전 제거
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
      {/* 스크린샷 최적화: 깔끔한 네모 구조 - 프레임 없음 */}
      <div
        className="relative bg-white screenshot-optimized border border-gray-300"
        data-screenshot-target="iphone-wrapper"
        id="iphone-screenshot-target"
        style={{
          width: `${IPHONE_DIMENSIONS.width}px`,
          height: `${IPHONE_DIMENSIONS.height}px`,
        }}
      >
        {/* 채팅 컨텐츠 - 전체 화면 사용 */}
        <div className="absolute inset-0 overflow-hidden screenshot-optimized">
          {renderChatComponent()}
        </div>
      </div>
    </div>
  );
};

export default SimplifiediPhoneWrapper; 