export const allServicesQuery = `*[_type == "service"] | order(order asc) {
  _id,
  title,
  slug,
  description,
  icon,
  features,
  order
}`;
