import { defineField, defineType } from "sanity";

export const listing = defineType({
  name: "listing",
  title: "Listing",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "price",
      title: "Price ($)",
      type: "number",
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Furniture", value: "furniture" },
          { title: "Horse Brass", value: "horse-brass" },
          { title: "Fusion Paint (shows on Fusion Paint page)", value: "paint" },
          { title: "Home Décor", value: "home-decor" },
          { title: "Other", value: "other" },
        ],
      },
      initialValue: "other",
    }),
    defineField({
      name: "image",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "sold",
      title: "Sold",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "title", price: "price", media: "image", sold: "sold" },
    prepare({ title, price, media, sold }) {
      return {
        title: sold ? `${title} (Sold)` : title,
        subtitle: `$${price}`,
        media,
      };
    },
  },
});
