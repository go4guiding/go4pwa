import { ComponentStory, ComponentMeta } from '@storybook/react';

import utilStyles from 'assets/stylesheets/utility.module.scss';

import Accordion, { Context } from './Accordion';
import AccordionItem from './AccordionItem';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UI/Accordion',
  // component: Accordion,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {}
} as ComponentMeta<typeof Accordion>;

// More on accordion templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Accordion> = (args) => (
  <Accordion {...args} story>
    <Context.Consumer>
      {({ expandedItems, onItemChange }) =>
        [
          'Accordion Item 1',
          'Accordion Item 2',
          'Accordion Item 3',
          'Accordion Item 4'
        ].map((item, i) => (
          <AccordionItem
            key={btoa(item + i)}
            label={item}
            expanded={expandedItems.includes(i)}
            onToggled={() => onItemChange(i)}
          >
            <p className={utilStyles.p2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </AccordionItem>
        ))
      }
    </Context.Consumer>
  </Accordion>
);

const ItemTemplate: ComponentStory<typeof AccordionItem> = (args) => (
  <AccordionItem {...args}>
    <p className={utilStyles.p2}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
      veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
      commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </AccordionItem>
);

export const Controller = Template.bind({
  multiple: { type: 'boolean' },
  noCollapseAll: { type: 'boolean' },
  expandedItems: { control: { type: 'array' } },
  onItemsChanged: { table: { disable: true } },
  story: { table: { disable: true } }
});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Controller.args = {
  multiple: false,
  noCollapseAll: false,
  expandedItems: [0]
};

export const Item = ItemTemplate.bind({
  label: { control: { type: 'text' } },
  expanded: { type: 'boolean' },
  color: {
    control: {
      type: 'select',
      options: [
        'primary',
        'accent',
        'secondary',
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
});

// More on args: https://storybook.js.org/docs/react/writing-stories/args
Item.args = {
  label: 'Accordion Item 1',
  expanded: false
  // color: 'primary'
};
