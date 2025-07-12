import React from 'react';
import { X } from 'lucide-react';
import { Message } from '../../types';

interface MessageListProps {
  messages: Message[];
  onDeleteMessage: (id: number) => void;
}

const MessageList: React.FC<MessageListProps> = ({ messages, onDeleteMessage }) => {
  if (messages.length === 0) {
    return null;
  }

  return (
    <div className="mb-4 max-h-24 overflow-y-auto bg-gray-50 rounded-lg p-2">
      {messages.map((msg) => (
        <div 
          key={msg.id} 
          className="flex items-center justify-between py-1 px-2 hover:bg-gray-100 rounded group"
        >
          <span className={`text-xs ${msg.sender ? 'text-blue-600' : 'text-green-600'} truncate flex-1`}>
            {msg.text}
          </span>
          <button
            onClick={() => onDeleteMessage(msg.id)}
            className="opacity-0 group-hover:opacity-100 transition ml-2"
            aria-label="메시지 삭제"
          >
            <X className="w-3 h-3 text-red-500" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default MessageList; 