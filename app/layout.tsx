import Root from '@/components/common/Root';
import './globals.css';

export const metadata = {
  title: '원본박물관 탐색기',
  description: '원본박물관 탐색기',
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
