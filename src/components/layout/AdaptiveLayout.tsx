import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface AdaptiveLayoutProps {
  children: React.ReactNode;
  isMobile: boolean;
  controlPanelComponent: React.ReactNode;
  chatPreviewComponent: React.ReactNode;
}

interface LayoutDimensions {
  containerWidth: number;
  containerHeight: number;
  iPhoneScale: number;
  iPhoneWidth: number;
  iPhoneHeight: number;
  availableSpace: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
  // 센터 포커싱 관련 추가
  isWideScreen: boolean;
  centerOffset: number;
  // 모바일 레이아웃 관련 추가
  mobileControlHeight: number;
  mobilePreviewTop: number;
}

const AdaptiveLayout: React.FC<AdaptiveLayoutProps> = ({ 
  isMobile, 
  controlPanelComponent, 
  chatPreviewComponent 
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const controlPanelRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<LayoutDimensions>({
    containerWidth: 0,
    containerHeight: 0,
    iPhoneScale: 1,
    iPhoneWidth: 393,
    iPhoneHeight: 852,
    availableSpace: { top: 0, bottom: 0, left: 0, right: 0 },
    isWideScreen: false,
    centerOffset: 0,
    mobileControlHeight: 0,
    mobilePreviewTop: 0
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      
      // iPhone 15 기본 크기
      const baseWidth = 393;
      const baseHeight = 852;
      
      let scale: number;
      let availableSpace: LayoutDimensions['availableSpace'];
      let isWideScreen = false;
      let centerOffset = 0;
      let mobileControlHeight = 0;
      let mobilePreviewTop = 0;

      if (isMobile) {
        // 모바일: 동적 높이 계산으로 겹침 방지
        const navBarHeight = 64; // 네비게이션 바 높이
        const padding = 20;
        
        // 컨트롤 패널 높이 동적 측정
        if (controlPanelRef.current) {
          mobileControlHeight = controlPanelRef.current.offsetHeight;
        } else {
          // 기본 추정 높이 (실제 측정 전)
          mobileControlHeight = 300;
        }
        
        // 미리보기 시작 위치 계산
        mobilePreviewTop = navBarHeight + mobileControlHeight + padding * 2;
        
        // 미리보기에 사용 가능한 높이
        const availableHeightForPreview = containerHeight - mobilePreviewTop - padding;
        
        // 스케일 계산
        const availableWidth = containerWidth - padding * 2;
        const scaleX = availableWidth / baseWidth;
        const scaleY = availableHeightForPreview / baseHeight;
        scale = Math.min(scaleX, scaleY, 0.95);
        
        availableSpace = {
          top: mobilePreviewTop,
          bottom: padding,
          left: padding,
          right: padding
        };
      } else {
        // 데스크톱: 좌우 분할 레이아웃 - 적당한 크기로 표시
        const controlPanelWidth = 480; // 컨트롤 패널 예상 너비
        const padding = 60;
        const availableWidthForPreview = containerWidth - controlPanelWidth - padding * 3;
        const availableHeightForPreview = containerHeight - 120; // 네비게이션 바 + 여백
        
        const scaleX = availableWidthForPreview / baseWidth;
        const scaleY = availableHeightForPreview / baseHeight;
        scale = Math.min(scaleX, scaleY, 1.0); // 0.8 → 1.0으로 증가
        
        // 와이드 스크린 판정 (1800px 이상)
        const WIDE_SCREEN_THRESHOLD = 1800;
        isWideScreen = containerWidth >= WIDE_SCREEN_THRESHOLD;
        
        if (isWideScreen) {
          // 와이드 스크린에서는 센터 포커싱
          const totalContentWidth = controlPanelWidth + 393 + padding * 3; // 컨트롤 패널 + iPhone + 여백
          const maxCenterOffset = (containerWidth - totalContentWidth) / 2;
          centerOffset = Math.max(0, maxCenterOffset);
          
          availableSpace = {
            top: 100,
            bottom: 60,
            left: centerOffset + controlPanelWidth + padding * 2,
            right: padding + centerOffset
          };
        } else {
          // 일반 데스크톱에서는 기존 로직
          availableSpace = {
            top: 100,
            bottom: 60,
            left: controlPanelWidth + padding * 2,
            right: padding
          };
        }
      }
      
      const scaledWidth = baseWidth * scale;
      const scaledHeight = baseHeight * scale;

      setDimensions({
        containerWidth,
        containerHeight,
        iPhoneScale: scale,
        iPhoneWidth: scaledWidth,
        iPhoneHeight: scaledHeight,
        availableSpace,
        isWideScreen,
        centerOffset,
        mobileControlHeight,
        mobilePreviewTop
      });
    };

    updateDimensions();
    
    // ResizeObserver로 컨트롤 패널 크기 변화 감지
    let resizeObserver: ResizeObserver;
    if (controlPanelRef.current) {
      resizeObserver = new ResizeObserver(updateDimensions);
      resizeObserver.observe(controlPanelRef.current);
    }
    
    window.addEventListener('resize', updateDimensions);
    return () => {
      window.removeEventListener('resize', updateDimensions);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [isMobile]);

  if (isMobile) {
    // 모바일: 완전히 분리된 세로 스크롤 레이아웃
    return (
      <div 
        ref={containerRef}
        className="min-h-screen bg-gray-50"
        style={{
          '--container-width': `${dimensions.containerWidth}px`,
          '--container-height': `${dimensions.containerHeight}px`,
          '--iphone-scale': dimensions.iPhoneScale,
          '--iphone-width': `${dimensions.iPhoneWidth}px`,
          '--iphone-height': `${dimensions.iPhoneHeight}px`,
        } as React.CSSProperties}
      >
        {/* 모바일 컨트롤 패널 - 절대 위치로 고정 */}
        <div 
          ref={controlPanelRef}
          className="fixed top-16 left-0 right-0 z-40 bg-gray-50 border-b border-gray-200"
          style={{
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="px-4 py-4">
            {controlPanelComponent}
          </div>
        </div>

        {/* 모바일 채팅 미리보기 - 동적 위치 */}
        <div 
          className="flex justify-center px-4 pb-8"
          style={{
            marginTop: `${dimensions.mobilePreviewTop}px`,
            minHeight: `calc(100vh - ${dimensions.mobilePreviewTop}px)`
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              transform: `scale(${dimensions.iPhoneScale})`,
              transformOrigin: 'center top'
            }}
          >
            {chatPreviewComponent}
          </motion.div>
        </div>

        {/* 모바일 디버그 정보 (개발 시에만 표시) */}
        {process.env.NODE_ENV === 'development' && (
          <div className="fixed bottom-4 left-4 bg-black text-white text-xs p-2 rounded z-50">
            <div>Control H: {dimensions.mobileControlHeight}px</div>
            <div>Preview Top: {dimensions.mobilePreviewTop}px</div>
            <div>Scale: {dimensions.iPhoneScale.toFixed(2)}</div>
          </div>
        )}
      </div>
    );
  }

  // 데스크톱: 좌우 분할 레이아웃
  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-gray-50 overflow-hidden"
      style={{
        '--container-width': `${dimensions.containerWidth}px`,
        '--container-height': `${dimensions.containerHeight}px`,
        '--iphone-scale': dimensions.iPhoneScale,
        '--iphone-width': `${dimensions.iPhoneWidth}px`,
        '--iphone-height': `${dimensions.iPhoneHeight}px`,
      } as React.CSSProperties}
    >
      {/* 데스크톱 컨트롤 패널 - 좌측 (와이드 스크린에서는 센터 포커싱) */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute top-16 bottom-0 w-[480px] overflow-y-auto bg-gray-50 border-r border-gray-200 z-40"
        style={{
          left: `${dimensions.centerOffset}px`,
          scrollbarWidth: 'thin',
          scrollbarColor: '#d1d5db #f9fafb'
        }}
      >
        <div className="p-6">
          {controlPanelComponent}
        </div>
      </motion.div>

      {/* 데스크톱 채팅 미리보기 - 우측 중앙 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-16 bottom-0 flex items-center justify-center"
        style={{
          left: `${dimensions.availableSpace.left}px`,
          right: `${dimensions.availableSpace.right}px`
        }}
      >
        <div 
          style={{
            transform: `scale(${dimensions.iPhoneScale})`,
            transformOrigin: 'center center'
          }}
        >
          {chatPreviewComponent}
        </div>
      </motion.div>

      {/* 와이드 스크린 인디케이터 (디버깅용, 필요시 제거) */}
      {dimensions.isWideScreen && (
        <div className="absolute top-20 right-4 bg-blue-500 text-white px-3 py-1 rounded-full text-xs z-50">
          와이드 스크린 모드 (센터 포커싱 활성)
        </div>
      )}
    </div>
  );
};

export default AdaptiveLayout; 