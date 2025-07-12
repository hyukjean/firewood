import { Message, Profile, DeviceSettings, Platform } from '../types';

// iPhone 15 정확한 치수
export const IPHONE_DIMENSIONS = {
  width: 393,
  height: 852,
  statusBarHeight: 54,
  dynamicIslandWidth: 126,
  dynamicIslandHeight: 37,
  cornerRadius: 40,
  borderWidth: 8
};

// 색상 팔레트
export const COLORS = {
  KAKAO: {
    YELLOW: '#FFE400',
    BG: '#ABC1D1',
    HEADER: '#ABC1D1', // 헤더 색상을 배경과 통일
    TEXT_GRAY: '#556677'
  },
  INSTAGRAM: {
    BLUE: '#3797F0',
    GRAY: '#EFEFEF',
    BORDER: '#dbdbdb',
    TEXT_GRAY: '#8e8e8e',
    TEXT_DARK: '#262626'
  },
  IOS: {
    RED: '#FF3B30',
    ORANGE: '#FF9500',
    GREEN: '#34C759',
    BLUE: '#007AFF',
    BLACK: '#000000'
  }
};

// 기본 메시지 데이터
export const DEFAULT_MESSAGES: Message[] = [
  { id: 1, text: '아 TSLL 좀 사고 싶은데 개비싸노', sender: true, time: '14:23' },
  { id: 2, text: '좋은 생각 있는데, 해보실', sender: false, time: '14:23' },
  { id: 3, text: '먼데', sender: true, time: '14:24' },
  { id: 4, text: '우리 둘이 존나 싸우는거임ㅋㅋ', sender: false, time: '14:24' },
  { id: 5, text: '차트 존나 재밌을 듯?', sender: false, time: '14:24' },
  { id: 6, text: 'ㅅㅂㅋㅋ', sender: true, time: '14:25' }
];

// 기본 프로필 데이터
export const DEFAULT_PROFILES = {
  sender: {
    name: 'RealDonaldTrump',
    image: '/images/profiles/trump.png'
  } as Profile,
  receiver: {
    name: 'ElonMusk',
    image: '/images/profiles/ElonMusk.png'
  } as Profile
};

// 기본 디바이스 설정
export const DEFAULT_DEVICE_SETTINGS: DeviceSettings = {
  time: '5:12',
  batteryLevel: 34
};

// 플랫폼 설정
export const PLATFORM_CONFIGS = [
  {
    id: 'kakaotalk' as Platform,
    name: '카카오톡',
    icon: '💬'
  },
  {
    id: 'instagram' as Platform,
    name: 'Instagram',
    icon: '📸'
  }
]; 