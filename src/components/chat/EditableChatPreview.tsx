import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2 } from 'lucide-react';
import { ChatPreviewProps } from '../../types';
import SimplifiediPhoneWrapper from '../ui/SimplifiediPhoneWrapper';
import MessageEditModal from '../ui/MessageEditModal';

interface EditableChatPreviewProps extends ChatPreviewProps {
  isEditMode: boolean;
  onDeleteMessage?: (id: number) => void;
  onUpdateMessage?: (id: number, newText: string, newTime: string) => void;
  onRoleSwap?: () => void;
  showDateBar?: boolean;
  currentDate?: string;
}

const EditableChatPreview: React.FC<EditableChatPreviewProps> = ({
  messages,
  senderName,
  receiverName,
  senderImage,
  receiverImage,
  platform,
  deviceSettings,
  isMobile = false,
  onSendMessage,
  onDeleteMessage,
  onUpdateMessage,
  isEditMode,
  onRoleSwap,
  showDateBar = true,
  currentDate = '2025-01-12'
}) => {
  const [selectedMessages, setSelectedMessages] = useState<Set<number>>(new Set());
  const [editingMessage, setEditingMessage] = useState<any>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleMessageClick = (messageId: number) => {
    if (!isEditMode) return;
    
    // 메시지 편집 모달 열기
    const message = messages.find(msg => msg.id === messageId);
    if (message) {
      setEditingMessage(message);
      setShowEditModal(true);
    }
  };

  const handleEditSave = (messageId: number, newText: string, newTime: string) => {
    if (onUpdateMessage) {
      onUpdateMessage(messageId, newText, newTime);
    }
    setShowEditModal(false);
    setEditingMessage(null);
  };

  const handleEditDelete = (messageId: number) => {
    if (onDeleteMessage) {
      onDeleteMessage(messageId);
    }
    setShowEditModal(false);
    setEditingMessage(null);
  };

  const handleDeleteSelected = () => {
    if (!onDeleteMessage) return;
    
    selectedMessages.forEach(id => {
      onDeleteMessage(id);
    });
    setSelectedMessages(new Set());
  };

  return (
    <div className="relative">
      <div 
        className="relative"
        style={{
          transform: `scale(var(--iphone-scale))`,
          transformOrigin: 'center center'
        }}
      >
        <SimplifiediPhoneWrapper
          platform={platform}
          deviceTime={deviceSettings.time}
          batteryLevel={deviceSettings.batteryLevel}
          isMobile={isMobile}
          messages={messages}
          senderName={senderName}
          receiverName={receiverName}
          senderImage={senderImage}
          receiverImage={receiverImage}
          onSendMessage={onSendMessage}
          onRoleSwap={onRoleSwap}
          isEditMode={isEditMode}
          selectedMessages={selectedMessages}
          onMessageClick={handleMessageClick}
          showDateBar={showDateBar}
          currentDate={currentDate}
        />
      </div>
      
      {/* 수정 모드 시 선택된 메시지 삭제 버튼 - 간단한 플로팅 버튼 */}
      <AnimatePresence>
        {isEditMode && selectedMessages.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute left-1/2 transform -translate-x-1/2 z-50"
            style={{ 
              bottom: '-60px'
            }}
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDeleteSelected}
              className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              {selectedMessages.size}개 삭제
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 메시지 편집 모달 */}
      <MessageEditModal
        isOpen={showEditModal}
        message={editingMessage}
        onClose={() => {
          setShowEditModal(false);
          setEditingMessage(null);
        }}
        onSave={handleEditSave}
        onDelete={handleEditDelete}
        platform={platform}
      />
    </div>
  );
};

export default EditableChatPreview; 