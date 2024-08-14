import { Listbox, type ListboxProps } from "@nextui-org/react";
import { useHits, useSearchBox, type UseHitsProps } from "react-instantsearch";
import type { Hit, BaseHit } from "instantsearch.js";

export interface HitsProps<T extends BaseHit = BaseHit>
  extends Omit<ListboxProps, "children" | "emptyContent">,
    UseHitsProps<T> {
  hitComponent: (hit: Hit<T>, index: number) => JSX.Element;
  emptyTitle?: string | ((query: string) => string);
  emptyDescription?: string;
  emptyContent?: JSX.Element | ((query: string) => JSX.Element);
  // configure?: Partial<SearchParameters>;
}

const Hits = <T extends BaseHit>({
  hitComponent,
  emptyDescription = "Try searching for something else",
  emptyContent,
  classNames,
  itemClasses,
  ...props
}: HitsProps<T>) => {
  const { items } = useHits<T>(props);
  const { query } = useSearchBox();

  return (
    <Listbox
      {...props}
      classNames={{
        base: "gap-0 p-0",
        list: "gap-0 p-3",
        ...classNames,
      }}
      itemClasses={{
        base: 'px-4 py-4 data-[selected="true"]:bg-primary',
        title: "w-full",
        ...itemClasses,
      }}
      emptyContent={
        typeof emptyContent === "function"
          ? emptyContent(query)
          : emptyContent ||
            (query.length > 0 && (
              <div className="flex items-center text-center flex-col">
                <p>No results for "{query}"</p>
                <p>{emptyDescription}</p>
              </div>
            ))
      }
    >
      {items.map(hitComponent)}
    </Listbox>
  );
};

export default Hits;
