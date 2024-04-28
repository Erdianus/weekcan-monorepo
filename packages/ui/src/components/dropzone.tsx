import { cn } from '@ui/lib/utils';
import { FileUp } from 'lucide-react';
import ReactDropzone, { DropzoneProps } from 'react-dropzone';

const Dropzone = (props: DropzoneProps & { className?: string }) => {
  return (
    <ReactDropzone {...props}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <div className={cn('flex w-full flex-col items-center justify-center rounded-lg border border-muted p-2', props.className)} {...getRootProps()}>
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
