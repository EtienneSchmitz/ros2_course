import { defineMermaidSetup } from "@slidev/types";

export default defineMermaidSetup(() => ({
  theme: "dark",
  themeVariables: {
    background: "#161b22",
    primaryColor: "#212833",
    primaryTextColor: "#e6edf3",
    primaryBorderColor: "#40a8c4",
    secondaryColor: "#1f6f8b",
    secondaryTextColor: "#e6edf3",
    secondaryBorderColor: "#40a8c4",
    tertiaryColor: "#262d37",
    tertiaryTextColor: "#e6edf3",
    tertiaryBorderColor: "#40a8c4",
    lineColor: "#9ba7b4",
    textColor: "#e6edf3",
    nodeTextColor: "#e6edf3",
    edgeLabelBackground: "#212833",
    clusterBkg: "#212833",
    clusterBorder: "#40a8c4",
    fontFamily: "'JetBrains Mono Variable', monospace",
  },
  flowchart: {
    htmlLabels: true,
    curve: "basis",
  },
}));
