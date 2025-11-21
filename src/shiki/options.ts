import { type RehypeShikiOptions } from '@shikijs/rehype'
import { transformerAddMeta } from './transformer-add-meta'
import { transformerMetaHighlight, transformerNotationDiff, transformerNotationErrorLevel, transformerNotationFocus } from '@shikijs/transformers'
import { bundledLanguages } from 'shiki'

export default {
  themes: { light: 'github-light', dark: 'github-dark' },
  transformers: [
    transformerAddMeta(),
    transformerMetaHighlight(),
    transformerNotationDiff(),
    transformerNotationFocus(),
    transformerNotationErrorLevel(),
  ],
  langs: Object.keys(bundledLanguages) as Array<keyof typeof bundledLanguages>,
} satisfies RehypeShikiOptions
