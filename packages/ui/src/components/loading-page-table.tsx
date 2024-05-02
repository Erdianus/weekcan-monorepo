import { Skeleton } from '@repo/ui/components/ui/skeleton';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { H3 } from './ui/typograhpy';

const LoadingPageTable = ({ title, ...props }: { title?: string; cols?: string[] }) => {
  const cols = props.cols ?? [<Skeleton />, <Skeleton />, <Skeleton />, <Skeleton />];
  const length = 5;

  return (
    <>
      <div className="mb-4 flex w-full items-center justify-between">
        <H3 className="">{title ?? <Skeleton className="h-5 w-32" />}</H3>
        <Skeleton className="h-10 w-10" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {cols.map((d, i) => (
                <TableHead key={`th-${i}`}>{d}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length }, (_, i) => (
              <TableRow key={`tr-${i}`}>
                {Array.from({ length: cols.length }, (_, ii) => (
                  <TableCell key={`tc-${ii}`}>
                    <Skeleton className="h-5 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default LoadingPageTable;
