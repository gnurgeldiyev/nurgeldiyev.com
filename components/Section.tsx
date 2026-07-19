import Link from "next/link";
import { ArrowIcon } from "./icons";

export default function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-baseline justify-between px-1">
        <h2 className="font-display text-2xl text-main">{title}</h2>
        {action && (
          <Link
            href={action.href}
            className="group inline-flex items-center gap-1 text-sm text-soft transition-colors hover:text-accent"
          >
            {action.label}
            <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
