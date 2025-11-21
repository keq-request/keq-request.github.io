import { useState, useEffect } from 'react'
import { BundledLanguage, codeToHtml, SpecialLanguage, StringLiteralUnion } from 'shiki'
import rehypeShikiOptions from '@site/src/shiki/options'


export function useShikiHighlighter(code: string, lang: StringLiteralUnion<BundledLanguage | SpecialLanguage>): string {
  const [html, setHtml] = useState<string>('')

  useEffect(() => {
    ;void (async () => {
      const shikiHtml = await codeToHtml(code, {
        lang: lang,
        themes: rehypeShikiOptions.themes,
        transformers: rehypeShikiOptions.transformers,
      })

      setHtml(shikiHtml)
    })()
  }, [code, lang])

  return html as string
}
