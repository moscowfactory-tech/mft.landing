import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://moscowfactory.tech", lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    { url: "https://moscowfactory.tech/cases", lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: "https://moscowfactory.tech/services", lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: "https://moscowfactory.tech/privacy", lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
    { url: "https://moscowfactory.tech/personal-data", lastModified: new Date(), changeFrequency: "yearly", priority: 0.2 },
  ];
}
