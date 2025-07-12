import { useState, useEffect, useCallback } from 'react';
import html2canvas from 'html2canvas';
import domtoimage from 'dom-to-image';
import * as htmlToImage from 'html-to-image';
import { Message, Platform, DeviceSettings, Profile } from '../types';
import { DEFAULT_MESSAGES, DEFAULT_PROFILES, DEFAULT_DEVICE_SETTINGS } from '../constants';

export const useFirewood = () => {
  // 상태 관리
  const [messages, setMessages] = useState<Message[]>(DEFAULT_MESSAGES);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform>('kakaotalk');
  const [deviceSettings, setDeviceSettings] = useState<DeviceSettings>(DEFAULT_DEVICE_SETTINGS);
  const [senderProfile, setSenderProfile] = useState<Profile>(DEFAULT_PROFILES.sender);
  const [receiverProfile, setReceiverProfile] = useState<Profile>(DEFAULT_PROFILES.receiver);
  const [senderMessage, setSenderMessage] = useState('');
  const [receiverMessage, setReceiverMessage] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // 모바일 감지
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 메시지 추가
  const addMessage = useCallback((isSender: boolean) => {
    const messageText = isSender ? senderMessage : receiverMessage;
    if (messageText.trim()) {
      const now = new Date();
      const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
      
      const newMessage: Message = {
        id: Date.now(),
        text: messageText,
        sender: isSender,
        time: time
      };
      
      setMessages(prev => [...prev, newMessage]);
      
      if (isSender) {
        setSenderMessage('');
      } else {
        setReceiverMessage('');
      }
    }
  }, [senderMessage, receiverMessage]);

  // 메시지 삭제
  const deleteMessage = useCallback((id: number) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  // 직접 메시지 추가 (인터랙티브 입력용)
  const addDirectMessage = useCallback((text: string, isSender: boolean) => {
    const now = new Date();
    const time = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    const newMessage: Message = {
      id: Date.now(),
      text,
      sender: isSender,
      time
    };
    
    setMessages(prev => [...prev, newMessage]);
  }, []);

  // 설정 초기화
  const resetToDefault = useCallback(() => {
    setMessages(DEFAULT_MESSAGES);
    setSenderProfile(DEFAULT_PROFILES.sender);
    setReceiverProfile(DEFAULT_PROFILES.receiver);
    setDeviceSettings(DEFAULT_DEVICE_SETTINGS);
    setSenderMessage('');
    setReceiverMessage('');
  }, []);

  // 스크린샷 다운로드 (간단하고 안정적인 방법)
  const downloadScreenshot = useCallback(async (chatPreviewRef: React.RefObject<HTMLDivElement>) => {
    if (!chatPreviewRef.current) return;
    
    setIsDownloading(true);
    
    try {
      // 채팅 미리보기 전체를 캡처 대상으로 사용
      const chatContentElement = chatPreviewRef.current as HTMLElement;
      
      // 편집 요소들만 숨기기
      const elementsToHide = [
        ...document.querySelectorAll('.interactive-input'),
        ...document.querySelectorAll('.inline-controls'),
        ...document.querySelectorAll('[data-hide-in-screenshot]'),
        ...document.querySelectorAll('.edit-mode')
      ];
      
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // 이미지 로딩 완료 대기 - 더 강화된 로직
      const imageElements = chatContentElement.querySelectorAll('img');
      if (imageElements.length > 0) {
        console.log(`Waiting for ${imageElements.length} images to load...`);
        
        await Promise.all(
          Array.from(imageElements).map((img) => {
            return new Promise<void>((resolve) => {
              const imgElement = img as HTMLImageElement;
              
              // 이미 로드된 이미지인지 확인
              if (imgElement.complete && imgElement.naturalWidth > 0 && imgElement.naturalHeight > 0) {
                console.log('Image already loaded:', imgElement.src);
                resolve();
                return;
              }
              
              const onLoad = () => {
                console.log('Image loaded successfully:', imgElement.src);
                imgElement.removeEventListener('load', onLoad);
                imgElement.removeEventListener('error', onError);
                resolve();
              };
              
              const onError = () => {
                console.log('Image failed to load:', imgElement.src);
                imgElement.removeEventListener('load', onLoad);
                imgElement.removeEventListener('error', onError);
                resolve();
              };
              
              imgElement.addEventListener('load', onLoad);
              imgElement.addEventListener('error', onError);
              
              // 타임아웃 설정 (5초)
              setTimeout(() => {
                console.log('Image load timeout:', imgElement.src);
                imgElement.removeEventListener('load', onLoad);
                imgElement.removeEventListener('error', onError);
                resolve();
              }, 5000);
            });
          })
        );
        
        // 추가 렌더링 대기 시간 증가
        await new Promise(resolve => setTimeout(resolve, 500));
      }

      // html-to-image로 스크린샷 생성
      console.log('Generating screenshot...');
      const dataUrl = await htmlToImage.toPng(chatContentElement, {
        quality: 1.0,
        pixelRatio: 3,
        backgroundColor: selectedPlatform === 'kakaotalk' ? '#ABC1D1' : '#ffffff',
        style: {
          fontFamily: "'Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, BlinkMacSystemFont, sans-serif"
        } as any,
        filter: (node) => {
          // 편집 요소들만 필터링 (상단/하단 UI는 보존)
          if (node.classList) {
            return !node.classList.contains('interactive-input') &&
                   !node.classList.contains('inline-controls') &&
                   !node.classList.contains('edit-mode');
          }
          return true;
        }
      });

      // 다운로드
      const link = document.createElement('a');
      link.download = `firewood-${selectedPlatform}-chat-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log('Screenshot downloaded successfully');
      
    } catch (error) {
      console.error('스크린샷 생성 실패:', error);
      
      // fallback: 더 간단한 방법
      try {
        const chatContentElement = chatPreviewRef.current as HTMLElement;
        const image = await htmlToImage.toPng(chatContentElement, {
          quality: 0.8,
          pixelRatio: 2,
          backgroundColor: selectedPlatform === 'kakaotalk' ? '#ABC1D1' : '#ffffff'
        });

        const link = document.createElement('a');
        link.download = `firewood-${selectedPlatform}-chat-fallback.png`;
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        console.log('Fallback screenshot downloaded');
      } catch (fallbackError) {
        console.error('Fallback 스크린샷도 실패:', fallbackError);
      }
    } finally {
      // 숨겨진 요소들 복구
      const elementsToShow = [
        ...document.querySelectorAll('.interactive-input'),
        ...document.querySelectorAll('.inline-controls'),
        ...document.querySelectorAll('[data-hide-in-screenshot]'),
        ...document.querySelectorAll('.edit-mode')
      ];
      
      elementsToShow.forEach(el => {
        (el as HTMLElement).style.display = '';
      });
      
      setIsDownloading(false);
    }
  }, [selectedPlatform]);

  // 프로필 업데이트 함수들
  const updateSenderProfile = useCallback((updates: Partial<Profile>) => {
    setSenderProfile(prev => ({ ...prev, ...updates }));
  }, []);

  const updateReceiverProfile = useCallback((updates: Partial<Profile>) => {
    setReceiverProfile(prev => ({ ...prev, ...updates }));
  }, []);

  // 디바이스 설정 업데이트 함수들
  const updateDeviceSettings = useCallback((updates: Partial<DeviceSettings>) => {
    setDeviceSettings(prev => ({ ...prev, ...updates }));
  }, []);

  // 역할 전환 함수 (메시지와 프로필 모두 교체)
  const swapRoles = useCallback(() => {
    // 모든 메시지의 sender 값을 반전
    setMessages(prev => prev.map(msg => ({
      ...msg,
      sender: !msg.sender
    })));

    // 프로필 교체
    const tempSenderProfile = senderProfile;
    setSenderProfile(receiverProfile);
    setReceiverProfile(tempSenderProfile);
  }, [senderProfile, receiverProfile]);

  return {
    // 상태
    messages,
    selectedPlatform,
    deviceSettings,
    senderProfile,
    receiverProfile,
    senderMessage,
    receiverMessage,
    isMobile,
    isDownloading,
    
    // 액션
    setSelectedPlatform,
    setSenderMessage,
    setReceiverMessage,
    addMessage,
    addDirectMessage,
    deleteMessage,
    resetToDefault,
    downloadScreenshot,
    updateSenderProfile,
    updateReceiverProfile,
    updateDeviceSettings,
    swapRoles
  };
}; 