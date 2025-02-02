import React from 'react'
import { Wrapper, Frame } from './styles/shared'
import { baseUrl } from '../../../resolveProductionUrl'
import getPreviewLocale from '../helpers/getPreviewLocale'

export default function PagePreview(props: any) {
  const {
    document: { displayed },
  } = props

  if (!displayed?._id) {
    // This should never happen
    return <div>The content needs an id before it can be previewed.</div>
  }

  const locale = getPreviewLocale(displayed._lang)

  const url = `${baseUrl}/${locale}/${displayed?._id}`
  // const url = resolveProductionUrl(displayed)
  console.log('preview url', url)
  return (
    <Wrapper>
      <Frame src={url} title="preview" frameBorder={'0'} />
    </Wrapper>
  )
}
