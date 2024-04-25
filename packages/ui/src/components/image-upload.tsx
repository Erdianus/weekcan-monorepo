import { cn } from "@ui/lib/utils";
import { Image, Upload, XCircle } from "lucide-react";
import ImageUploading, { ImageListType } from "react-images-uploading";

type Props = {
  value: ImageListType;
  onChange: (
    value: ImageListType,
    addUpdatedIndex?: number[] | undefined,
  ) => void;
};

const ImageUpload = (props: Props) => {
  return (
    <ImageUploading {...props} maxNumber={1} dataURLKey="dataURL">
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <div className="mt-6 flex items-center gap-4">
          <button
            type="button"
            className={cn(
              "flex h-40 w-40 flex-col items-center justify-center rounded-lg border bg-white px-2 text-gray-400",
              isDragging && "bg-gray-50",
            )}
            onClick={
              imageList.length > 0 ? () => onImageUpdate(0) : onImageUpload
            }
            {...dragProps}
          >
            {isDragging ? <Upload /> : <Image />}
            <p className="text-xs">
              {isDragging ? "Ya, lepas" : "Klik atau Drag gambar"}{" "}
            </p>
          </button>
          {imageList.map((image, index) => (
            <div key={index} className="group relative w-max">
              <img
                className="h-40 w-40 rounded-lg object-cover"
                src={image.dataURL}
              />
              <div className="absolute top-0 h-40 w-40 rounded-lg bg-gray-900/60 opacity-0 transition-opacity group-hover:opacity-100" />
              <button
                type="button"
                className="absolute right-1 top-1 z-[2] hidden text-red-500 group-hover:block"
                onClick={onImageRemoveAll}
              >
                <XCircle />
              </button>
            </div>
          ))}
        </div>
      )}
    </ImageUploading>
  );
};

type ImageUploadType = ImageListType;

export { type ImageUploadType };

export default ImageUpload;
