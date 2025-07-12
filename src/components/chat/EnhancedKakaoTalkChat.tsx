import React from 'react';
import { ChevronLeft, Smile } from 'lucide-react';
import { ChatComponentProps } from '../../types';
import { COLORS } from '../../constants';
import Avatar from '../common/Avatar';
import InteractiveMessageInput from './InteractiveMessageInput';
import { groupMessagesForKakaoTalk, formatTime } from '../../utils/messageUtils';

interface EnhancedKakaoTalkChatProps extends ChatComponentProps {
  isEditMode?: boolean;
  selectedMessages?: Set<number>;
  onMessageClick?: (messageId: number) => void;
  onRoleSwap?: () => void;
  showDateBar?: boolean;
  currentDate?: string;
}

const EnhancedKakaoTalkChat: React.FC<EnhancedKakaoTalkChatProps> = ({
  messages,
  senderName,
  receiverName,
  senderImage,
  receiverImage,
  onSendMessage,
  isEditMode = false,
  selectedMessages = new Set(),
  onMessageClick,
  onRoleSwap,
  showDateBar = true,
  currentDate = '2025-01-12'
}) => {
  const messageGroups = groupMessagesForKakaoTalk(messages);

  const formatDisplayDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const dayNames = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
      const dayName = dayNames[date.getDay()];
      
      return `${year}년 ${month}월 ${day}일 ${dayName}`;
    } catch {
      return '2025년 1월 12일 일요일';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#ABC1D1] screenshot-optimized">
      {/* 카카오톡 상단바 */}
      <div 
        className="flex items-center px-4 py-3 bg-[#ABC1D1] screenshot-optimized"
        style={{ 
          borderBottom: '1px solid #8E8E93',
          minHeight: '60px',
          fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
        }}
      >
        <ChevronLeft className="w-6 h-6 mr-2" style={{ color: '#2c2c2c' }} />
        <span 
          className="flex-1 text-black font-semibold text-[17px] screenshot-optimized" 
          style={{ 
            fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
          }}
        >
          {receiverName}
        </span>
        <div className="flex gap-6" style={{ color: '#2c2c2c' }}>
          {/* 검색 아이콘 */}
          <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          {/* 메뉴 아이콘 */}
          <svg className="w-[22px] h-[22px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
          </svg>
        </div>
      </div>
      
      {/* 메시지 영역 */}
      <div className="flex-1 px-4 py-3 overflow-y-auto screenshot-optimized">
        {/* 날짜 표시 - showDateBar가 true일 때만 */}
        {showDateBar && messages.length > 0 && (
          <div className="text-center mb-6">
            <span 
              className="px-3 py-1.5 rounded-full text-[11px] font-medium screenshot-optimized"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                color: '#ffffff',
                fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                textRendering: 'optimizeLegibility'
              }}
            >
              {formatDisplayDate(currentDate)}
            </span>
          </div>
        )}
        
        {/* 메시지 그룹 렌더링 */}
        {messageGroups.map((group, groupIndex) => (
          <div key={group.id} className={`flex ${group.sender ? 'justify-end' : 'justify-start'} mb-3`}>
            {/* 프로필 이미지 */}
            {!group.sender && group.showProfile && (
              <div className="mr-2 mt-auto">
                <Avatar 
                  image={receiverImage} 
                  name={receiverName} 
                  size="sm"
                  className="w-8 h-8 rounded-full"
                />
              </div>
            )}
            {!group.sender && !group.showProfile && <div className="w-8 mr-2" />}
            
            {/* 메시지 컨테이너 */}
            <div className={`max-w-[75%] flex flex-col ${group.sender ? 'items-end' : 'items-start'}`}>
              {/* 이름 표시 */}
              {!group.sender && group.showProfile && (
                <div 
                  className="text-[10px] mb-1 ml-2 font-medium screenshot-optimized" 
                  style={{ 
                    color: '#000000',
                    fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale'
                  }}
                >
                  {receiverName}
                </div>
              )}
              
              {/* 메시지들 */}
              {group.messages.map((msg, msgIndex) => (
                <div key={msg.id} className={`flex items-end gap-1 ${msgIndex > 0 ? 'mt-1' : ''}`}>
                  {group.sender && group.showTime && msgIndex === group.messages.length - 1 && (
                    <span 
                      className="text-[10px] mb-1 screenshot-optimized" 
                      style={{ 
                        color: '#666666',
                        fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale'
                      }}
                    >
                      {formatTime(msg.time)}
                    </span>
                  )}
                  
                  <div
                    onClick={() => isEditMode && onMessageClick && onMessageClick(msg.id)}
                    className={`px-3 py-2 text-black text-sm leading-[1.4] break-words whitespace-pre-wrap transition-all screenshot-optimized ${
                      isEditMode ? 'cursor-pointer hover:scale-105' : ''
                    } ${
                      selectedMessages.has(msg.id) ? 'ring-2 ring-red-500 ring-opacity-50' : ''
                    }`}
                    style={{
                      backgroundColor: selectedMessages.has(msg.id) 
                        ? '#ffebee' 
                        : group.sender 
                          ? COLORS.KAKAO.YELLOW 
                          : 'white',
                      borderRadius: '18px',
                      borderTopRightRadius: group.sender ? '6px' : '18px',
                      borderTopLeftRadius: group.sender ? '18px' : '6px',
                      boxShadow: selectedMessages.has(msg.id)
                        ? '0 0 0 2px #f44336'
                        : '0 1px 2px rgba(0,0,0,0.1)',
                      minHeight: '18px',
                      fontSize: '14px',
                      fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
                      fontWeight: '400',
                      WebkitFontSmoothing: 'antialiased',
                      MozOsxFontSmoothing: 'grayscale',
                      textRendering: 'optimizeLegibility'
                    }}
                  >
                    {msg.text}
                  </div>
                  
                  {!group.sender && group.showTime && msgIndex === group.messages.length - 1 && (
                    <span 
                      className="text-[10px] mb-1 screenshot-optimized" 
                      style={{ 
                        color: '#666666',
                        fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
                        WebkitFontSmoothing: 'antialiased',
                        MozOsxFontSmoothing: 'grayscale'
                      }}
                    >
                      {formatTime(msg.time)}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* 하단 입력창 */}
      {onSendMessage ? (
        <InteractiveMessageInput
          onSendMessage={onSendMessage}
          platform="kakaotalk"
          onRoleSwap={onRoleSwap}
        />
      ) : (
        <div 
          className="bg-white px-3 py-2 flex items-center gap-2 screenshot-optimized"
          style={{ 
            minHeight: '56px',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif"
          }}
        >
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </button>
          
          <div 
            className="flex-1 bg-gray-100 rounded-[22px] px-4 py-2.5 text-[15px] text-gray-500 cursor-text hover:bg-gray-150 transition-colors screenshot-optimized"
            style={{ 
              backgroundColor: '#f2f2f7',
              minHeight: '36px',
              display: 'flex',
              alignItems: 'center',
              fontFamily: "'Noto Sans KR', 'Pretendard', 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif",
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale'
            }}
          >
            메시지를 입력하세요
          </div>
          
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Smile className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      )}
    </div>
  );
};

export default EnhancedKakaoTalkChat; 