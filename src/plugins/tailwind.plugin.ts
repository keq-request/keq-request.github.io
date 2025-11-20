import { Plugin, PostCssOptions } from '@docusaurus/types'
import tailwindcss from '@tailwindcss/postcss'


export default function tailwindPlugin(context, options): Plugin {
  return {
    name: 'tailwind-plugin',
    configurePostCss(postcssOptions: PostCssOptions) {
      postcssOptions.plugins = [tailwindcss]
      return postcssOptions
    },
  }
}
