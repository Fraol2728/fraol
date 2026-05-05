import { defineArrayMember, defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Post",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "excerpt", type: "text" }),
    defineField({
      name: "thumbnail",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "tags", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({ type: "block" }),
        defineArrayMember({ type: "image", options: { hotspot: true } }),
        defineArrayMember({ type: "code" }),
      ],
    }),
  ],
});
