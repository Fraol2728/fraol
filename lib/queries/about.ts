export const aboutQuery = `*[_type == "about"][0] {
  name,
  role,
  bio,
  avatar,
  resumeUrl,
  skills,
  socialLinks
}`;
