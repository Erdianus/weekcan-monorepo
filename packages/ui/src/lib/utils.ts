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

export function slug(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-");
}

export function isValidHttpUrl(text: string) {
  let url;

  const urls = text.match(
    /(http|ftp|https):\/\/([\w_-]+(?:(?:\.[\w_-]+)+))([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])/,
  );

  if (!urls) {
    return undefined;
  }

  const firstUrl = urls[0];

  try {
    url = new URL(firstUrl);
  } catch (_) {
    return undefined;
  }

  if (url.protocol == "https:" || url.protocol === "http:")
    return url.toString();

  return undefined;
}

function convertToDMS(deg: number) {
  const absolute = Math.abs(deg);
  const degrees = Math.floor(absolute);
  const minutesNotTruncated = (absolute - degrees) * 60;
  const minutes = Math.floor(minutesNotTruncated);
  const seconds = Math.floor((minutesNotTruncated - minutes) * 60);

  const direction =
    deg >= 0 ? (deg === degrees ? "N" : "E") : deg === degrees ? "S" : "W";

  return `${degrees}°${minutes}'${seconds}"${direction}`;
}

export function getDMS(lat: number, long: number) {
  return [convertToDMS(lat), convertToDMS(long)];
}

/**
 * Determine the mobile operating system.
 * This function returns one of 'iOS', 'Android', 'Windows Phone', or 'unknown'.
 *
 * @returns {String}
 */
export function getMobileOperatingSystem(): string {
    const userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
        return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection from: http://stackoverflow.com/a/9039885/177710
    if (/iPad|iPhone|iPod/.test(userAgent)) {
        return "iOS";
    }

    return "";
}
