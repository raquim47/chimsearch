import Root from '@/components/common/Root';
import './globals.css';

export const metadata = {
  title: '침원박 탐색기',
  description: '침착맨의 원본 박물관 영상들을 키워드로 쉽게 검색해보세요.',
  keywords: '침착맨, 원본 박뀰관, 유튜브, 영상 검색, 키워드 검색',
  author: 'Jin',
  ogTitle: '침원박 탐색기 - 침착맨 원본 박물관 영상 검색',
};

const RootLayout = ({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) => {
  return (
    <html lang="ko">
      <body>
        <Root>
          {children}
          {modal}
        </Root>
      </body>
    </html>
  );
};

export default RootLayout;
