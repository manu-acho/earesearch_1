import { cn } from "@/lib/utils";
import { Info, CheckCircle2, AlertTriangle } from "lucide-react";

interface CalloutProps {
  type?: "info" | "success" | "warning";
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Callout({ type = "info", title, children, className }: CalloutProps) {
  const styles = {
    info: {
      container: "bg-blue-50 border-blue-200 dark:bg-blue-950/30 dark:border-blue-900",
      icon: "text-blue-600 dark:text-blue-400",
      title: "text-blue-900 dark:text-blue-200",
      Icon: Info,
    },
    success: {
      container: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900",
      icon: "text-green-600 dark:text-green-400",
      title: "text-green-900 dark:text-green-200",
      Icon: CheckCircle2,
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 dark:bg-yellow-950/30 dark:border-yellow-900",
      icon: "text-yellow-600 dark:text-yellow-400",
      title: "text-yellow-900 dark:text-yellow-200",
      Icon: AlertTriangle,
    },
  };

  const { container, icon, title: titleColor, Icon } = styles[type];

  return (
    <div className={cn("border rounded-lg p-4 my-6", container, className)}>
      <div className="flex gap-3">
        <Icon className={cn("w-5 h-5 mt-0.5 flex-shrink-0", icon)} />
        <div className="flex-1">
          {title && (
            <p className={cn("font-semibold mb-2", titleColor)}>{title}</p>
          )}
          <div className="text-sm [&>p]:my-2 [&>ul]:my-2 [&>ol]:my-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
