import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title", maxLength: 96 } }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "icon", type: "string" }),
    defineField({ name: "features", type: "array", of: [defineArrayMember({ type: "string" })] }),
    defineField({ name: "order", type: "number" }),
  ],
});
