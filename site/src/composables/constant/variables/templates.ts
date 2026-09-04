import { PREVIEW_SELECTOR } from "./render";
import type { ResumeStyles } from "../../stores/style";
import {
  DEFAULT_MD_CONTENT,
  DEFAULT_CSS_CONTENT,
  DEFAULT_STYLES
} from "./default";

export type ResumeTemplate = {
  /**
   * Unique id of the template
   */
  id: string;

  /**
   * i18n key of the template name
   */
  name: string;

  /**
   * i18n key of the template description
   */
  desc: string;

  /**
   * Accent color used by the template preview card
   */
  accent: string;

  /**
   * Example markdown content
   */
  markdown: string;

  /**
   * CSS skeleton. `PREVIEW_SELECTOR` will be replaced with the actual
   * element id when injected.
   */
  css: string;

  /**
   * Default toolbar styles
   */
  styles: ResumeStyles;
};

const commonMarkdown = DEFAULT_MD_CONTENT;

export const TEMPLATES: ResumeTemplate[] = [
  {
    id: "classic",
    name: "template.classic",
    desc: "template.classic_desc",
    accent: "#377bb5",
    markdown: commonMarkdown,
    css: DEFAULT_CSS_CONTENT,
    styles: DEFAULT_STYLES
  },
  {
    id: "modern",
    name: "template.modern",
    desc: "template.modern_desc",
    accent: "#0d9488",
    markdown: commonMarkdown,
    styles: {
      marginV: 45,
      marginH: 50,
      lineHeight: 1.5,
      paragraphSpace: 6,
      themeColor: "#0d9488",
      fontCJK: {
        name: "华康宋体",
        fontFamily: "HKST"
      },
      fontEN: {
        name: "Arial"
      },
      fontSize: 14,
      paper: "A4"
    } as ResumeStyles,
    css: `/* Modern template: clean sans-serif, left-bar headings */

${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: #1f2937;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

${PREVIEW_SELECTOR} p,
${PREVIEW_SELECTOR} li,
${PREVIEW_SELECTOR} dl {
  margin: 0;
}

${PREVIEW_SELECTOR} h1 {
  font-size: 2em;
  font-weight: 300;
  letter-spacing: 0.02em;
}

${PREVIEW_SELECTOR} h2,
${PREVIEW_SELECTOR} h3 {
  font-size: 1.15em;
  font-weight: 600;
  margin-bottom: 6px;
}

${PREVIEW_SELECTOR} h2 {
  padding-left: 10px;
  border-left-style: solid;
  border-left-width: 3px;
}

${PREVIEW_SELECTOR} ul,
${PREVIEW_SELECTOR} ol {
  padding-left: 1.5em;
  margin: 0.2em 0;
}

${PREVIEW_SELECTOR} ul {
  list-style-type: square;
}

${PREVIEW_SELECTOR} dl {
  display: flex;
}

${PREVIEW_SELECTOR} dl dt,
${PREVIEW_SELECTOR} dl dd:not(:last-child) {
  flex: 1;
}

${PREVIEW_SELECTOR} .resume-header {
  text-align: center;
}

${PREVIEW_SELECTOR} .resume-header h1 {
  text-align: center;
  line-height: 1;
  margin-bottom: 8px;
  font-weight: 600;
}

${PREVIEW_SELECTOR} .resume-header-item:not(.no-separator)::after {
  content: " · ";
}

.dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: hsl(222, 47%, 11%);
  color: hsl(210, 40%, 96%);
}

@media print {
  .dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
    background-color: white;
    color: black;
  }
}`
  },
  {
    id: "colorful",
    name: "template.colorful",
    desc: "template.colorful_desc",
    accent: "#7c3aed",
    markdown: commonMarkdown,
    styles: {
      marginV: 45,
      marginH: 45,
      lineHeight: 1.4,
      paragraphSpace: 8,
      themeColor: "#7c3aed",
      fontCJK: {
        name: "霞鹜文楷",
        fontFamily: "LXGW WenKai"
      },
      fontEN: {
        name: "Georgia"
      },
      fontSize: 15,
      paper: "A4"
    } as ResumeStyles,
    css: `/* Colorful template: bold accent blocks and dotted dividers */

${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: #111827;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

${PREVIEW_SELECTOR} p,
${PREVIEW_SELECTOR} li,
${PREVIEW_SELECTOR} dl {
  margin: 0;
}

${PREVIEW_SELECTOR} h1 {
  font-size: 2em;
  font-weight: 700;
}

${PREVIEW_SELECTOR} h2,
${PREVIEW_SELECTOR} h3 {
  font-size: 1.2em;
  font-weight: 700;
  margin-bottom: 6px;
}

${PREVIEW_SELECTOR} h2 {
  padding-bottom: 4px;
  border-bottom-style: dashed;
  border-bottom-width: 1px;
}

${PREVIEW_SELECTOR} ul,
${PREVIEW_SELECTOR} ol {
  padding-left: 1.5em;
  margin: 0.2em 0;
}

${PREVIEW_SELECTOR} ul {
  list-style-type: disc;
}

${PREVIEW_SELECTOR} dl {
  display: flex;
}

${PREVIEW_SELECTOR} dl dt,
${PREVIEW_SELECTOR} dl dd:not(:last-child) {
  flex: 1;
}

${PREVIEW_SELECTOR} .resume-header {
  text-align: center;
  padding: 10px 14px;
  margin-bottom: 10px;
}

${PREVIEW_SELECTOR} .resume-header h1 {
  text-align: center;
  line-height: 1.1;
  margin-bottom: 6px;
}

${PREVIEW_SELECTOR} .resume-header-item:not(.no-separator)::after {
  content: " ✦ ";
}

.dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: hsl(222, 47%, 11%);
  color: hsl(210, 40%, 96%);
}

@media print {
  .dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
    background-color: white;
    color: black;
  }
}`
  },
  {
    id: "elegant",
    name: "template.elegant",
    desc: "template.elegant_desc",
    accent: "#d97706",
    markdown: commonMarkdown,
    styles: {
      marginV: 55,
      marginH: 55,
      lineHeight: 1.55,
      paragraphSpace: 12,
      themeColor: "#b45309",
      fontCJK: {
        name: "华康宋体",
        fontFamily: "HKST"
      },
      fontEN: {
        name: "Minion Pro"
      },
      fontSize: 15,
      paper: "A4"
    } as ResumeStyles,
    css: `/* Elegant template: centered headings, hairline dividers */

${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: white;
  color: #1c1917;
  text-align: justify;
  -moz-hyphens: auto;
  -ms-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}

${PREVIEW_SELECTOR} p,
${PREVIEW_SELECTOR} li,
${PREVIEW_SELECTOR} dl {
  margin: 0;
}

${PREVIEW_SELECTOR} h1 {
  font-size: 2.1em;
  font-weight: 500;
  letter-spacing: 0.06em;
}

${PREVIEW_SELECTOR} h2,
${PREVIEW_SELECTOR} h3 {
  font-size: 1.1em;
  font-weight: 500;
  letter-spacing: 0.04em;
  margin-bottom: 8px;
}

${PREVIEW_SELECTOR} h2 {
  text-align: center;
  padding-bottom: 6px;
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

${PREVIEW_SELECTOR} ul,
${PREVIEW_SELECTOR} ol {
  padding-left: 1.5em;
  margin: 0.3em 0;
}

${PREVIEW_SELECTOR} ul {
  list-style-type: circle;
}

${PREVIEW_SELECTOR} dl {
  display: flex;
}

${PREVIEW_SELECTOR} dl dt,
${PREVIEW_SELECTOR} dl dd:not(:last-child) {
  flex: 1;
}

${PREVIEW_SELECTOR} .resume-header {
  text-align: center;
  margin-bottom: 14px;
}

${PREVIEW_SELECTOR} .resume-header h1 {
  text-align: center;
  line-height: 1;
  margin-bottom: 10px;
}

${PREVIEW_SELECTOR} .resume-header-item:not(.no-separator)::after {
  content: " | ";
}

.dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
  background-color: hsl(20, 14%, 8%);
  color: hsl(40, 30%, 92%);
}

@media print {
  .dark ${PREVIEW_SELECTOR} [data-scope="vue-smart-pages"][data-part="page"] {
    background-color: white;
    color: black;
  }
}`
  }
];

export const DEFAULT_TEMPLATE_ID = TEMPLATES[0].id;

export const getTemplateById = (id?: string) =>
  TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
