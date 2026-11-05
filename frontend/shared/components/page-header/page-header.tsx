import type { Ref } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  titleRef?: Ref<HTMLHeadingElement>;
}

export function PageHeader({ title, description, titleRef }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-1">
      <h1
        ref={titleRef}
        tabIndex={titleRef ? -1 : undefined}
        className="text-2xl font-semibold wrap-anywhere outline-none"
      >
        {title}
      </h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </header>
  );
}
