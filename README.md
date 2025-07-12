# 🔥 장작 (Firewood)

커뮤니티를 뜨겁게 달굴 가짜 채팅 대화 생성기

## 📋 프로젝트 개요

**장작**은 카카오톡과 인스타그램 DM 스타일의 가짜 채팅 대화를 생성할 수 있는 웹 애플리케이션입니다. iPhone 15 실제 크기로 시뮬레이션되며, 뉴모피즘 디자인과 반응형 레이아웃을 통해 데스크톱과 모바일 환경 모두에서 최적화된 사용자 경험을 제공합니다.

- **플랫폼**: 카카오톡, 인스타그램 DM
- **디자인**: 뉴모피즘 스타일, iPhone 15 실제 크기 시뮬레이션
- **반응형**: 데스크톱/모바일 환경 최적화
- **기술 스택**: React + TypeScript, Tailwind CSS, Vite, Framer Motion

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

### 빌드
```bash
npm run build
```

## 🎯 주요 기능

### 1. 플랫폼 지원
- ✅ **카카오톡 채팅 UI**: 실제 카카오톡과 동일한 디자인과 메시지 그룹핑
- ✅ **인스타그램 DM UI**: 인스타그램 DM 스타일의 메시지 인터페이스
- ✅ **Noto Sans KR 폰트**: 모든 플랫폼에서 일관된 한글 폰트 적용

### 2. 뉴모피즘 디자인
- ✅ **iPhone 프레임**: 검은 프레임 대신 회색 뉴모피즘 스타일 적용
- ✅ **컨트롤 패널**: 모든 버튼과 입력 요소에 뉴모피즘 효과
- ✅ **Dynamic Island**: 검은 노치 대신 뉴모피즘 스타일로 변경
- ❌ **상단바 제거**: 배터리, 시간, 신호 표시 완전 제거로 깔끔한 채팅 화면

### 3. 적응형 레이아웃 시스템
- ✅ **데스크톱 레이아웃**: 좌측 컨트롤 패널, 우측 iPhone 미리보기 분할
- ✅ **모바일 레이아웃**: 상단 컴팩트 컨트롤, 하단 iPhone 미리보기 세로 배치
- ✅ **스케일 최적화**: 모바일에서는 크게(0.95), 데스크톱에서는 적당히(1.0) 표시
- ✅ **겹침 문제 해결**: 작업 모듈과 미리보기 간 완전한 공간 분리

### 4. 인터랙티브 메시지 입력
- ✅ **실시간 채팅**: iPhone 화면에서 직접 메시지 입력
- ✅ **ME/YOU 모드**: 발신자/수신자 메시지 쉬운 전환
- ✅ **역할 전환**: 전체 대화의 발신자/수신자 역할 바꾸기
- ✅ **수정 모드**: 개별 메시지 선택 삭제

### 5. 프로필 관리
- ✅ **인라인 편집**: 별도 모달 없이 직접 프로필 편집
- ✅ **이미지 업로드**: 프로필 사진 추가/변경/삭제
- ✅ **세로 배치**: 상대방과 내 프로필을 각각 한 줄에 표시

### 6. 카카오톡 전용 기능
- ✅ **날짜 표시**: 채팅 상단 날짜 바 표시/숨김
- ✅ **메시지 그룹핑**: 동일 시간대 연속 메시지 그룹화
- ✅ **시간 표시**: 마지막 메시지에만 시간 표시

## ⚠️ 알려진 제한사항

### 스크린샷 다운로드 품질 문제
현재 스크린샷 다운로드 기능에 품질 관련 이슈가 있습니다:

- **텍스트 렌더링**: 다운로드된 이미지에서 텍스트가 흐리게 나오거나 깨져 보일 수 있음
- **폰트 적용**: 브라우저에서 보이는 것과 다운로드된 이미지의 폰트가 다를 수 있음
- **SVG 아이콘**: 일부 아이콘이 제대로 렌더링되지 않을 수 있음
- **해상도**: 고해상도 설정에도 불구하고 실제 화면 대비 품질 저하

이는 브라우저의 Canvas API와 html-to-image 라이브러리의 한계로 인한 것으로, 현재 개선 작업이 진행 중입니다.

## 🏗️ 프로젝트 구조

```
src/
├── App.tsx                     # 메인 애플리케이션
├── main.tsx                    # 애플리케이션 진입점
├── index.css                   # 전역 스타일 (Noto Sans KR 적용)
├── types/
│   └── index.ts               # TypeScript 타입 정의
├── constants/
│   └── index.ts               # 상수 및 기본값 정의
├── utils/
│   └── messageUtils.ts        # 메시지 그룹핑 유틸리티
├── hooks/
│   └── useFirewood.ts         # 메인 상태 관리 훅
├── components/
│   ├── layout/
│   │   ├── AdaptiveLayout.tsx     # 적응형 레이아웃 시스템
│   │   ├── NavigationBar.tsx      # 상단 네비게이션
│   │   └── MainLayout.tsx         # 메인 레이아웃
│   ├── controls/
│   │   ├── DesktopControlPanel.tsx    # 데스크톱 전용 컨트롤
│   │   ├── MobileControlPanel.tsx     # 모바일 전용 컨트롤
│   │   ├── PlatformSelectorTop.tsx    # 플랫폼 선택기
│   │   ├── InlineProfileEditor.tsx    # 인라인 프로필 편집
│   │   └── KakaoDateManager.tsx       # 카카오톡 날짜 관리
│   ├── chat/
│   │   ├── EditableChatPreview.tsx        # 편집 가능한 채팅 미리보기
│   │   ├── EnhancedKakaoTalkChat.tsx      # 향상된 카카오톡 UI
│   │   ├── EnhancedInstagramChat.tsx      # 향상된 인스타그램 UI
│   │   └── InteractiveMessageInput.tsx    # 인터랙티브 메시지 입력
│   ├── ui/
│   │   ├── SimplifiediPhoneWrapper.tsx    # 뉴모피즘 iPhone 프레임
│   │   └── EnhancediPhoneWrapper.tsx      # 고급 iPhone 프레임
│   └── common/
│       ├── Avatar.tsx                     # 아바타 컴포넌트
│       └── Button.tsx                     # 버튼 컴포넌트
```

