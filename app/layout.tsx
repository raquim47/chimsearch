import Root from '@/components/common/Root';
import './globals.css';

export const metadata = {
  title: '침원박 탐색기',
  description: '침착맨 원본박물관 영상 키워드 검색 서비스',
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
