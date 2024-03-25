'use client';

import SearchResults from '@/components/search/SearchResults';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const VideosLayout = ({ modal }: { modal: React.ReactNode }) => {
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
      <SearchResults />
      {openModal && modal}
    </>
  );
};

export default VideosLayout;
