import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fileExt(text: string) {
  const t = text.match(/[0-9a-z]+$/);

  return t?.[0] ?? '';
}
