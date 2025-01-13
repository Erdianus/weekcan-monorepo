import { Input } from '@nextui-org/react';
import { useSearchParams } from '@remix-run/react';
import { Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';

const SearchInput = ({
  searchKey,
  placeholder,
}: {
  searchKey?: string;
  placeholder?: string;
}) => {
  const key = searchKey ?? 'search';
  const [searchParams, setSearchParams] = useSearchParams();
  const handleSearch = useDebouncedCallback((term?: string) => {
    const hasPage = !!searchParams.get('page');
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set(key, term);
      if (hasPage) params.delete('page');
    } else {
      params.delete(key);
    }
    setSearchParams(params, { replace: true });
  }, 300);

  return (
    <Input
      defaultValue={searchParams.get(key)?.toString()}
      onChange={(e) => {
        handleSearch(e.target.value);
      }}
      startContent={<Search />}
      placeholder={placeholder}
      isClearable
    />
  );
};

export { SearchInput };
