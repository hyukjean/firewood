import React from 'react';
import { ChevronLeft, Heart, Smile } from 'lucide-react';
import { ChatComponentProps } from '../../types';
import { COLORS } from '../../constants';
import Avatar from '../common/Avatar';
import InteractiveMessageInput from './InteractiveMessageInput';
import { groupMessagesForInstagram } from '../../utils/messageUtils';

const InstagramChat: React.FC<ChatComponentProps> = ({
  messages,
  senderName,
  receiverName,
  senderImage,
  receiverImage,
  onSendMessage
}) => {
  const messageGroups = groupMessagesForInstagram(messages);
  
  // 마지막 발신자 메시지 찾기 (읽음 표시용)
  const lastSenderMessage = messages.filter(msg => msg.sender).pop();

  return (
    <div className="h-full flex flex-col bg-white">
      {/* 인스타그램 상단바 */}
      <div 
        className="flex items-center px-4 py-3"
        style={{ 
          borderBottom: `1px solid ${COLORS.INSTAGRAM.BORDER}`,
          minHeight: '60px',
          fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
        }}
      >
        <ChevronLeft className="w-7 h-7 mr-3" />
        
        {/* 인스타그램 그라데이션 프로필 */}
        <div 
          className="w-9 h-9 rounded-full p-0.5 mr-3"
          style={{
            background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)'
          }}
        >
          <div className="w-full h-full rounded-full bg-white p-0.5">
            <Avatar 
              image={receiverImage} 
              name={receiverName} 
              size="sm"
              className="w-full h-full"
            />
          </div>
        </div>
        
        <div className="flex-1">
          <div 
            className="font-semibold text-base" 
            style={{ 
              color: COLORS.INSTAGRAM.TEXT_DARK,
              fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
            }}
          >
            {receiverName}
          </div>
          <div 
            className="text-sm" 
            style={{ 
              color: COLORS.INSTAGRAM.TEXT_GRAY,
              fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
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
              {/* 수신자 프로필 - 그룹의 첫 번째 메시지에만 표시 */}
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
              <div className="flex flex-col gap-1">
                {group.messages.map((msg, msgIndex) => (
                  <div key={msg.id} className="flex items-end gap-1">
                    <div
                      className="max-w-[236px] px-4 py-2 text-sm leading-tight break-words"
                      style={{
                        borderRadius: '22px',
                        backgroundColor: group.sender ? COLORS.INSTAGRAM.BLUE : COLORS.INSTAGRAM.GRAY,
                        color: group.sender ? 'white' : COLORS.INSTAGRAM.TEXT_DARK,
                        fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif',
                        fontSize: '14px',
                        fontWeight: '400'
                      }}
                    >
                      {msg.text}
                    </div>
                    
                    {/* 읽음 표시 - 마지막 발신자 메시지에만 표시 */}
                    {group.sender && msg.id === lastSenderMessage?.id && (
                      <span 
                        className="text-[10px] ml-1 mb-1" 
                        style={{ 
                          color: COLORS.INSTAGRAM.TEXT_GRAY,
                          fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
                        }}
                      >
                        읽음
                      </span>
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
        />
      ) : (
        <div 
          className="p-3 flex items-center gap-3"
          style={{ 
            borderTop: `1px solid ${COLORS.INSTAGRAM.BORDER}`,
            minHeight: '56px',
            fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
          }}
        >
          <button className="p-2">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: COLORS.INSTAGRAM.TEXT_DARK }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          
          <div 
            className="flex-1 rounded-[22px] px-4 py-2 flex items-center min-h-9"
            style={{ 
              backgroundColor: COLORS.INSTAGRAM.GRAY,
              fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
            }}
          >
            <input
              type="text"
              placeholder="메시지 보내기..."
              className="flex-1 bg-transparent outline-none text-sm"
              style={{ 
                color: COLORS.INSTAGRAM.TEXT_DARK,
                fontFamily: '"Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif'
              }}
              disabled
            />
            <Smile className="w-5 h-5 ml-2" style={{ color: COLORS.INSTAGRAM.TEXT_DARK }} />
          </div>
          
          <button className="p-2">
            <Heart className="w-6 h-6" style={{ color: COLORS.INSTAGRAM.TEXT_DARK }} />
          </button>
        </div>
      )}
    </div>
  );
};

export default InstagramChat; 