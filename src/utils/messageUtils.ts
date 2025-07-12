import { Message, MessageGroup } from '../types';

// 메시지를 시간대별로 그룹핑하는 함수
export const groupMessagesByTime = (messages: Message[]): MessageGroup[] => {
  if (messages.length === 0) return [];

  const groups: MessageGroup[] = [];
  let currentGroup: MessageGroup | null = null;

  messages.forEach((message, index) => {
    const prevMessage = index > 0 ? messages[index - 1] : null;
    
    // 새로운 그룹을 시작해야 하는지 확인
    const shouldStartNewGroup = !prevMessage || 
      prevMessage.sender !== message.sender || 
      prevMessage.time !== message.time;

    if (shouldStartNewGroup) {
      // 이전 그룹이 있으면 저장
      if (currentGroup) {
        groups.push(currentGroup);
      }

      // 새 그룹 생성
      currentGroup = {
        id: `group-${index}`,
        time: message.time,
        sender: message.sender,
        messages: [message],
        showTime: true, // 첫 번째 메시지는 시간 표시
        showProfile: true // 첫 번째 메시지는 프로필 표시
      };
    } else {
      // 기존 그룹에 메시지 추가
      if (currentGroup) {
        currentGroup.messages.push(message);
        currentGroup.showTime = false; // 연속된 메시지는 시간 숨김
      }
    }
  });

  // 마지막 그룹 추가
  if (currentGroup) {
    groups.push(currentGroup);
  }

  return groups;
};

// 카카오톡용 메시지 그룹핑 (시간 표시 로직 포함)
export const groupMessagesForKakaoTalk = (messages: Message[]): MessageGroup[] => {
  if (messages.length === 0) return [];

  const groups: MessageGroup[] = [];
  let currentGroup: MessageGroup | null = null;

  messages.forEach((message, index) => {
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;
    
    // 새로운 그룹을 시작해야 하는지 확인
    const shouldStartNewGroup = !prevMessage || 
      prevMessage.sender !== message.sender || 
      prevMessage.time !== message.time;

    if (shouldStartNewGroup) {
      // 이전 그룹이 있으면 저장
      if (currentGroup) {
        groups.push(currentGroup);
      }

      // 새 그룹 생성
      currentGroup = {
        id: `group-${index}`,
        time: message.time,
        sender: message.sender,
        messages: [message],
        showTime: true, // 기본적으로 시간 표시
        showProfile: true // 첫 번째 메시지는 프로필 표시
      };
    } else {
      // 기존 그룹에 메시지 추가
      if (currentGroup) {
        currentGroup.messages.push(message);
      }
    }
  });

  // 마지막 그룹 추가
  if (currentGroup) {
    groups.push(currentGroup);
  }

  // 시간 표시 로직 재계산: 각 그룹에서 다음 그룹과 발신자나 시간이 다를 때만 시간 표시
  groups.forEach((group, groupIndex) => {
    const nextGroup = groupIndex < groups.length - 1 ? groups[groupIndex + 1] : null;
    
    // 다음 그룹이 없거나, 다음 그룹의 발신자가 다르거나, 다음 그룹의 시간이 다를 때만 시간 표시
    group.showTime = !nextGroup || 
                     nextGroup.sender !== group.sender || 
                     nextGroup.time !== group.time;
  });

  return groups;
};

// 인스타그램용 메시지 그룹핑 (개선된 프로필 표시 로직)
export const groupMessagesForInstagram = (messages: Message[]): MessageGroup[] => {
  if (messages.length === 0) return [];

  const groups: MessageGroup[] = [];
  let currentGroup: MessageGroup | null = null;

  messages.forEach((message, index) => {
    const prevMessage = index > 0 ? messages[index - 1] : null;
    const nextMessage = index < messages.length - 1 ? messages[index + 1] : null;
    
    // 새로운 그룹을 시작해야 하는지 확인 (발신자가 바뀔 때만)
    const shouldStartNewGroup = !prevMessage || prevMessage.sender !== message.sender;

    if (shouldStartNewGroup) {
      // 이전 그룹이 있으면 저장
      if (currentGroup) {
        groups.push(currentGroup);
      }

      // 새 그룹 생성
      currentGroup = {
        id: `group-${index}`,
        time: message.time,
        sender: message.sender,
        messages: [message],
        showTime: false, // 인스타그램은 시간 표시 안함
        showProfile: !message.sender // 수신자 메시지에만 프로필 표시
      };
    } else {
      // 기존 그룹에 메시지 추가
      if (currentGroup) {
        currentGroup.messages.push(message);
      }
    }
  });

  // 마지막 그룹 추가
  if (currentGroup) {
    groups.push(currentGroup);
  }

  // 인스타그램 특별 로직: 각 그룹의 마지막 메시지에만 프로필 표시
  groups.forEach((group, groupIndex) => {
    if (!group.sender) { // 수신자 메시지 그룹인 경우
      const nextGroup = groupIndex < groups.length - 1 ? groups[groupIndex + 1] : null;
      // 다음 그룹이 발신자 그룹이거나 마지막 그룹인 경우에만 프로필 표시
      group.showProfile = !nextGroup || nextGroup.sender;
    }
  });

  return groups;
};

// 읽음 표시 로직 개선
export const shouldShowReadReceipt = (message: Message, messages: Message[]): boolean => {
  if (!message.sender) return false; // 발신자 메시지가 아니면 읽음 표시 안함
  
  const messageIndex = messages.findIndex(msg => msg.id === message.id);
  if (messageIndex === -1) return false;
  
  // 해당 메시지 이후에 수신자 메시지가 있으면 읽음 표시 안함
  const hasReceiverResponseAfter = messages
    .slice(messageIndex + 1)
    .some(msg => !msg.sender);
  
  if (hasReceiverResponseAfter) return false;
  
  // 발신자의 마지막 메시지에만 읽음 표시
  const lastSenderMessage = messages.filter(msg => msg.sender).pop();
  return message.id === lastSenderMessage?.id;
};

// 현재 시간을 포맷팅하는 함수 (개선됨)
export const formatTime = (timeString: string): string => {
  // 시간 문자열이 유효한지 확인
  if (!timeString || typeof timeString !== 'string') {
    return '00:00';
  }

  // HH:MM 형식인지 확인
  const timeRegex = /^(\d{1,2}):(\d{2})$/;
  const match = timeString.match(timeRegex);
  
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    
    // 유효한 시간 범위인지 확인
    if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }
  }

  // 유효하지 않은 경우 기본값 반환
  return '00:00';
};

// 날짜를 포맷팅하는 함수
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) {
    return '오늘';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '어제';
  } else {
    return date.toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric'
    });
  }
}; 