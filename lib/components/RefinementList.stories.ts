import type { Meta, StoryObj } from "@storybook/react";

import RefinementList from "./RefinementList";

const meta: Meta<typeof RefinementList> = {
  component: RefinementList,
};

export default meta;

type Story = StoryObj<typeof RefinementList>;

export const Primary: Story = {
  args: {
    attribute: "filters",
  },
};
