import { cn } from "~/lib/utils";

/** This container is used to surround the entire app, it correctly places the nav bar */
export function AppContainer({ children }: { children: React.ReactNode }) {
  return <div className={cn("grid h-full w-full grid-rows-1 overflow-hidden")}>{children}</div>;
}

export function MainBody({ children }: { children: React.ReactNode }) {
  return <div className={cn("grid grid-rows-1 overflow-hidden")}>{children}</div>;
}

/** This container should be placed around the content on a page */
export function PageContainer({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-rows-[auto_1fr] overflow-hidden">{children}</div>;
}

export function PageBody({
  children,
  scrollable = true,
  className,
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        scrollable
          ? "scrollbar-thumb-charcoal-600 overflow-y-auto p-3 scrollbar-thin scrollbar-track-transparent"
          : "overflow-hidden",
        className
      )}
    >
      {children}
    </div>
  );
}

export function MainCenteredContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="scrollbar-thumb-charcoal-600 h-full w-full overflow-y-auto scrollbar-thin scrollbar-track-transparent">
      <div className={cn("mx-auto mt-6 max-w-xs overflow-y-auto p-1 md:mt-[22vh]", className)}>
        {children}
      </div>
    </div>
  );
}

export function MainHorizontallyCenteredContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="scrollbar-thumb-charcoal-600 w-full overflow-y-auto scrollbar-thin scrollbar-track-transparent">
      <div
        className={cn(
          "scrollbar-thumb-charcoal-600 mx-auto mt-6 max-w-lg overflow-y-auto p-1 scrollbar-thin scrollbar-track-transparent md:mt-14",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
