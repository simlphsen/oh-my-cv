import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  presetWebFonts,
  transformerDirectives,
  transformerVariantGroup
} from "unocss";
import { i18n } from "./configs/i18n";
import presetAnimations from "unocss-preset-animations";
import { presetShadcn } from "unocss-preset-shadcn";

export default defineConfig({
  shortcuts: [
    {
      "flex-center": "flex items-center justify-center",
      hstack: "flex items-center",
      "hide-on-mobile": "lt-md:hidden",
      "ring-when-focus":
        "ring-offset-background focus-visible:(outline-none ring-2 ring-ring ring-offset-2)",
      "shadow-c": "shadow shadow-gray-300 dark:shadow-neutral-900",
      "resume-card":
        "relative mx-auto rounded-md duration-150 hover:(-translate-y-3 drop-shadow-xl)"
    }
  ],
  preflights: [
    {
      getCSS: () => `
        :root {
          --success: 142 71% 29%;
          --info: 224 77% 48%;
        }

        .dark {
          --success: 142 76% 40%;
          --info: 209 87% 57%;
        }
      `
    }
  ],
  theme: {
    breakpoints: {
      sm: "641px",
      md: "769px",
      lg: "1025px"
    },
    colors: {
      success: "hsl(var(--success))",
      info: "hsl(var(--info))"
    }
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      extraProperties: {
        display: "inline-block"
      }
    }),
    presetWebFonts({
      fonts: {
        ui: "Lato:400,700"
      }
    }),
    presetAnimations(),
    presetShadcn(
      {
        color: {
          base: "blue",
          light: {
            background: "210 40% 98%",
            foreground: "222 47% 11%",
            card: "0 0% 100%",
            "card-foreground": "222 47% 11%",
            popover: "0 0% 100%",
            "popover-foreground": "222 47% 11%",
            secondary: "217 33% 94%",
            "secondary-foreground": "222 47% 20%", // slate-800
            muted: "217 33% 94%", // slate-200
            "muted-foreground": "215 16% 47%", // slate-500
            accent: "217 33% 95%", // slate-100
            "accent-foreground": "222 47% 15%", // slate-800
            border: "216 19% 87%", // slate-300
            input: "216 19% 87%" // slate-300
          },
          dark: {
            background: "222 47% 11%",
            foreground: "210 40% 98%",
            card: "222 47% 13%",
            "card-foreground": "210 40% 98%",
            popover: "222 47% 13%",
            "popover-foreground": "210 40% 98%",
            secondary: "217 33% 18%",
            "secondary-foreground": "210 40% 98%", // slate-100
            muted: "217 33% 17%",
            "muted-foreground": "215 20% 65%", // slate-400
            accent: "217 33% 16%",
            "accent-foreground": "210 40% 98%", // slate-100
            border: "217 33% 24%",
            input: "217 33% 24%"
          }
        }
      },
      false
    )
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  content: {
    pipeline: {
      // https://github.com/fisand/unocss-preset-shadcn
      include: [/\.ts/, /\.vue$/, /\.vue\?vue/]
    }
  },
  // @ts-expect-error icon is a customized key
  safelist: i18n.locales.map((item) => item.icon)
});
