import type { Meta, StoryObj } from "@storybook/react";

import Drawer, { type DrawerProps } from "./Drawer";
import { useState } from "react";

const meta: Meta<DrawerProps> = {
  component: Drawer,
  argTypes: {},
};

export default meta;

type Story = StoryObj<DrawerProps>;

export const Primary: Story = {
  args: {
    size: 300,
  },
  render: (props: Partial<DrawerProps>) => {
    const [isOpen, setIsOpen] = useState<boolean>(props.isOpen ?? true);

    return (
      <Drawer {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    );
  },
};
