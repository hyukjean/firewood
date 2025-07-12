import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useFirewood } from './hooks/useFirewood';

// Layout Components
import AdaptiveLayout from './components/layout/AdaptiveLayout';
import NavigationBar from './components/layout/NavigationBar';

// Chat Components
import EditableChatPreview from './components/chat/EditableChatPreview';

// Control Components
import DesktopControlPanel from './components/controls/DesktopControlPanel';
import MobileControlPanel from './components/controls/MobileControlPanel';
import FloatingMessageControl from './components/controls/FloatingMessageControl';

const App: React.FC = () => {
  const {
    // 상태
    messages,
    selectedPlatform,
    deviceSettings,
    senderProfile,
    receiverProfile,
    isMobile,
    
    // 액션
    setSelectedPlatform,
    addDirectMessage,
    deleteMessage,
    updateMessage,
    resetToDefault,
    downloadScreenshot,
    updateSenderProfile,
    updateReceiverProfile,
    updateDeviceSettings,
    swapRoles
  } = useFirewood();

  const [isEditMode, setIsEditMode] = useState(false);
  const [isProfileEditing, setIsProfileEditing] = useState(false);
  const [showDateBar, setShowDateBar] = useState(true);
  const [currentDate, setCurrentDate] = useState('2025-01-12');
  const chatPreviewRef = useRef<HTMLDivElement>(null);

  // 메시지 전송 핸들러
  const handleSendMessage = (text: string, isSender: boolean) => {
    addDirectMessage(text, isSender);
    
    // 피드백 토스트
    toast.success(
      isSender ? '내 메시지가 추가되었습니다' : '상대방 메시지가 추가되었습니다',
      {
        duration: 1500,
        position: 'top-center'
      }
    );
  };

  // 스크린샷 다운로드 핸들러
  const handleDownload = async () => {
    await downloadScreenshot(chatPreviewRef);
    toast.success('스크린샷이 다운로드되었습니다', {
      duration: 2000,
      position: 'top-center'
    });
  };

  // 컨트롤 핸들러들
  const handleTimeChange = (time: string) => {
    updateDeviceSettings({ time });
    toast.success('시간이 변경되었습니다', { duration: 1000 });
  };

  const handleBatteryChange = (battery: number) => {
    updateDeviceSettings({ batteryLevel: battery });
    toast.success('배터리가 변경되었습니다', { duration: 1000 });
  };

  const handleDeleteMessage = (id: number) => {
    deleteMessage(id);
    toast.success('메시지가 삭제되었습니다', { duration: 1000 });
  };

  const handleEditMode = () => {
    setIsEditMode(!isEditMode);
    if (!isEditMode) {
      toast.success('수정 모드가 활성화되었습니다. 삭제할 메시지를 선택하세요.', {
        duration: 3000,
        position: 'top-center'
      });
    } else {
      toast.success('수정 모드가 종료되었습니다.', {
        duration: 2000,
        position: 'top-center'
      });
    }
  };

  const handleProfileSettings = () => {
    setIsProfileEditing(!isProfileEditing);
  };

  // 컨트롤 패널 컴포넌트 선택
  const controlPanelComponent = isMobile ? (
    <MobileControlPanel
      selectedPlatform={selectedPlatform}
      deviceSettings={deviceSettings}
      senderProfile={senderProfile}
      receiverProfile={receiverProfile}
      currentDate={currentDate}
      showDateBar={showDateBar}
      onPlatformChange={setSelectedPlatform}
      onTimeChange={handleTimeChange}
      onBatteryChange={handleBatteryChange}
      onDownload={handleDownload}
      onEditMode={handleEditMode}
      isEditMode={isEditMode}
      onSenderProfileUpdate={updateSenderProfile}
      onReceiverProfileUpdate={updateReceiverProfile}
      onDateChange={setCurrentDate}
      onToggleDateBar={setShowDateBar}
    />
  ) : (
    <DesktopControlPanel
      selectedPlatform={selectedPlatform}
      deviceSettings={deviceSettings}
      senderProfile={senderProfile}
      receiverProfile={receiverProfile}
      currentDate={currentDate}
      showDateBar={showDateBar}
      onPlatformChange={setSelectedPlatform}
      onTimeChange={handleTimeChange}
      onBatteryChange={handleBatteryChange}
      onDownload={handleDownload}
      onEditMode={handleEditMode}
      isEditMode={isEditMode}
      onSenderProfileUpdate={updateSenderProfile}
      onReceiverProfileUpdate={updateReceiverProfile}
      onDateChange={setCurrentDate}
      onToggleDateBar={setShowDateBar}
    />
  );

  // 채팅 미리보기 컴포넌트
  const chatPreviewComponent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={chatPreviewRef}
      className="relative"
    >
      <EditableChatPreview
        messages={messages}
        senderName={senderProfile.name}
        receiverName={receiverProfile.name}
        senderImage={senderProfile.image}
        receiverImage={receiverProfile.image}
        platform={selectedPlatform}
        deviceSettings={deviceSettings}
        isMobile={isMobile}
        onSendMessage={undefined} // 인터랙티브 요소 제거
        onDeleteMessage={handleDeleteMessage}
        onUpdateMessage={updateMessage}
        isEditMode={isEditMode}
        onRoleSwap={undefined} // 인터랙티브 요소 제거
        showDateBar={showDateBar}
        currentDate={currentDate}
      />
    </motion.div>
  );

  return (
    <>
      <Toaster />
      <NavigationBar />
      <AdaptiveLayout
        isMobile={isMobile}
        controlPanelComponent={controlPanelComponent}
        chatPreviewComponent={chatPreviewComponent}
      >
        {/* children은 사용하지 않지만 인터페이스 호환성을 위해 유지 */}
        <div />
      </AdaptiveLayout>
      
      {/* 완전히 분리된 플로팅 메시지 컨트롤 */}
      <FloatingMessageControl
        onSendMessage={handleSendMessage}
        onRoleSwap={swapRoles}
        platform={selectedPlatform}
      />
    </>
  );
};

export default App; 