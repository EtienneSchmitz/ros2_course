import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import rehypeMermaid from "rehype-mermaid";

export default defineConfig({
  site: "https://ros2.etienne-schmitz.com",
  trailingSlash: "ignore",

  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      [rehypeKatex, {}],
      [rehypeMermaid, { strategy: "img-svg" }],
    ],
  },

  integrations: [
    starlight({
      title: "ROS 2 — Bootcamp",
      description: "Cours intensif ROS 2 — base mobile Kiwi + bras SO-101.",
      defaultLocale: "root",
      locales: {
        root: { label: "Français", lang: "fr" },
      },
      logo: {
        src: "@bootcamp/theme/assets/logo-arm.svg",
        replacesTitle: true,
      },
      favicon: "/favicon.svg",
      head: [
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css",
            integrity:
              "sha384-nB0miv6/jRmo5UMMR1wu3Gz6NLsoTkbqJghGIsx//Rlm+ZU03BU6SQNC66uf4l5+",
            crossorigin: "anonymous",
          },
        },
      ],
      customCss: ["@bootcamp/theme/starlight.css"],
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/EtienneSchmitz/ros2_course",
        },
      ],
      editLink: {
        baseUrl:
          "https://github.com/EtienneSchmitz/ros2_course/edit/main/apps/docs/",
      },
      sidebar: [
        { label: "Accueil", link: "/" },
        {
          label: "Installation",
          items: [{ autogenerate: { directory: "installation" } }],
        },
        {
          label: "Jour 1 — Introduction",
          items: [{ autogenerate: { directory: "introduction" } }],
        },
        {
          label: "Jour 2 — Navigation",
          items: [{ autogenerate: { directory: "navigation" } }],
        },
        {
          label: "Jour 3 — Manipulation",
          items: [{ autogenerate: { directory: "manipulation" } }],
        },
        {
          label: "Jour 4 — Vision",
          items: [{ autogenerate: { directory: "vision" } }],
        },
        {
          label: "Jour 5 — Intégration",
          items: [{ autogenerate: { directory: "integration" } }],
        },
      ],
    }),
  ],
});
