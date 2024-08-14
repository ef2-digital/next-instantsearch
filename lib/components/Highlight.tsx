import {
  Highlight as InstantHighlight,
  type HighlightProps as InstantHighlightProps,
} from "react-instantsearch";
import type { Hit, BaseHit } from "instantsearch.js";

export interface HighlightProps<T extends Hit<BaseHit>>
  extends InstantHighlightProps<T> {}

const Highlight = <T extends Hit<BaseHit>>({
  classNames,
  ...props
}: HighlightProps<T>) => {
  return (
    <InstantHighlight
      {...props}
      classNames={{
        ...classNames,
        root: `line-clamp-1 ${classNames?.root ?? ""}`,
        highlighted: `bg-primary-200 rounded-sm ${classNames?.highlighted ?? ""}`,
      }}
    />
  );
};

export default Highlight;
