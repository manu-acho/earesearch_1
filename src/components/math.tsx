import "katex/dist/katex.min.css";

interface MathProps {
  children: string;
  display?: boolean;
}

export function Math({ children, display = false }: MathProps) {
  if (display) {
    return (
      <div className="my-6 overflow-x-auto">
        <div className="flex justify-center">
          <span className="katex-display">{children}</span>
        </div>
      </div>
    );
  }

  return <span className="katex-inline">{children}</span>;
}
