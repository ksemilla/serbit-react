import { CSSVariablesResolver } from "@mantine/core"

// TODO
export const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--mantine-hero-height": theme.other.heroHeight,
  },
  light: {
    "--mantine-color-navbar-box": theme.colors.gray[0],
  },
  dark: {
    "--mantine-color-navbar-box": theme.colors.dark[6],
  },
})
