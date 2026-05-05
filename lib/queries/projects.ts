export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(publishedAt desc) [0...4] {
  _id,
  title,
  slug,
  description,
  thumbnail,
  tags,
  category,
  liveUrl,
  githubUrl
}`;

export const allProjectsQuery = `*[_type == "project"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  description,
  thumbnail,
  tags,
  category,
  liveUrl,
  githubUrl,
  featured
}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  description,
  thumbnail,
  images,
  tags,
  category,
  liveUrl,
  githubUrl,
  publishedAt,
  body
}`;
