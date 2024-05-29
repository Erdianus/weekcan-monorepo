import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/*
 * @return Bakal return kayak 'file.png' => 'png'
 */
export function fileExt(text: string) {
  const t = text.match(/[0-9a-z]+$/);

  return t?.[0] ?? "";
}

export function isImage(text: string) {
  const t = text.match(/[0-9a-z]+$/);

  return ["png", "jpeg", "jpg", "webp"].includes((t?.[0] ?? "").toLowerCase());
}

/*
 * @return Bakal return Oktavian Yoga => OY
 */
export const shortName = (text?: string) => {
  const txt = text ?? "";
  const rgx = new RegExp(/(\p{L}{1})\p{L}+/, "gu");
  const initial = [...txt.matchAll(rgx)];

  return (
    (initial.shift()?.[1] ?? "") + (initial.pop()?.[1] ?? "")
  ).toUpperCase();
};
