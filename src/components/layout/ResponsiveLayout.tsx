import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ResponsiveLayoutProps {
  children: React.ReactNode;
  isMobile: boolean;
}

interface LayoutDimensions {
  containerWidth: number;
  containerHeight: number;
  iPhoneScale: number;
  iPhoneWidth: number;
  iPhoneHeight: number;
  centerX: number;
  centerY: number;
}

const ResponsiveLayout: React.FC<ResponsiveLayoutProps> = ({ children, isMobile }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState<LayoutDimensions>({
    containerWidth: 0,
    containerHeight: 0,
    iPhoneScale: 1,
    iPhoneWidth: 393,
    iPhoneHeight: 852,
    centerX: 0,
    centerY: 0
  });

  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight = window.innerHeight;
      
      // iPhone 15 기본 크기
      const baseWidth = 393;
      const baseHeight = 852;
      
      // 스케일 계산 (여백 고려)
      const padding = isMobile ? 40 : 120;
      const availableWidth = containerWidth - padding;
      const availableHeight = containerHeight - padding;
      
      const scaleX = availableWidth / baseWidth;
      const scaleY = availableHeight / baseHeight;
      const scale = Math.min(scaleX, scaleY, isMobile ? 0.9 : 1);
      
      // 실제 iPhone 크기
      const scaledWidth = baseWidth * scale;
      const scaledHeight = baseHeight * scale;
      
      // 중심점 계산
      const centerX = containerWidth / 2;
      const centerY = containerHeight / 2;

      setDimensions({
        containerWidth,
        containerHeight,
        iPhoneScale: scale,
        iPhoneWidth: scaledWidth,
        iPhoneHeight: scaledHeight,
        centerX,
        centerY
      });
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [isMobile]);

  return (
    <div 
      ref={containerRef}
      className="relative w-full min-h-screen overflow-hidden"
      style={{
        '--container-width': `${dimensions.containerWidth}px`,
        '--container-height': `${dimensions.containerHeight}px`,
        '--iphone-scale': dimensions.iPhoneScale,
        '--iphone-width': `${dimensions.iPhoneWidth}px`,
        '--iphone-height': `${dimensions.iPhoneHeight}px`,
        '--center-x': `${dimensions.centerX}px`,
        '--center-y': `${dimensions.centerY}px`
      } as React.CSSProperties}
    >


      {/* 메인 컨텐츠 영역 */}
      <div className="absolute inset-0 flex items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default ResponsiveLayout; 