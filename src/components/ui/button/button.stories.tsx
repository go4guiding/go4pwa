import { ComponentStory, ComponentMeta } from '@storybook/react';

import Button, { ButtonProps } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      control: 'select',
      options: ['none', 'primary', 'accent', 'secondary', 'dark']
    },
    size: {
      control: 'select',
      options: ['normal', 'small', 'large']
    }
  }
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = (args: ButtonProps) => (
  <Button {...args}>
    <span>Button</span>
  </Button>
);

export const Base = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Base.args = { color: 'none' };
