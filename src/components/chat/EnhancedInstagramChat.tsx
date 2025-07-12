import React from 'react';
import { ChevronLeft, Heart, Smile } from 'lucide-react';
import { ChatComponentProps } from '../../types';
import { COLORS } from '../../constants';
import Avatar from '../common/Avatar';
import InteractiveMessageInput from './InteractiveMessageInput';
import { groupMessagesForInstagram, shouldShowReadReceipt } from '../../utils/messageUtils';

interface EnhancedInstagramChatProps extends ChatComponentProps {
  isEditMode?: boolean;
  selectedMessages?: Set<number>;
  onMessageClick?: (messageId: number) => void;
  onRoleSwap?: () => void;
}

const EnhancedInstagramChat: React.FC<EnhancedInstagramChatProps> = ({
  messages,
  senderName,
  receiverName,
  senderImage,
  receiverImage,
  onSendMessage,
  isEditMode = false,
  selectedMessages = new Set(),
  onMessageClick,
  onRoleSwap
}) => {
  const messageGroups = groupMessagesForInstagram(messages);

  return (
    <div className="h-full flex flex-col bg-white screenshot-optimized">
      {/* 인스타그램 상단바 */}
      <div 
        className="flex items-center px-4 py-3 screenshot-optimized"
        style={{ 
          borderBottom: `1px solid ${COLORS.INSTAGRAM.BORDER}`,
          minHeight: '60px',
          fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
        }}
      >
        <ChevronLeft className="w-7 h-7 mr-3" />
        
        {/* 인스타그램 그라데이션 프로필 - 중앙 정렬 */}
        <div 
          className="w-9 h-9 rounded-full p-0.5 mr-4 screenshot-optimized"
          style={{
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
          }}
        >
          <div className="w-full h-full rounded-full bg-white p-0.5">
            <Avatar 
              image={receiverImage} 
              name={receiverName} 
              size="sm"
              className="w-full h-full screenshot-optimized"
            />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-center">
          <div 
            className="font-semibold text-base screenshot-optimized" 
            style={{ 
              color: COLORS.INSTAGRAM.TEXT_DARK,
              fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
              fontSize: '15px',
              marginLeft: '-8px'
            }}
          >
            {receiverName}
          </div>
          <div 
            className="text-sm screenshot-optimized" 
            style={{ 
              color: COLORS.INSTAGRAM.TEXT_GRAY,
              fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
              fontSize: '13px',
              marginLeft: '-8px'
            }}
          >
            활동 중
          </div>
        </div>
        
        {/* 통화 및 비디오 버튼 */}
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </button>
        
        <button className="p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
      
      {/* 메시지 영역 */}
      <div className="flex-1 p-5 overflow-y-auto">
        <div className="flex flex-col gap-4">
          {messageGroups.map((group, groupIndex) => (
            <div 
              key={group.id} 
              className={`flex items-end gap-2 ${group.sender ? 'justify-end' : 'justify-start'}`}
            >
              {/* 수신자 프로필 - 그룹 로직에 따라 표시 */}
              {!group.sender && group.showProfile && (
                <Avatar 
                  image={receiverImage} 
                  name={receiverName} 
                  size="sm"
                  className="w-7 h-7 border border-gray-300"
                />
              )}
              {!group.sender && !group.showProfile && <div className="w-7" />}
              
              {/* 메시지 컨테이너 */}
              <div className={`flex flex-col gap-1 ${group.sender ? 'items-end' : 'items-start'}`}>
                {group.messages.map((msg, msgIndex) => (
                  <div key={msg.id} className={`flex flex-col ${group.sender ? 'items-end' : 'items-start'}`}>
                    <div
                      onClick={() => isEditMode && onMessageClick && onMessageClick(msg.id)}
                      className={`px-4 py-2 text-sm leading-tight break-words transition-all screenshot-optimized ${
                        isEditMode ? 'cursor-pointer hover:scale-105' : ''
                      } ${
                        selectedMessages.has(msg.id) ? 'ring-2 ring-red-500 ring-opacity-50' : ''
                      }`}
                      style={{
                        borderRadius: '22px',
                        backgroundColor: selectedMessages.has(msg.id)
                          ? '#ffebee'
                          : group.sender 
                            ? COLORS.INSTAGRAM.BLUE 
                            : COLORS.INSTAGRAM.GRAY,
                        color: selectedMessages.has(msg.id)
                          ? '#d32f2f'
                          : group.sender 
                            ? 'white' 
                            : COLORS.INSTAGRAM.TEXT_DARK,
                        boxShadow: selectedMessages.has(msg.id)
                          ? '0 0 0 2px #f44336'
                          : 'none',
                        maxWidth: '236px',
                        width: 'fit-content',
                        fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
                        fontSize: '14px',
                        fontWeight: '400',
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale',
                        textRendering: 'optimizeLegibility'
                      }}
                    >
                      {msg.text}
                    </div>
                    
                    {/* 읽음 표시 - 채팅바 하단 우측으로 이동 */}
                    {shouldShowReadReceipt(msg, messages) && (
                      <div className="flex justify-end mt-1">
                        <span 
                          className="text-[10px] screenshot-optimized" 
                          style={{ 
                            color: COLORS.INSTAGRAM.TEXT_GRAY,
                            fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
                            WebkitFontSmoothing: 'antialiased',
                            MozOsxFontSmoothing: 'grayscale'
                          }}
                        >
                          읽음
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* 하단 입력창 */}
      {onSendMessage ? (
        <InteractiveMessageInput
          onSendMessage={onSendMessage}
          platform="instagram"
          onRoleSwap={onRoleSwap}
        />
      ) : (
        <div 
          className="px-4 py-3 flex items-center gap-3 screenshot-optimized"
          style={{ 
            borderTop: `1px solid ${COLORS.INSTAGRAM.BORDER}`,
            minHeight: '60px',
            fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
          }}
        >
          {/* 카메라 버튼 */}
          <button className="p-2 flex-shrink-0">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: COLORS.INSTAGRAM.TEXT_DARK }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
          
          {/* 메시지 입력 영역 */}
          <div 
            className="flex-1 rounded-[20px] px-4 py-2 flex items-center screenshot-optimized"
            style={{ 
              backgroundColor: COLORS.INSTAGRAM.GRAY,
              minHeight: '36px',
              maxWidth: 'calc(100% - 120px)', // 좌우 버튼 공간 확보
              fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
            }}
          >
            <span
              className="flex-1 text-sm screenshot-optimized"
              style={{ 
                color: COLORS.INSTAGRAM.TEXT_GRAY,
                fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale'
              }}
            >
              메시지 보내기...
            </span>
            <Smile className="w-5 h-5 ml-2 flex-shrink-0" style={{ color: COLORS.INSTAGRAM.TEXT_DARK }} />
          </div>
          
          {/* 하트 버튼 */}
          <button className="p-2 flex-shrink-0">
            <Heart className="w-6 h-6" style={{ color: COLORS.INSTAGRAM.TEXT_DARK }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedInstagramChat; 