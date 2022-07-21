import { ComponentStory, ComponentMeta } from '@storybook/react';

import Component, { ButtonProps } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI',
  component: Component,
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
} as ComponentMeta<typeof Component>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Component> = (args: ButtonProps) => (
  <Component {...args}>
    <span>Button</span>
  </Component>
);

export const Button = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Button.args = { color: 'none', block: false };
