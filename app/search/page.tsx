import SearchResults from '@/components/search/SearchResults';
import RQProvider from '@/components/service/rq-provider';

const SearchPage = () => {
  return (
    <RQProvider>
      <SearchResults />
    </RQProvider>
  );
};

export default SearchPage;
