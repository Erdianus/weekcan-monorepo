import type { DropzoneProps } from "react-dropzone";
import { FileUp } from "lucide-react";
import ReactDropzone from "react-dropzone";

import { cn } from "@hktekno/ui/lib/utils";

import FileIcon from "./file-icon";

const Dropzone = (props: DropzoneProps & { className?: string }) => {
  return (
    <ReactDropzone {...props}>
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <section>
          <div
            className={cn(
              "flex w-full flex-col items-center justify-center rounded-lg border border-border p-2",
              props.className,
            )}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            {acceptedFiles[0]?.name ? (
              <FileIcon text={acceptedFiles[0].name} />
            ) : (
              <FileUp />
            )}

            <p className="">Upload File, drop atau klik!</p>
          </div>
        </section>
      )}
    </ReactDropzone>
  );
};

export { type DropzoneProps };

export default Dropzone;
