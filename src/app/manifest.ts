import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "FoundSeek App",
    short_name: "FoundSeek",
    description:
      "Tu fuente confiable para tutoriales de tecnología y mucho más. En FoundSeek, encontrarás contenido diverso y de calidad para todos los intereses.",
    start_url: "/",
    display: "standalone",
    background_color: "#fff",
    theme_color: "#fff",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
