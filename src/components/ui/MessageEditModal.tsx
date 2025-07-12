import React, { useState, useEffect } from 'react';
import { X, Save, Trash2 } from 'lucide-react';

interface MessageEditModalProps {
  isOpen: boolean;
  message: {
    id: number;
    text: string;
    time: string;
  } | null;
  onClose: () => void;
  onSave: (id: number, newText: string, newTime: string) => void;
  onDelete: (id: number) => void;
}

const MessageEditModal: React.FC<MessageEditModalProps> = ({
  isOpen,
  message,
  onClose,
  onSave,
  onDelete
}) => {
  const [text, setText] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    if (message) {
      setText(message.text);
      setTime(message.time);
    }
  }, [message]);

  const handleSave = () => {
    if (message) {
      onSave(message.id, text, time);
      onClose();
    }
  };

  const handleDelete = () => {
    if (message) {
      onDelete(message.id);
      onClose();
    }
  };

  if (!isOpen || !message) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">메시지 수정</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              메시지
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              시간
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="14:23"
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-6">
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
          >
            <Trash2 className="w-4 h-4" />
            삭제
          </button>
          
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition"
            >
              취소
            </button>
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              <Save className="w-4 h-4" />
              저장
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageEditModal; 