import type { Meta, StoryObj } from "@storybook/react";

import CommandPallete from "./CommandPallete";

const meta: Meta<typeof CommandPallete> = {
  component: CommandPallete,
};

export default meta;

type Story = StoryObj<typeof CommandPallete>;

export const Primary: Story = {
  args: {
    configure: {
      hitsPerPage: 5,
      attributesToSnippet: ["description:20"],
    },
    onSelect: (hit) => console.log(hit),
  },
};
