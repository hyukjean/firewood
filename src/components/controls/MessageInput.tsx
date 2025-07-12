import React from 'react';
import { Send } from 'lucide-react';

interface MessageInputProps {
  senderMessage: string;
  receiverMessage: string;
  onSenderMessageChange: (message: string) => void;
  onReceiverMessageChange: (message: string) => void;
  onSenderMessageSend: () => void;
  onReceiverMessageSend: () => void;
  isMobile?: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  senderMessage,
  receiverMessage,
  onSenderMessageChange,
  onReceiverMessageChange,
  onSenderMessageSend,
  onReceiverMessageSend,
  isMobile = false
}) => {
  const handleKeyPress = (e: React.KeyboardEvent, onSend: () => void) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div className="mb-4">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">메시지</h3>
      <div className={`${isMobile ? 'space-y-2' : 'grid grid-cols-2 gap-2'}`}>
        <div className="bg-blue-50 p-2 rounded-xl">
          <div className="flex gap-1">
            <input
              type="text"
              value={senderMessage}
              onChange={(e) => onSenderMessageChange(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, onSenderMessageSend)}
              placeholder="내 메시지"
              className="flex-1 px-2 py-1.5 text-sm bg-white border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={onSenderMessageSend}
              className="px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              aria-label="내 메시지 전송"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="bg-green-50 p-2 rounded-xl">
          <div className="flex gap-1">
            <input
              type="text"
              value={receiverMessage}
              onChange={(e) => onReceiverMessageChange(e.target.value)}
              onKeyPress={(e) => handleKeyPress(e, onReceiverMessageSend)}
              placeholder="상대방 메시지"
              className="flex-1 px-2 py-1.5 text-sm bg-white border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={onReceiverMessageSend}
              className="px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              aria-label="상대방 메시지 전송"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageInput; 