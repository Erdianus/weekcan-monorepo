import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function yearItems(props?: { filterYear?: string }) {
  const oldest = 1970;
  const date = new Date();
  const recent = date.getFullYear();

  const arrItemYears: { label: string; value: string }[] = [];

  for (let i = recent; i >= oldest; i--) {
    arrItemYears.push({
      label: `${i}`,
      value: `${i}`,
    });
  }
  if (props?.filterYear) {
    return arrItemYears.filter((v) => v.value !== props.filterYear);
  }

  return arrItemYears;
}
