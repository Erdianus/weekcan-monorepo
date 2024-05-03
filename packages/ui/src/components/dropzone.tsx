import type { DropzoneProps } from "react-dropzone";
import { FileUp } from "lucide-react";
import ReactDropzone from "react-dropzone";

import { cn } from "@hktekno/ui/lib/utils";

const Dropzone = (props: DropzoneProps & { className?: string }) => {
  return (
    <ReactDropzone {...props}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div
            className={cn(
              "flex w-full flex-col items-center justify-center rounded-lg border border-muted p-2",
              props.className,
            )}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <FileUp />
            <p className="">Upload File, drop atau klik!</p>
          </div>
        </section>
      )}
    </ReactDropzone>
  );
};

export { type DropzoneProps };

export default Dropzone;
