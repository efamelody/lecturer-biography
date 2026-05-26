import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'member',
  title: 'Group Members',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Current Position',
      type: 'string',
      description: 'e.g., PhD Candidate, Research Assistant, Postdoctoral Fellow',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Current Member', value: 'member' },
          { title: 'Alumni', value: 'alumni' },
        ],
        layout: 'radio',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'researchTopic',
      title: 'Research Topic / Project Title',
      type: 'text',
      description: 'Brief description of what they are working on.',
    }),
    defineField({
      name: 'biography',
      title: 'Short Biography (Optional)',
      type: 'text',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Use numbers (1, 2, 3) to control who shows up first.',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
    },
  },
})
