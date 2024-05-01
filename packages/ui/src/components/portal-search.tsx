'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@ui/lib/utils';
import { Search } from 'lucide-react';
import { createPortal } from 'react-dom';
import { useDebouncedCallback } from 'use-debounce';

import { Input, InputProps } from './ui/input';

export default function PortalSearch(props: InputProps) {
  const [mount, setMount] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((term?: string) => {
    const hasPage = !!searchParams.get('page');
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set('search', term);
      if (hasPage) params.delete('page');
    } else {
      params.delete('search');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    setMount(true);
  }, []);

  return mount
    ? createPortal(
        <>
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3 text-muted-foreground">
              <Search size={20} />
            </div>
            <Input
              {...props}
              defaultValue={searchParams.get('search')?.toString()}
              onChange={(e) => {
                handleSearch(e.target.value);
              }}
              type="search"
              placeholder={props.placeholder ?? 'Cari Sesuatu'}
              className={cn('max-w-48 pl-10', props.className)}
            />
          </div>
        </>,
        // @ts-ignore
        document.querySelector('#portal-search'),
      )
    : null;
}
