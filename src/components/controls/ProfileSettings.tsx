import React from 'react';
import { Camera } from 'lucide-react';
import { Profile } from '../../types';

interface ProfileSettingsProps {
  senderProfile: Profile;
  receiverProfile: Profile;
  onSenderNameChange: (name: string) => void;
  onReceiverNameChange: (name: string) => void;
  onSenderImageChange: (image: string | null) => void;
  onReceiverImageChange: (image: string | null) => void;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  senderProfile,
  receiverProfile,
  onSenderNameChange,
  onReceiverNameChange,
  onSenderImageChange,
  onReceiverImageChange
}) => {
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (image: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const ProfileCard: React.FC<{
    profile: Profile;
    onNameChange: (name: string) => void;
    onImageChange: (image: string | null) => void;
    bgColor: string;
    borderColor: string;
    placeholder: string;
  }> = ({ profile, onNameChange, onImageChange, bgColor, borderColor, placeholder }) => (
    <div className={`${bgColor} p-3 rounded-xl`}>
      <input
        type="text"
        value={profile.name}
        onChange={(e) => onNameChange(e.target.value)}
        className={`w-full px-2 py-1 text-sm bg-white border ${borderColor} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2`}
        placeholder={placeholder}
      />
      <div className="relative group">
        <label className="block cursor-pointer">
          <div className={`w-16 h-16 mx-auto border-2 border-dashed ${borderColor} rounded-full hover:border-blue-400 transition bg-white/50 flex items-center justify-center overflow-hidden relative group-hover:opacity-80`}>
            {profile.image ? (
              <>
                <img src={profile.image} alt={profile.name} className="w-full h-full object-cover" />
                {/* 호버 오버레이 */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="w-4 h-4 text-white" />
                </div>
              </>
            ) : (
              <Camera className="w-5 h-5 text-blue-400" />
            )}
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleImageUpload(e, onImageChange)}
          />
        </label>
        {/* 이미지가 있을 때 삭제 버튼 */}
        {profile.image && (
          <button
            onClick={() => onImageChange(null)}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors"
            title="이미지 삭제"
          >
            ×
          </button>
        )}
        {/* 안내 텍스트 */}
        <p className="text-xs text-gray-500 text-center mt-1">
          {profile.image ? '클릭하여 변경' : '이미지 추가'}
        </p>
      </div>
    </div>
  );

  return (
    <div className="mb-4">
      <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2">프로필</h3>
      <div className="grid grid-cols-2 gap-2">
        <ProfileCard
          profile={senderProfile}
          onNameChange={onSenderNameChange}
          onImageChange={onSenderImageChange}
          bgColor="bg-blue-50"
          borderColor="border-blue-200"
          placeholder="발신자 이름"
        />
        <ProfileCard
          profile={receiverProfile}
          onNameChange={onReceiverNameChange}
          onImageChange={onReceiverImageChange}
          bgColor="bg-green-50"
          borderColor="border-green-200"
          placeholder="수신자 이름"
        />
      </div>
    </div>
  );
};

export default ProfileSettings; 