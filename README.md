## 내 블로그를 직접 만들어보자.
현재 사용 중인 블로그(velog)를 내 자체 Next.js 블로그로 마이그레이션하자

블로그 배포 링크: https://jvn4.dev

### 사용할 스택
- Next.js(Pages Router)
- TypeScript
- Styled-components
- Notion API

### 구현하려는 방향
- Next.js 의 ISR 기능을 사용하여 유효기간이 지나면 다시 정적페이지를 생성하도록 한다.
- Notion API를 사용하여 블로그의 포스트를 관리한다.

### Recent Updates(24.01.05)
- Next.js ISR -> SSG로 변경
- notion DB 내 이미지가 배포 1시간 후 expiry_date가 만료되어 403 forbidden 에러가 발생하는 이슈가 있어 우선적으로 Post 페이지는 SSR로 요청하도록 수정.
- Next.js 서버컴포넌트를 적극적으로 사용해보기위해 기존 Pages Router에서 App Router로 마이그레이션 작업 중. (현재 Phase1 마이그레이션 완료 및 dev 푸시 완료)
- App Router의 서버컴포넌트 사용 시 별도의 스타일용 JS 파일을 생성하지 않기 위해 기존 Styled-components 에서 tailwindcss로 마이그레이션 예정


