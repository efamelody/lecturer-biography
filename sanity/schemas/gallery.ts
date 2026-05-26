import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Media & Activities',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event / Article Title',
      type: 'string',
      description: 'e.g., Discussing Southeast Asian Haze or Keynote Address at AMCA',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'type',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'News & TV Interview', value: 'news-interview' },
          { title: 'Newspaper & Op-Ed Column', value: 'newspaper' },
          { title: 'Conferences & Keynote Events', value: 'conference' },
          { title: 'Media Coverage & Features', value: 'media-coverage' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'outlet',
      title: 'Source / Organizer / Outlet',
      type: 'string',
      description: 'e.g., BBC World News, The Star, Universiti Malaya, Astro Awani',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Event / Publication Date',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'externalUrl',
      title: 'Social Media / Reference Link (Optional)',
      type: 'url',
      description: 'Paste the link to his LinkedIn post, Facebook update, or newspaper website here.',
    }),
    defineField({
      name: 'description',
      title: 'Brief Summary / Caption',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Activity Photo',
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
      subtitle: 'outlet',
      media: 'image',
    },
  },
})
