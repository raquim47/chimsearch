import SearchedVideos from '@/components/videos/SearchedVideos';
import { MetadataProps } from '@/utils/types';

export const generateMetadata = ({ searchParams }: MetadataProps) => {
  return {
    title: `검색 - ${searchParams.keyword}`,
  };
};

const SearchPage = () => {
  return <SearchedVideos />;
};

export default SearchPage;
