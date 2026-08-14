import type { MetadataRoute } from "next";

const BASE_URL = "https://pembertonco.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/customer-portal-demo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/dispatch-demo`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];
}
