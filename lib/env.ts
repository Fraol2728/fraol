const env = {
  sanity: {
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    readToken: process.env.SANITY_API_READ_TOKEN!,
    writeToken: process.env.SANITY_API_WRITE_TOKEN!,
  },
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    name: process.env.NEXT_PUBLIC_SITE_NAME ?? "Portfolio",
    email: process.env.NEXT_PUBLIC_SITE_EMAIL ?? "",
  },
};

export default env;
