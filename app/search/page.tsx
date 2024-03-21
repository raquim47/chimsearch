import SearchResults from '@/components/search/SearchResults';
import RQProvider from '@/components/service/RQProvider';

const SearchPage = () => {
  return (
    <RQProvider>
      <SearchResults />
    </RQProvider>
  );
};

export default SearchPage;
