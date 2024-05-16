import type { RefObject } from "react";
import type { Crop, PixelCrop } from "react-image-crop";
import { createRef } from "react";
import { create } from "zustand";

interface State {
  imgSrc: string;
  crop?: Crop;
  completedCrop?: PixelCrop;
  imgRef: RefObject<HTMLImageElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
}

interface CropImageState extends State {
  setImgSrc: (img: string) => void;
  setCrop: (crop?: Crop) => void;
  setCompletedCrop: (crop?: PixelCrop) => void;
  reset: () => void;
}

const initState: State = {
  imgSrc: "",
  crop: undefined,
  completedCrop: undefined,
  imgRef: createRef<HTMLImageElement>(),
  canvasRef: createRef<HTMLCanvasElement>(),
};

const useImageCropStore = create<CropImageState>()((set) => ({
  ...initState,
  setImgSrc: (imgSrc) => set(() => ({ imgSrc })),
  setCrop: (crop) => set(() => ({ crop })),
  setCompletedCrop: (completedCrop) => set(() => ({ completedCrop })),
  reset: () => set(initState),
}));

export { useImageCropStore };
