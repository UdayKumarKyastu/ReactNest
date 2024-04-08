import 'twin.macro'

declare module 'twin.macro' {
  import styledImport from '@emotion/styled'

  // The styled and css imports
  const styled: typeof styledImport
  const css: typeof cssImport
}

declare module '*.png'
