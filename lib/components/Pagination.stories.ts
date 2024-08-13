import type { Meta, StoryObj } from "@storybook/react";

import Pagination, { type PaginationProps } from "./Pagination";

const meta: Meta<PaginationProps> = {
  component: Pagination,
  argTypes: {
    variant: {
      type: "string",
      control: "radio",
      options: ["flat", "bordered", "light", "faded"],
    },
    color: {
      type: "string",
      control: "radio",
      options: [
        "default",
        "primary",
        "secondary",
        "success",
        "warning",
        "error",
      ],
    },
    size: {
      type: "string",
      control: "radio",
      options: ["sm", "md", "lg"],
    },
    radius: {
      type: "string",
      control: "radio",
      options: ["none", "sm", "md", "lg", "full"],
    },
    dotsJump: {
      type: "number",
      control: "number",
    },
  },
};

export default meta;

type Story = StoryObj<PaginationProps>;

export const Primary: Story = {
  args: {
    variant: "flat",
    color: "primary",
    size: "md",
    // XL in next ui does not exist
    radius: "md",
    dotsJump: 5,
  },
};
