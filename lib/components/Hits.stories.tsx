import type { Meta, StoryObj } from "@storybook/react";

import Hits from "./Hits";
import { ListboxItem } from "@nextui-org/react";
import Highlight from "./Highlight";

const meta: Meta<typeof Hits> = {
  component: Hits,
};

export default meta;

type Story = StoryObj<typeof Hits<{ title: string }>>;

export const Primary: Story = {
  args: {
    hitComponent: (hit, index) => (
      <ListboxItem
        key={index}
        title={<Highlight attribute="title" hit={hit} />}
      />
    ),
  },
};
