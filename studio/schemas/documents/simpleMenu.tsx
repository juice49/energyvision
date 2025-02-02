import React from 'react'

export default {
  type: 'document',
  title: `Site menu(simple)`,
  name: `simpleMenu`,
  __experimental_actions: ['create', 'update', 'publish' /*,"delete"*/],
  fields: [
    {
      title: 'Menu groups',
      name: 'group',
      type: 'array',
      of: [
        {
          type: 'simpleMenuGroup',
        },
        { type: 'simpleMenuLink' },
      ],
    },
  ],
}
