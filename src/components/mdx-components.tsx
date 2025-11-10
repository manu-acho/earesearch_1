import Link from "next/link";
import Image from "next/image";
import { Callout } from "./callout";
import { Mermaid } from "./mermaid";
import { Math } from "./math";

export const mdxComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 className="scroll-m-20 text-4xl font-bold tracking-tight mb-4" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight mb-4 mt-10 first:mt-0" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mb-3 mt-8" {...props}>
      {children}
    </h3>
  ),
  h4: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mb-3 mt-6" {...props}>
      {children}
    </h4>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="leading-7 [&:not(:first-child)]:mt-6" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-6 ml-6 list-disc [&>li]:mt-2" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-6 ml-6 list-decimal [&>li]:mt-2" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote className="mt-6 border-l-4 border-primary pl-6 italic text-muted-foreground" {...props}>
      {children}
    </blockquote>
  ),
  table: ({ children, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full border-collapse" {...props}>
        {children}
      </table>
    </div>
  ),
  th: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border border-border px-4 py-2 text-left font-semibold bg-muted" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border border-border px-4 py-2" {...props}>
      {children}
    </td>
  ),
  code: ({ children, className, ...props }: React.HTMLAttributes<HTMLElement>) => {
    const isInline = !className;
    return isInline ? (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm" {...props}>
        {children}
      </code>
    ) : (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => (
    <pre className="mb-4 mt-6 overflow-x-auto rounded-lg bg-muted p-4" {...props}>
      {children}
    </pre>
  ),
  a: ({ href, children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href?.startsWith("http");
    const Component = isExternal ? "a" : Link;
    return (
      <Component
        href={href || "#"}
        className="font-medium text-primary underline underline-offset-4 hover:text-primary/80"
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
        {...props}
      >
        {children}
      </Component>
    );
  },
  Image: (props: React.ComponentProps<typeof Image>) => (
    <Image {...props} className="rounded-lg my-6" />
  ),
  Callout,
  Mermaid,
  Math,
};
