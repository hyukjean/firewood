import React, { useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Camera, X, Users, Check } from 'lucide-react';
import { Profile } from '../../types';
import Avatar from '../common/Avatar';

interface InlineProfileEditorProps {
  senderProfile: Profile;
  receiverProfile: Profile;
  onSenderProfileUpdate: (updates: Partial<Profile>) => void;
  onReceiverProfileUpdate: (updates: Partial<Profile>) => void;
  className?: string;
}

// 별도 컴포넌트로 분리하여 메모이제이션 문제 해결
const ProfileEditCard: React.FC<{
  profile: Profile;
  profileType: 'sender' | 'receiver';
  title: string;
  isEditing: boolean;
  tempName: string;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>, profileType: 'sender' | 'receiver') => void;
  onNameEdit: (profileType: 'sender' | 'receiver', isEditing: boolean) => void;
  onNameSave: (profileType: 'sender' | 'receiver') => void;
  onKeyPress: (e: React.KeyboardEvent, profileType: 'sender' | 'receiver') => void;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>, profileType: 'sender' | 'receiver') => void;
  onSenderProfileUpdate: (updates: Partial<Profile>) => void;
  onReceiverProfileUpdate: (updates: Partial<Profile>) => void;
}> = ({ 
  profile, 
  profileType, 
  title, 
  isEditing, 
  tempName,
  onImageUpload,
  onNameEdit,
  onNameSave,
  onKeyPress,
  onInputChange,
  onSenderProfileUpdate,
  onReceiverProfileUpdate
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gray-50 rounded-2xl p-4 border border-gray-200 flex-1"
      style={{
        boxShadow: `
          8px 8px 16px #d1d5db,
          -8px -8px 16px #ffffff
        `
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">{title}</span>
          <div className={`w-2 h-2 rounded-full ${
            profileType === 'sender' ? 'bg-blue-500' : 'bg-green-500'
          }`} />
        </div>
        
        <div className="flex items-center gap-3">
          {/* 프로필 이미지 */}
          <div className="relative">
            <div 
              className="w-10 h-10 rounded-xl overflow-hidden"
              style={{
                boxShadow: `
                  4px 4px 8px #d1d5db,
                  -4px -4px 8px #ffffff
                `
              }}
            >
              <Avatar image={profile.image} name={profile.name} size="sm" className="w-full h-full" />
            </div>
            <label 
              className="absolute -bottom-1 -right-1 w-5 h-5 bg-gray-50 rounded-full flex items-center justify-center cursor-pointer transition-all border border-gray-200"
              style={{
                boxShadow: `
                  3px 3px 6px #d1d5db,
                  -3px -3px 6px #ffffff
                `
              }}
            >
              <Camera className="w-2.5 h-2.5 text-gray-600" />
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={(e) => onImageUpload(e, profileType)}
              />
            </label>
          </div>
          
          {/* 이름 편집 */}
          <div className="flex-1 min-w-0 flex items-center gap-2">
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => onInputChange(e, profileType)}
                  onKeyDown={(e) => onKeyPress(e, profileType)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all"
                  style={{
                    boxShadow: `
                      4px 4px 8px #d1d5db,
                      -4px -4px 8px #ffffff
                    `,
                    maxWidth: 'calc(100% - 40px)' // 저장 버튼 공간 확보
                  }}
                  placeholder={profileType === 'sender' ? '내 이름' : '상대방 이름'}
                  autoFocus
                  maxLength={20}
                />
                <button
                  onClick={() => onNameSave(profileType)}
                  className="w-8 h-8 bg-green-500 text-white rounded-xl flex items-center justify-center hover:bg-green-600 transition-all flex-shrink-0"
                  style={{
                    boxShadow: `
                      4px 4px 8px #16a34a80,
                      -4px -4px 8px #22c55e80
                    `
                  }}
                  title="저장"
                >
                  <Check className="w-3 h-3" />
                </button>
              </>
            ) : (
              <>
                <div
                  onClick={() => onNameEdit(profileType, true)}
                  className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 transition-all"
                  style={{
                    boxShadow: `
                      4px 4px 8px #d1d5db,
                      -4px -4px 8px #ffffff
                    `
                  }}
                >
                  {profile.name || (profileType === 'sender' ? '내 이름' : '상대방 이름')}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const InlineProfileEditor: React.FC<InlineProfileEditorProps> = ({
  senderProfile,
  receiverProfile,
  onSenderProfileUpdate,
  onReceiverProfileUpdate,
  className = ''
}) => {
  const [editingSender, setEditingSender] = useState(false);
  const [editingReceiver, setEditingReceiver] = useState(false);
  const [tempSenderName, setTempSenderName] = useState(senderProfile.name);
  const [tempReceiverName, setTempReceiverName] = useState(receiverProfile.name);

  // 프로필 이름이 변경될 때만 tempName 업데이트
  React.useEffect(() => {
    setTempSenderName(senderProfile.name);
  }, [senderProfile.name]);

  React.useEffect(() => {
    setTempReceiverName(receiverProfile.name);
  }, [receiverProfile.name]);

  const handleImageUpload = useCallback((
    e: React.ChangeEvent<HTMLInputElement>,
    profileType: 'sender' | 'receiver'
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        if (profileType === 'sender') {
          onSenderProfileUpdate({ image: imageUrl });
        } else {
          onReceiverProfileUpdate({ image: imageUrl });
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onSenderProfileUpdate, onReceiverProfileUpdate]);

  const handleNameEdit = useCallback((profileType: 'sender' | 'receiver', isEditing: boolean) => {
    if (profileType === 'sender') {
      setEditingSender(isEditing);
      if (!isEditing) {
        // 편집 모드 종료 시 원래 값으로 복원
        setTempSenderName(senderProfile.name);
      }
    } else {
      setEditingReceiver(isEditing);
      if (!isEditing) {
        // 편집 모드 종료 시 원래 값으로 복원
        setTempReceiverName(receiverProfile.name);
      }
    }
  }, [senderProfile.name, receiverProfile.name]);

  const handleNameSave = useCallback((profileType: 'sender' | 'receiver') => {
    if (profileType === 'sender') {
      if (tempSenderName.trim()) {
        onSenderProfileUpdate({ name: tempSenderName.trim() });
      }
      setEditingSender(false);
    } else {
      if (tempReceiverName.trim()) {
        onReceiverProfileUpdate({ name: tempReceiverName.trim() });
      }
      setEditingReceiver(false);
    }
  }, [tempSenderName, tempReceiverName, onSenderProfileUpdate, onReceiverProfileUpdate]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent, profileType: 'sender' | 'receiver') => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleNameSave(profileType);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleNameEdit(profileType, false);
    }
  }, [handleNameSave, handleNameEdit]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, profileType: 'sender' | 'receiver') => {
    const value = e.target.value;
    if (profileType === 'sender') {
      setTempSenderName(value);
    } else {
      setTempReceiverName(value);
    }
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-gray-50 rounded-3xl p-6 border border-gray-200 ${className}`}
      style={{
        boxShadow: `
          12px 12px 24px #d1d5db,
          -12px -12px 24px #ffffff
        `
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <Users className="w-5 h-5 text-gray-600" />
        <span className="text-sm font-medium text-gray-700">프로필 설정</span>
      </div>

      {/* 프로필 편집 카드들 - 세로 배치 */}
      <div className="space-y-3">
        <ProfileEditCard
          profile={receiverProfile}
          profileType="receiver"
          title="상대방"
          isEditing={editingReceiver}
          tempName={tempReceiverName}
          onImageUpload={handleImageUpload}
          onNameEdit={handleNameEdit}
          onNameSave={handleNameSave}
          onKeyPress={handleKeyPress}
          onInputChange={handleInputChange}
          onSenderProfileUpdate={onSenderProfileUpdate}
          onReceiverProfileUpdate={onReceiverProfileUpdate}
        />
        <ProfileEditCard
          profile={senderProfile}
          profileType="sender"
          title="내 프로필"
          isEditing={editingSender}
          tempName={tempSenderName}
          onImageUpload={handleImageUpload}
          onNameEdit={handleNameEdit}
          onNameSave={handleNameSave}
          onKeyPress={handleKeyPress}
          onInputChange={handleInputChange}
          onSenderProfileUpdate={onSenderProfileUpdate}
          onReceiverProfileUpdate={onReceiverProfileUpdate}
        />
      </div>
    </motion.div>
  );
};

export default InlineProfileEditor; 