import { NavItem } from "./types";
import type { ComponentType } from "react";

type MDXComponent = ComponentType<Record<string, unknown>>;

interface TccContentProps {
  navItems: NavItem[];
  mdxMap?: Record<string, MDXComponent>;
}

export function TccContent({ navItems, mdxMap }: TccContentProps) {
  return (
    <main className="space-y-16">
      {navItems.map((item) => {
        const MdComponent = mdxMap?.[item.id];

        const sectionPadding =
          item.level === 2 ? "pl-4" : item.level === 3 ? "pl-8" : "";
        const headingClass =
          item.level === 1
            ? "mb-4 text-3xl font-bold"
            : item.level === 2
            ? "mb-4 text-2xl font-semibold"
            : "mb-4 text-lg font-medium";

        return (
          <section
            key={item.id}
            id={item.id}
            className={`scroll-mt-24 ${sectionPadding}`}
          >
            <h2 className={headingClass}>
              {item.numbering} {item.title}
            </h2>

            <div className="space-y-4 text-muted-foreground text-justify">
              {MdComponent ? (
                <MdComponent />
              ) : (
                <p>
                  Conteúdo em branco — substitua por informação específica para
                  esta seção.
                </p>
              )}
            </div>
          </section>
        );
      })}
    </main>
  );
}
