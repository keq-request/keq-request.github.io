import { ShikiTransformer } from 'shiki'


function parseTitleFromMeta(meta: string): string {
  if (!meta) {
    return ''
  }
  const kvList: string[] = meta.split(' ').filter(Boolean)
  for (const item of kvList) {
    const [k, v = ''] = item.split('=').filter(Boolean)
    if (k === 'title' && v.length > 0) {
      return v.replace(/["'`]/g, '')
    }
  }
  return ''
}

export function transformerAddMeta(): ShikiTransformer {
  return {
    name: 'shiki-transformer:add-meta',
    pre(pre) {
      const title = parseTitleFromMeta(this.options.meta?.__raw)
      if (title.length > 0) {
        pre.properties = {
          ...pre.properties,
          'data-title': title,
        }
      }
      return pre
    },
  }
}
