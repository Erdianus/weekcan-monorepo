import { Skeleton } from './ui/skeleton';
import { H3 } from './ui/typograhpy';

const LoadingPageList = ({ title, ...props }: { title?: string; length?: number }) => {
  const length = props.length ?? 5;
  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">{title ?? <Skeleton className="h-5 w-32" />}</H3>
        <Skeleton className="h-10 w-10" />
      </div>
      {Array.from({ length }, (_, i) => (
        <div
          key={`list-${i}`}
          className="flex items-center justify-between gap-4 border-b border-border p-4"
        >
          <Skeleton className="h-8 w-1/4" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      ))}
    </>
  );
};

export default LoadingPageList;
