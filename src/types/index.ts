export interface Message {
  id: number;
  text: string;
  sender: boolean;
  time: string;
  showTime?: boolean; // 시간 표시 여부
  showProfile?: boolean; // 프로필 표시 여부
  groupId?: string; // 같은 시간대 그룹 ID
}

export interface Profile {
  name: string;
  image: string | null;
}

export interface DeviceSettings {
  time: string;
  batteryLevel: number;
}

export type Platform = 'kakaotalk' | 'instagram';

export interface PlatformConfig {
  id: Platform;
  name: string;
  icon: string;
}

export interface ChatPreviewProps {
  messages: Message[];
  senderName: string;
  receiverName: string;
  senderImage: string | null;
  receiverImage: string | null;
  platform: Platform;
  deviceSettings: DeviceSettings;
  isMobile?: boolean;
  onSendMessage?: (text: string, isSender: boolean) => void;
  onDeleteMessage?: (id: number) => void;
}

export interface ChatComponentProps {
  messages: Message[];
  senderName: string;
  receiverName: string;
  senderImage: string | null;
  receiverImage: string | null;
  onSendMessage?: (text: string, isSender: boolean) => void;
}

export interface StatusBarProps {
  time: string;
  batteryLevel: number;
  backgroundColor?: string;
}

export interface AvatarProps {
  image: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export interface BatteryIconProps {
  level: number;
  className?: string;
}

export interface MessageGroup {
  id: string;
  time: string;
  sender: boolean;
  messages: Message[];
  showTime: boolean;
  showProfile: boolean;
} 