import {
  Snippet as InstantSnippet,
  type SnippetProps as InstantSnippetProps,
} from "react-instantsearch";
import type { Hit, BaseHit } from "instantsearch.js";

interface SnippetProps<T extends Hit<BaseHit>> extends InstantSnippetProps<T> {}

const Snippet = <T extends Hit<BaseHit>>({
  classNames,
  ...props
}: SnippetProps<T>) => {
  return (
    <InstantSnippet
      {...props}
      classNames={{
        ...classNames,
        root: `line-clamp-1 ${classNames?.root ?? ""}`,
        highlighted: `bg-primary-200 rounded-sm ${classNames?.highlighted ?? ""}`,
      }}
    />
  );
};

export default Snippet;