## 🎨 디자인 시스템

### 뉴모피즘 스타일
```css
/* 기본 뉴모피즘 효과 */
box-shadow: 
  12px 12px 24px #d1d5db,
  -12px -12px 24px #ffffff;

/* 내부 그림자 (inset) */
box-shadow: 
  inset 8px 8px 16px rgba(209, 213, 219, 0.3),
  inset -8px -8px 16px rgba(255, 255, 255, 0.8);
```

### 색상 팔레트
```typescript
COLORS = {
  KAKAO: {
    YELLOW: '#FFE400',
    BG: '#ABC1D1',
    TEXT_GRAY: '#556677'
  },
  INSTAGRAM: {
    BLUE: '#3797F0',
    GRAY: '#EFEFEF',
    BORDER: '#dbdbdb',
    TEXT_GRAY: '#8e8e8e',
    TEXT_DARK: '#262626'
  }
}
```

### 폰트 시스템
- **기본 폰트**: Noto Sans KR
- **폴백 폰트**: Apple SD Gothic Neo, Malgun Gothic
- **영문 폰트**: -apple-system, BlinkMacSystemFont

## 📱 사용법

### 기본 사용법
1. **플랫폼 선택**: 상단에서 카카오톡 또는 인스타그램 선택
2. **프로필 설정**: 프로필 버튼을 눌러 이름과 이미지 설정
3. **메시지 입력**: iPhone 화면 하단에서 직접 메시지 입력
   - `ME` 버튼: 내 메시지
   - `YOU` 버튼: 상대방 메시지
   - 역할 전환 버튼으로 전체 대화 뒤바꾸기
4. **메시지 편집**: 수정 버튼을 눌러 개별 메시지 선택 삭제
5. **다운로드**: 저장 버튼으로 스크린샷 다운로드

### 카카오톡 전용 기능
- **날짜 설정**: 날짜 버튼으로 채팅 상단 날짜 바 관리
- **날짜 표시/숨김**: 토글로 날짜 바 표시 여부 조절

### 환경별 최적화
- **데스크톱**: 좌측 컨트롤 패널에서 모든 기능 접근
- **모바일**: 상단 컴팩트 버튼으로 기능별 확장 가능

## 🔧 개발 가이드

### 컴포넌트 구조
- **AdaptiveLayout**: 화면 크기에 따른 레이아웃 자동 전환
- **DesktopControlPanel**: 데스크톱 환경 최적화된 세로 배치
- **MobileControlPanel**: 모바일 환경 최적화된 컴팩트 배치
- **SimplifiediPhoneWrapper**: 뉴모피즘 스타일 iPhone 프레임

### 상태 관리
- `useFirewood` 훅을 통한 중앙 상태 관리
- React.memo와 useCallback을 통한 성능 최적화
- TypeScript로 타입 안정성 보장

### 스타일링
- Tailwind CSS 유틸리티 클래스
- 뉴모피즘 효과를 위한 커스텀 box-shadow
- CSS 변수를 통한 반응형 스케일링

## 🌟 성능 최적화

- **React.memo**: 불필요한 리렌더링 방지
- **useCallback**: 이벤트 핸들러 메모이제이션
- **Framer Motion**: 부드러운 애니메이션 효과
- **적응형 레이아웃**: 환경별 최적화된 컴포넌트 로딩

## 📄 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다.

## 🔄 버전 히스토리

### v5.0.0 (현재) - 뉴모피즘 & 상단바 제거
- **뉴모피즘 디자인**: iPhone 프레임과 모든 UI 요소에 뉴모피즘 적용
- **상단바 완전 제거**: 시간, 배터리, Dynamic Island 등 모든 상단바 요소 제거
- **Noto Sans KR**: 인스타그램 포함 모든 플랫폼에 한글 폰트 적용
- **컨트롤 패널 간소화**: 시간/배터리 설정 제거로 더 깔끔한 인터페이스

### v4.0.0 - 적응형 레이아웃 시스템
- **AdaptiveLayout**: 데스크톱/모바일 환경별 최적화된 레이아웃
- **겹침 문제 해결**: 작업 모듈과 미리보기 간 완전한 공간 분리
- **스케일 최적화**: 환경별 적절한 iPhone 크기 조정

### v3.0.0 - UI/UX 혁신
- **인터랙티브 입력**: iPhone 화면에서 직접 메시지 입력
- **프로필 인라인 편집**: 모달 없는 직관적 프로필 관리
- **수정 모드**: 개별 메시지 선택 삭제 기능

---

**개발자**: [@hyukjean](https://github.com/hyukjean)  
**소셜**: [Instagram](https://instagram.com/hyukjean) | [X (Twitter)](https://x.com/hyukjeanX)  
**버전**: 5.0.0 - 뉴모피즘 디자인 & 상단바 제거 업데이트 