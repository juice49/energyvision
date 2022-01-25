import type { LinkData } from '../../types/types'

export const getUrlFromAction = ({
  link,
  href = '',
  staticUrl = '',
  type,
  isStatic,
  fileName,
}: LinkData): string | false => {
  if (!type && !href && !staticUrl) return false

  // @TODO: Remove this when the static AEM content is gone
  if (isStatic) {
    return staticUrl
  }

  if (type === 'internalUrl') {
    // @TODO: Update Will there be more cases in the future?
    if (link?.type === 'news') return `/news/${link?.slug}`

    return link?.slug || ''
  }
  if (!href) {
    console.warn('Missing external url in action')
  }

  if (type === 'downloadableFile' && fileName) {
    return href + '?' + fileName.replace(/ /g, '-')
  }

  return href || '/'
}
