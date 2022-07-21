import { ComponentStory, ComponentMeta } from '@storybook/react';

// import utilStyles from 'assets/stylesheets/utility.module.scss';
import Button from 'components/ui/button';
import Appbar from './Appbar';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Appbar',
  component: Appbar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    color: {
      control: 'select',
      options: [
        'default',
        'primary',
        'accent',
        'light',
        'dark',
        'know-myself',
        'express-myself',
        'be-well',
        'have-adventures',
        'take-action',
        'skills-for-my-future'
      ]
    }
  }
} as ComponentMeta<typeof Appbar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Appbar> = (args) => (
  <Appbar {...args}>
    <Button>Back</Button>
    <span>Appbar</span>
    <Button>Menu</Button>
  </Appbar>
);

export const Mobile = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Mobile.args = {};
