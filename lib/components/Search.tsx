import { Input, type InputProps } from "@nextui-org/react";
import { useState } from "react";
import { useSearchBox, type UseSearchBoxProps } from "react-instantsearch";

export interface SearchProps
  extends Omit<
      InputProps,
      "value" | "defaultValue" | "onValueChange" | "onClear" | "isClearable"
    >,
    UseSearchBoxProps {
  clearContent?: React.ReactNode;
}

const Search = ({ endContent, clearContent, ...props }: SearchProps) => {
  const { query, refine, clear } = useSearchBox(props);
  const [value, setValue] = useState<string>(query);

  const handleOnValueChange = (value: string) => {
    if (value === query) {
      return;
    }

    refine(value);
    setValue(value);
  };

  const handleOnClear = () => {
    clear();
    setValue("");
  };

  return (
    <Input
      {...props}
      value={value}
      isClearable={false}
      onValueChange={handleOnValueChange}
      endContent={
        <div className="inline-flex items-center gap-2">
          {query.length > 0 && (
            <button
              className={`w-8 h-8 rounded-full border border-default-400 ${props.classNames?.clearButton ?? ""}`}
              onClick={handleOnClear}
            >
              {clearContent}
            </button>
          )}
          {endContent}
        </div>
      }
    />
  );
};

export default Search;
