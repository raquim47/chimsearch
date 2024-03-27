import SearchedVideos from '@/components/videos/SearchedVideos';

interface MetadataProps {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export const generateMetadata = ({ searchParams }: MetadataProps) => {
  return {
    title: `검색 - ${searchParams.keyword}`,
  };
};

const SearchPage = () => {
  return <SearchedVideos />;
};

export default SearchPage;
