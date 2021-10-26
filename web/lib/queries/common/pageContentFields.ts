import slugReference from './slugReference'
import markDefs from './blockEditorMarks'

const pageContentFields = /* groq */ `
  _type == "teaser"=>{
    "type": _type,
    "id": _key,
    overline,
    title,
    text[]{
      ...,
      ${markDefs}, 
    },
    "designOptions": {
      "background": coalesce(background.title, 'White'),
      "imagePosition": coalesce(imagePosition, 'left'),
      imageSize,
    },
    "image": image{
      ...,
      "extension": asset-> extension
    },  
    "action": action[0]{
      _type == "linkSelector" => {
        "id": _key,
        "type": select(
          defined(url) => "externalUrl", "internalUrl"
        ),
        label,
        ariaLabel,
        "link": reference-> {
          "type": _type,
          "slug": ${slugReference}
        },
        "href": url,
      },
      _type == "downloadableFile" => {
        "id": _key,
        "type": _type,
        "label": filename,
        "href": file.asset-> url,
        "extension": file.asset-> extension 
      },
      _type == "downloadableImage" => {
        "id": _key,
        "type": _type,
        label,
        "href": image.asset-> url, 
        "extension": image.asset-> extension 
      },
    }
  },
  _type == "textBlock"=>{
    "type": _type,
    "id": _key,
    overline,
    title,
    ingress[]{
      ...,
      ${markDefs}, 
    },
    text[]{
      ...,
      ${markDefs}, 
    },
    "callToActions": action[]{
        _type == "internalUrl" => {
          "type": _type,
          "id": _key,
          label,
          ariaLabel,
          "link": reference-> {
            "type": _type,
            "slug": ${slugReference}
          },
        },
        _type == "externalUrl" => {
          "id": _key,
          "type": _type,
          label,
          ariaLabel,
          "href": url,
        },
        _type == "downloadableFile" => {
          "id": _key,
          "type": _type,
          "label": filename,
          "href": file.asset-> url,
          "extension": file.asset-> extension 
        },
        _type == "downloadableImage" => {
          "id": _key,
          "type": _type,
          label,
          "href": image.asset-> url, 
          "extension": image.asset-> extension 
        },
      },

    "designOptions": {
      "background": coalesce(background.title, 'White'),
    },
  },
  _type == "fullWidthImage"=>{
    "type": _type,
    "id": _key,
    image
  },
  _type == "figure"=>{
    "type": _type,
    "id": _key,
      // For these images, we don't want crop and hotspot
  // because we don't know the aspect ratio
    "figure": figure{
      _type,
        "image": {
          "asset": image.asset,
          "alt": image.alt,
        },
      attribution,
      caption
    },
    "designOptions": {
      "background": coalesce(background.title, 'White'),
    },
  },
  _type == "textWithIconArray"=>{
    "type": _type,
    "id": _key,
    "group": group[]{
      "id": _key,
      title,
      text[]{
        ...,
        ${markDefs}, 
      },
      icon
    },

    "designOptions": {
      "background": coalesce(background.title, 'none'),
    },
  },
  _type == "pullQuote" => {
    "type": _type,
    "id": _key,
    author,
    authorTitle,
    image,
    quote,
    "designOptions": {
      "imagePosition": coalesce(imagePosition, 'right'),
    }
  },
  _type == "accordion" => {
    "type": _type,
    "id": _key,
    title,
    ingress[]{
      ...,
      ${markDefs}, 
    },
    "accordion": accordion[]{
      "id": _key,
      title,
      content[]{
        ...,
        ${markDefs}, 
      }
    },
    "designOptions": {
      "background": coalesce(background.title, 'none'),
    }
  },
  _type == "promoTileArray"=>{
    "type": _type,
    "id": _key,
    "group": group[]{
      "id": _key,
      title,
      "image": {
        "asset": image.asset,
        "alt": image.alt,
        },
        "action": {
        "label": link.label,
        "ariaLabel": link.ariaLabel,
        "link": link.reference-> {
          "type": _type,
          "slug": ${slugReference}
        },
        "href": link.url,
        "type": select(
          defined(link.url) => "externalUrl",
          "internalUrl"
        ),
      },
      "image": image{
        ...,
        "extension": asset-> extension
      },
      "designOptions": {
        "background": coalesce(background.title, 'none'),
      },
    },
  },
  _type == "iframe" => {
    "type": _type,
    "id": _key,
    title,
    frameTitle,
    url,
    "designOptions": {
      "aspectRatio": coalesce(aspectRatio, '16:9'),
      "background": coalesce(background.title, 'none'),
      height,
    },
  },
`

export default pageContentFields
