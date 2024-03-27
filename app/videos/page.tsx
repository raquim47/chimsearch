import SearchedVideos from '@/components/videos/SearchedVideos';
import { MetadataProps } from '@/utils/types';
import { Suspense } from 'react';

export const generateMetadata = ({ searchParams }: MetadataProps) => {
  return {
    title: `검색 - ${searchParams.keyword}`,
  };
};

const SearchPage = () => {
  return (
    <Suspense fallback={null}>
      <SearchedVideos />
    </Suspense>
  );
};

export default SearchPage;
