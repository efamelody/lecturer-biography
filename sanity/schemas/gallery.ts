import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'News Interview', value: 'news-interview' },
          { title: 'Newspaper', value: 'newspaper' },
          { title: 'Key Activities & Events', value: 'key-activity' },
          { title: 'Media Coverage', value: 'media-coverage' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'eventDate',
      title: 'Event Date',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'type',
      media: 'image',
    },
  },
})
