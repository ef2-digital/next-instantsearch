import {
  Pagination as NextPagination,
  PaginationProps as NextPaginationProps,
} from "@nextui-org/react";
import { useMemo } from "react";
import { UsePaginationProps, usePagination } from "react-instantsearch";

export interface PaginationProps
  extends Omit<NextPaginationProps, "total" | "page" | "onChange">,
    UsePaginationProps {}

const Pagination = ({ ...props }: PaginationProps) => {
  const { nbPages, currentRefinement, refine } = usePagination(props);

  // Methods.
  const handleOnChange = (page: number) => {
    refine(page - 1);
  };

  const page = useMemo(() => currentRefinement + 1, [currentRefinement]);

  return (
    <NextPagination
      total={nbPages}
      page={page}
      onChange={handleOnChange}
      {...props}
    />
  );
};

export default Pagination;
