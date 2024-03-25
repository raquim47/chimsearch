'use client';

import SearchedVideos from '@/components/videos/SearchedVideos';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const VideosLayout = ({
  modal,
  children,
}: {
  modal: React.ReactNode;
  children: React.ReactNode;
}) => {
  const [openModal, setOpenModal] = useState(false);
  const pathName = usePathname();

  useEffect(() => {
    if (pathName === '/videos') {
      setOpenModal(false);
    } else {
      setOpenModal(true);
    }
  }, [pathName]);
  return (
    <>
      
      {openModal && modal}
      {children}
    </>
  );
};

export default VideosLayout;
