interface BadgeProps {
  children: React.ReactNode; // add all kind of children
}

export default function Badge({ children }: BadgeProps) {
  return (
    <span className="rounded border bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
      {children}
    </span>
  );
}
