import type { MetadataRoute } from "next";
import { site } from "@/data/site";

const paths = ["", "/about", "/events", "/events/journal-club", "/team", "/resources", "/get-involved", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "weekly", priority: p === "" ? 1 : 0.7 }));
}
