import {
  Chip,
  Checkbox,
  CheckboxGroup,
  type CheckboxProps,
  type ChipProps,
  type ChipSlots,
  type CheckboxGroupProps,
  type CheckboxSlots,
  type SlotsToClasses,
} from "@nextui-org/react";
import { UseRefinementListProps, useRefinementList } from "react-instantsearch";

export interface RefinementListProps
  extends Omit<CheckboxGroupProps, "children" | "value">,
    UseRefinementListProps {
  checkboxProps?: Omit<CheckboxProps, "children" | "classNames">;
  checkboxClassNames?: SlotsToClasses<CheckboxSlots>;
  chipProps?: Omit<ChipProps, "children" | "classNames">;
  chipClassNames?: SlotsToClasses<ChipSlots>;
}

const RefinementList = ({
  checkboxClassNames,
  chipClassNames,
  checkboxProps,
  chipProps,
  ...props
}: RefinementListProps) => {
  const { items, refine } = useRefinementList(props);

  // Methods.
  const handleOnChange = (isSelected: boolean, value: string) => {
    if (
      isSelected &&
      items
        .filter((item) => item.isRefined)
        .map((item) => item.value)
        .includes(value)
    ) {
      return;
    }

    refine(value);
  };

  // Render.
  if (items.length === 0) {
    return null;
  }

  return (
    <CheckboxGroup
      value={items.filter((item) => item.isRefined).map((item) => item.value)}
      {...props}
    >
      {items.map((item) => (
        <Checkbox
          key={item.value}
          value={item.value}
          onValueChange={(isSelected) => handleOnChange(isSelected, item.value)}
          classNames={{
            ...checkboxClassNames,
            label: `inline-flex gap-2 ${checkboxClassNames?.label ?? ""}`,
          }}
          {...checkboxProps}
        >
          {item.label}
          <Chip
            size="sm"
            color="primary"
            classNames={chipClassNames}
            {...chipProps}
          >
            {item.count}
          </Chip>
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default RefinementList;
