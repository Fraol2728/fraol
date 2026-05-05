import { defineArrayMember, defineField, defineType } from "sanity";

export const project = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "description", type: "text", validation: (Rule) => Rule.required() }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
        }),
      ],
    }),
    defineField({ name: "tags", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["Web Development", "Graphic Design", "Branding", "Motion", "Other"],
      },
    }),
    defineField({ name: "liveUrl", type: "url" }),
    defineField({ name: "githubUrl", type: "url" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "body", type: "array", of: [defineArrayMember({ type: "block" })] }),
  ],
});
