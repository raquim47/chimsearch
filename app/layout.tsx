import './globals.css';

export const metadata = {
  title: '원본박물관 탐색기',
  description: '원본박물관 탐색기',
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
