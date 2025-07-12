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

  // 스크린샷 다운로드 (html-to-image 라이브러리 사용으로 개선)
  const downloadScreenshot = useCallback(async (chatPreviewRef: React.RefObject<HTMLDivElement>) => {
    if (!chatPreviewRef.current) return;
    
    try {
      // 채팅 컨텐츠 영역만 선택 (상단바 제외)
      const chatContentElement = chatPreviewRef.current.querySelector('[style*="top:"]') as HTMLElement;
      if (!chatContentElement) {
        console.error('채팅 컨텐츠 영역을 찾을 수 없습니다.');
        return;
      }

      // 모든 컨트롤과 편집 요소 숨기기
      const elementsToHide = [
        ...document.querySelectorAll('.interactive-input'),
        ...document.querySelectorAll('.inline-controls'),
        ...document.querySelectorAll('[data-hide-in-screenshot]'),
        ...chatPreviewRef.current.querySelectorAll('button'),
        ...document.querySelectorAll('[class*="edit"]'),
        ...document.querySelectorAll('[class*="control"]')
      ];
      
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = 'none';
      });

      // 폰트 로딩 대기
      await document.fonts.ready;

      // 한글 폰트 강제 로딩
      const koreanFonts = [
        'Pretendard',
        'Noto Sans KR',
        'Apple SD Gothic Neo', 
        'Malgun Gothic'
      ];

      await Promise.all(
        koreanFonts.map(font => 
          document.fonts.load(`400 16px "${font}"`)
        )
      );

      // SVG를 Canvas로 변환하여 렌더링 개선
      const svgElements = chatContentElement.querySelectorAll('svg');
      const svgReplacements: { element: SVGElement; replacement: HTMLCanvasElement }[] = [];

      for (const svg of svgElements) {
        if (svg instanceof SVGElement) {
          try {
            // SVG를 데이터 URL로 변환
            const svgData = new XMLSerializer().serializeToString(svg);
            const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
            const svgUrl = URL.createObjectURL(svgBlob);
            
            // 이미지로 로드
            const img = new Image();
            img.src = svgUrl;
            await new Promise((resolve, reject) => {
              img.onload = resolve;
              img.onerror = reject;
            });
            
            // Canvas로 변환
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d')!;
            const rect = svg.getBoundingClientRect();
            canvas.width = rect.width * 3; // 고해상도
            canvas.height = rect.height * 3;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;
            canvas.style.display = 'inline-block';
            canvas.style.verticalAlign = 'middle';
            
            ctx.scale(3, 3);
            ctx.drawImage(img, 0, 0, rect.width, rect.height);
            
            svgReplacements.push({ element: svg, replacement: canvas });
            URL.revokeObjectURL(svgUrl);
          } catch (e) {
            console.warn('SVG 변환 실패:', e);
          }
        }
      }

      // SVG를 Canvas로 임시 교체
      svgReplacements.forEach(({ element, replacement }) => {
        element.style.display = 'none';
        element.parentNode?.insertBefore(replacement, element);
      });

             // html-to-image로 고품질 스크린샷 생성
       const dataUrl = await htmlToImage.toPng(chatContentElement, {
         quality: 1.0,
         pixelRatio: 3,
         backgroundColor: selectedPlatform === 'kakaotalk' ? '#ABC1D1' : '#ffffff',
         style: {
           fontFamily: "'Pretendard', 'Noto Sans KR', 'Apple SD Gothic Neo', 'Malgun Gothic', -apple-system, BlinkMacSystemFont, sans-serif"
         } as any,
         filter: (node) => {
           // 편집 요소들 필터링
           if (node.classList) {
             return !node.classList.contains('interactive-input') &&
                    !node.classList.contains('inline-controls') &&
                    !node.classList.contains('edit-mode');
           }
           return true;
         }
       });

      // Canvas 교체 원복
      svgReplacements.forEach(({ element, replacement }) => {
        replacement.remove();
        element.style.display = '';
      });

      // 다운로드
      const link = document.createElement('a');
      link.download = `firewood-${selectedPlatform}-chat-${new Date().toISOString().slice(0, 10)}-UHD.png`;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // 숨겨진 요소들 다시 표시
      elementsToHide.forEach(el => {
        (el as HTMLElement).style.display = '';
      });
      
    } catch (error) {
      console.error('스크린샷 생성 실패:', error);
      
      // fallback: html2canvas 사용
      try {
        const chatContentElement = chatPreviewRef.current!.querySelector('[style*="top:"]') as HTMLElement;
        const canvas = await html2canvas(chatContentElement, {
          backgroundColor: selectedPlatform === 'kakaotalk' ? '#ABC1D1' : '#ffffff',
          scale: 2,
          useCORS: true,
          allowTaint: false
        });

        const image = canvas.toDataURL('image/png', 1.0);
        const link = document.createElement('a');
        link.download = `firewood-${selectedPlatform}-chat-fallback.png`;
        link.href = image;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (fallbackError) {
        console.error('Fallback 스크린샷도 실패:', fallbackError);
      }

      // 숨겨진 요소들 복구
      const elementsToShow = [
        ...document.querySelectorAll('.interactive-input'),
        ...document.querySelectorAll('.inline-controls'),
        ...document.querySelectorAll('[data-hide-in-screenshot]')
      ];
      
      elementsToShow.forEach(el => {
        (el as HTMLElement).style.display = '';
      });
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