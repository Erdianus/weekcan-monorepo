import type { DetailedHTMLProps, HTMLAttributes } from "react";

import { cn } from "@hktekno/ui/lib/utils";

type HeadingProps = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;
type ParagraphProps = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

const H1 = (props: HeadingProps) => {
  return (
    <h1
      {...props}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        props.className,
      )}
    />
  );
};

function H2(props: HeadingProps) {
  return (
    <h2
      {...props}
      className={cn(
        "scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0",
        props.className,
      )}
    />
  );
}

function H3(props: HeadingProps) {
  return (
    <h3
      {...props}
      className={cn(
        "scroll-m-20 text-2xl font-semibold tracking-tight",
        props.className,
      )}
    />
  );
}

function Paragraph(props: ParagraphProps) {
  return (
    <p
      {...props}
      className={cn("leading-7 [&:not(:first-child)]:mt-6", props.className)}
    />
  );
}

function Muted(props: ParagraphProps) {
  return (
    <p
      {...props}
      className={cn("text-sm text-muted-foreground", props.className)}
    />
  );
}

export { H1, H2, H3, Paragraph, Muted };
