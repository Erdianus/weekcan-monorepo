import { useState } from 'react';
import {
  Autocomplete,
  AutocompleteItem,
  AutocompleteProps,
} from '@nextui-org/react';
import { useInfiniteScroll } from '@nextui-org/use-infinite-scroll';
import { useDebouncedCallback } from 'use-debounce';

import { k } from '~/api';

export type Key = string | number;

export function AsyncSelectCategory(
  props: Omit<AutocompleteProps, 'items' | 'children' | 'defaultItems'>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchCategory, setSearchCategory] = useState('');
  const {
    data: items,
    hasNextPage: hasMore,
    isLoading,
    fetchNextPage: onLoadMore,
  } = k.archive.category.infinite.useInfiniteQuery({
    variables: { searchCategory },
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  const handleValue = useDebouncedCallback((v: string) => {
    setSearchCategory(v);
  }, 600);

  const data = items?.pages.flatMap((v) => v.data);

  return (
    <Autocomplete
      {...props}
      isLoading={isLoading}
      items={data ?? []}
      scrollRef={scrollerRef}
      onOpenChange={props.onOpenChange ?? setIsOpen}
      onValueChange={(e) => {
        handleValue(e);
      }}
      onSelectionChange={
        props.onSelectionChange
          ? (e) => {
              props.onSelectionChange?.(e);
              if (!e) setSearchCategory('');
            }
          : undefined
      }
    >
      {(item) => (
        <AutocompleteItem key={item.id} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}

export function AsyncSelectSkill(
  props: Omit<AutocompleteProps, 'items' | 'children' | 'defaultItems'>,
) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchSkill, setSearchSkill] = useState('');
  const {
    data: items,
    hasNextPage: hasMore,
    isLoading,
    fetchNextPage: onLoadMore,
  } = k.archive.skill.infinite.useInfiniteQuery({
    variables: { searchSkill },
  });

  const [, scrollerRef] = useInfiniteScroll({
    hasMore,
    isEnabled: isOpen,
    shouldUseLoader: false, // We don't want to show the loader at the bottom of the list
    onLoadMore,
  });

  const handleValue = useDebouncedCallback((v: string) => {
    setSearchSkill(v);
  }, 600);

  const data = items?.pages.flatMap((v) => v.data);

  return (
    <Autocomplete
      {...props}
      isLoading={isLoading}
      items={data ?? []}
      scrollRef={scrollerRef}
      onOpenChange={props.onOpenChange ?? setIsOpen}
      onValueChange={(e) => {
        handleValue(e);
      }}
      onSelectionChange={
        props.onSelectionChange
          ? (e) => {
              props.onSelectionChange?.(e);
              if (!e) setSearchSkill('');
            }
          : undefined
      }
    >
      {(item) => (
        <AutocompleteItem key={item.id} className="capitalize">
          {item.name}
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
}
