import { DependencyList, RefObject, useEffect, useState } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";

import { useImageCropStore } from "../lib/store/useImageCropStore";

const TO_RADIANS = Math.PI / 180;

async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1,
  rotate = 0,
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  // devicePixelRatio slightly increases sharpness on retina devices
  // at the expense of slightly slower render times and needing to
  // size the image back down if you want to download/upload and be
  // true to the images natural size.
  const pixelRatio = window.devicePixelRatio;
  // const pixelRatio = 1

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;

  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // 5) Move the crop origin to the canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  // 4) Move the origin to the center of the original position
  ctx.translate(centerX, centerY);
  // 3) Rotate around the origin
  ctx.rotate(rotateRads);
  // 2) Scale the image
  ctx.scale(scale, scale);
  // 1) Move the center of the image to the origin (0,0)
  ctx.translate(-centerX, -centerY);
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
  );

  ctx.restore();
}

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

async function getImgFile({
  imgRef,
  canvasRef,
  completedCrop,
}: {
  imgRef: RefObject<HTMLImageElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  completedCrop?: PixelCrop;
}) {
  const image = imgRef.current;
  const previewCanvas = canvasRef.current;
  if (!image || !previewCanvas || !completedCrop) {
    throw new Error("Crop canvas does not exist");
  }

  // This will size relative to the uploaded image
  // size. If you want to size according to what they
  // are looking at on screen, remove scaleX + scaleY
  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;

  const offscreen = new OffscreenCanvas(
    completedCrop.width * scaleX,
    completedCrop.height * scaleY,
  );
  const ctx = offscreen.getContext("2d");
  if (!ctx) {
    throw new Error("No 2d context");
  }

  ctx.drawImage(
    previewCanvas,
    0,
    0,
    previewCanvas.width,
    previewCanvas.height,
    0,
    0,
    offscreen.width,
    offscreen.height,
  );
  // You might want { type: "image/jpeg", quality: <0 to 1> } to
  // reduce image size
  const blob = await offscreen.convertToBlob({
    type: "image/png",
  });

  return new File([blob], "profile");
}

function useDebounceEffect(
  fn: () => void,
  waitTime: number,
  deps?: DependencyList,
) {
  useEffect(() => {
    const t = setTimeout(() => {
      // @ts-expect-error gapapa error gan
      fn.apply(undefined, deps);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}

const CropImage = () => {
  const imgRef = useImageCropStore((s) => s.imgRef);
  const previewCanvasRef = useImageCropStore((s) => s.canvasRef);
  const imgSrc = useImageCropStore((s) => s.imgSrc);
  const [crop, setCrop] = useImageCropStore((s) => [s.crop, s.setCrop]);
  const [completedCrop, setCompletedCrop] = useImageCropStore((s) => [
    s.completedCrop,
    s.setCompletedCrop,
  ]);
  const [scale] = useState(1);
  const [rotate] = useState(0);
  const [aspect] = useState<number | undefined>(1);

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        );
      }
    },
    100,
    [completedCrop, scale, rotate],
  );

  return (
    <>
      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          circularCrop
          // minWidth={400}
          minHeight={100}
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={(e) => {
              if (aspect) {
                const { width, height } = e.currentTarget;
                setCrop(centerAspectCrop(width, height, aspect));
              }
            }}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <canvas
          className="hidden"
          ref={previewCanvasRef}
          style={{
            border: "1px solid black",
            objectFit: "contain",
            width: completedCrop.width,
            height: completedCrop.height,
          }}
        />
      )}
    </>
  );
};

export type { Crop, PixelCrop };
export { CropImage, getImgFile };
