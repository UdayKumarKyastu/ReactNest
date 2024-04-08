import * as React from 'react'
import { format, add } from 'date-fns'
import { CONFIG } from './lib/consts'
import { Locale } from '../../../i18n/Locale'
import { Translation } from '../../../i18n/Translation'
import { ProductVariant } from '../../model/product-variant'
import labelMachineFont from './customFonts/pret.ttf'
import LoadingSpinner from '../../../common/components/LoadingSpinner/LoadingSpinner'
import { RecipeType } from '../../../../shared/recipe-type'
import { HamiltonGrant } from '../../model/hamilton-grant'
import { Notice } from '@pretamanger/component-library'
import JsBarcode from 'jsbarcode'

interface TranslatableSections {
  ingredientsPrefix: string
  allergenStatement: string
  nutritionalInformationPrefix: string
  nutritionalInformationDescription: string
  useByPrefix: string
  sellByPrefix: string
  weightPrefix: string
  productServesPrefix: string
  legalTitlePlaceholder: string
  productNamePlaceholder: string
  ingredientsPlaceholder: string
  storageConditionsPlaceholder: string
}

export function addDaysToToday(days: number) {
  return format(add(new Date(), { days: days }), 'dd LLL')
}

export function formatNutritionToString(
  nutriton: ProductVariant['hamiltonGrant']['nutrition'],
  locale: Locale.Lang,
) {
  if (!nutriton.length) {
    return ''
  }

  return nutriton.reduce((prev: string, curr) => {
    const label = curr.localisedLabel[locale]

    const valueToJoinTo = prev.length > 0 ? `${prev}, ` : prev

    return valueToJoinTo + `${label} ${curr.per100g?.toFixed(1)}/${curr.perServing?.toFixed(1)}`
  }, '')
}

export function formatCaloriesToString(calories: HamiltonGrant.NutritionItem, locale: Locale.Lang) {
  return `${calories.localisedLabel[locale]} ${calories.perServing?.toFixed(1)}`
}

export function getLines(ctx: CanvasRenderingContext2D, text: string, maxWidth: number) {
  let words = text.split(' ')
  let lines = []
  let currentLine = words[0]
  for (var i = 1; i < words.length; i++) {
    let word = words[i]
    let width = ctx.measureText(currentLine + ' ' + word).width

    if (width < maxWidth) {
      currentLine += ' ' + word
    } else {
      lines.push(currentLine)
      currentLine = word
    }
  }
  lines.push(currentLine)

  return lines
}

function convertFontSize(point: number) {
  return (point * CONFIG.fontScale) / 100
}

function embolden(text: string) {
  return text.replace(/<b>(.*?)<\/b>/g, function (word, tobold) {
    let str = ''
    let bold = ''
    for (let i = 0; i < tobold.length; i++) {
      let ch = tobold.substring(i, i + 1)
      if (ch === ' ') {
        bold += ' '
      } else {
        bold += String.fromCodePoint(ch.charCodeAt(0) + 16384)
      }
    }
    if (bold.length > 0) {
      str += bold
    }

    return str
  })
}

function generateBarcodeBlock(
  ctx: CanvasRenderingContext2D,
  { barCodeValue, x, y, width }: { barCodeValue: string; x: number; y: number; width: number },
) {
  const canvas = document.createElement('canvas')
  JsBarcode(canvas, barCodeValue, {
    format: 'EAN13',
    width: 3.5,
    height: 125,
    displayValue: true,
    fontSize: 26,
    textMargin: 0,
  })

  const barcodeURL = canvas.toDataURL('image/png')
  let barCodeImage = new Image()
  barCodeImage.src = barcodeURL

  const lines = getLines(ctx, barCodeValue, width)
  for (let line of lines) {
    if (line.length > 0) {
      barCodeImage.onload = () => {
        ctx.drawImage(barCodeImage, x, y)
      }
      y += 1
    }
  }
  return y
}

export function generateTextBlock(
  ctx: CanvasRenderingContext2D,
  {
    text,
    x,
    y,
    width,
    fontSize,
  }: { text: string; x: number; y: number; width: number; fontSize: number },
) {
  if (fontSize) {
    ctx.font = ctx.font = `normal ${fontSize}pt Pret`
  }
  const lines = getLines(ctx, embolden(text), width)
  for (let line of lines) {
    if (line.length > 0) {
      ctx.fillText(line, x, y)
      y += CONFIG.lineHeight / 10
    }
  }

  return y
}

// To avoid any issues around items being under-weighed, Pret print label weights at a 10% reduction
export function getReducedDisplayWeight(weight: number | string) {
  const percentageOfWeightToDisplay = 0.9
  const weightAsNumber = typeof weight === 'string' ? parseFloat(weight) : weight
  const reducedWeight = weightAsNumber * percentageOfWeightToDisplay

  return Math.round(reducedWeight)
}

function draw(
  canvas: HTMLCanvasElement,
  locale: Locale.Lang,
  product: ProductVariant,
  translations: TranslatableSections,
  validateLabelSize: (isTooLong: boolean) => void,
) {
  const ctx = canvas.getContext('2d')
  if (!ctx) {
    return
  }

  // Build initial shape and outline
  ctx.strokeStyle = 'black'
  ctx.beginPath()
  ctx.lineWidth = 1
  ctx.fillStyle = 'white'
  ctx.fillRect(0, 0, CONFIG.labelWidth, CONFIG.labelHeight)
  ctx.rect(0, 0, CONFIG.labelWidth, CONFIG.labelHeight)
  ctx.stroke()

  // Black text setup
  ctx.fillStyle = 'black'
  ctx.textBaseline = 'top'

  // LEFT COLUMN BEGINS
  let y = CONFIG.startingYLeftCol

  y = generateTextBlock(ctx, {
    text: product.name[locale] || translations.productNamePlaceholder,
    x: CONFIG.startingXLeftCol,
    y,
    width: CONFIG.leftColunmnWidth,
    fontSize: convertFontSize(CONFIG.productTitleFontSize),
  })

  // Product description always starts at this position on the label
  y = 45

  y = generateTextBlock(ctx, {
    text: product.labelling.legalTitle || translations.legalTitlePlaceholder,
    x: CONFIG.startingXLeftCol,
    y,
    width: CONFIG.leftColunmnWidth,
    fontSize: convertFontSize(CONFIG.mainFontSize),
  })

  y = generateTextBlock(ctx, {
    text: `<b>${translations.ingredientsPrefix}</b> ${
      product.hamiltonGrant.ingredients[locale] || translations.ingredientsPlaceholder
    }`,
    x: CONFIG.startingXLeftCol,
    y: y,
    width: CONFIG.leftColunmnWidth,
    fontSize: convertFontSize(CONFIG.mainFontSize),
  })

  // Draw red outline if content overflows
  if (y > CONFIG.labelHeight) {
    ctx.strokeStyle = '#D60000'
    ctx.lineWidth = 6
    ctx.stroke()

    validateLabelSize(true)
  }

  // RIGHT COLUMN BEGINS
  y = CONFIG.startingYRightCol

  if (product.labelling.includeNutritionalInformationOnLabel) {
    let nutritionalInformationDescription = `${
      translations.nutritionalInformationDescription
    } ${formatNutritionToString(product.hamiltonGrant.nutrition, locale)}`

    if (product.hamiltonGrant.recipeTypes?.includes(RecipeType.PLATTER)) {
      const productCalories = product.hamiltonGrant.nutrition.find(
        ({ name }) => name === 'Energy (KCal)',
      )

      nutritionalInformationDescription = productCalories
        ? formatCaloriesToString(productCalories, locale)
        : ''
    }

    y = generateTextBlock(ctx, {
      text: `<b>${translations.nutritionalInformationPrefix}</b> - ${nutritionalInformationDescription}`,
      x: CONFIG.startingXRightCol,
      y,
      width: CONFIG.rightColumnWidth,
      fontSize: convertFontSize(CONFIG.mainFontSize),
    })
  }

  if (product.labelling.countryOfOriginDescription) {
    y = generateTextBlock(ctx, {
      text: product.labelling.countryOfOriginDescription,
      x: CONFIG.startingXRightCol,
      y,
      width: CONFIG.rightColumnWidth,
      fontSize: convertFontSize(CONFIG.mainFontSize),
    })
  }

  if (product.hamiltonGrant.recipeTypes?.includes(RecipeType.PLATTER)) {
    y = generateTextBlock(ctx, {
      text: `${translations.productServesPrefix}: ${product.labelling.productServes}`,
      x: CONFIG.startingXRightCol,
      y,
      width: CONFIG.rightColumnWidth,
      fontSize: convertFontSize(CONFIG.mainFontSize),
    })

    y += 8
  }

  y = generateTextBlock(ctx, {
    text: product.labelling.storageConditions || translations.storageConditionsPlaceholder,
    x: CONFIG.startingXRightCol,
    y,
    width: CONFIG.rightColumnWidth,
    fontSize: convertFontSize(CONFIG.mainFontSize),
  })

  y += 8

  y = generateTextBlock(ctx, {
    text: translations.allergenStatement,
    x: CONFIG.startingXRightCol,
    y,
    width: CONFIG.rightColumnWidth,
    fontSize: convertFontSize(CONFIG.mainFontSize),
  })

  y = 330

  if (product.labelling.ean13Code) {
    y = generateBarcodeBlock(ctx, {
      barCodeValue: product.labelling.ean13Code,
      x: 1025,
      y,
      width: CONFIG.rightColumnWidth,
    })
  }

  // SKU and HG code always start at this position on the label
  y = 368

  y = generateTextBlock(ctx, {
    text: product.sku,
    x: CONFIG.startingXRightCol,
    y,
    width: CONFIG.rightColumnWidth,
    fontSize: convertFontSize(CONFIG.mainFontSize),
  })
  y = generateTextBlock(ctx, {
    text: product.hamiltonGrant.productCode || '',
    x: CONFIG.startingXRightCol,
    y,
    width: CONFIG.rightColumnWidth,
    fontSize: convertFontSize(CONFIG.mainFontSize),
  })

  // Use by, sell by and weight values always start at this position on the label
  y = 420

  if (product.labelling.useBy) {
    // Generate an empty block to ensure product weight appears in the same place if N/A

    const text =
      product.labelling.useBy.toLowerCase() === 'na'
        ? ' '
        : `<b>${translations.useByPrefix}</b>: ${addDaysToToday(parseInt(product.labelling.useBy))}`

    y = generateTextBlock(ctx, {
      text,
      x: CONFIG.startingXRightCol,
      y,
      width: CONFIG.rightColumnWidth,
      fontSize: convertFontSize(CONFIG.mainFontSize),
    })
  }

  if (product.labelling.sellBy) {
    // Generate an empty block to ensure product weight appears in the same place if N/A
    const text =
      product.labelling.sellBy.toLowerCase() === 'na'
        ? ' '
        : `<b>${translations.sellByPrefix}</b>: ${addDaysToToday(
            parseInt(product.labelling.sellBy),
          )}`

    y = generateTextBlock(ctx, {
      text,
      x: CONFIG.startingXRightCol,
      y,
      width: CONFIG.rightColumnWidth,
      fontSize: convertFontSize(CONFIG.mainFontSize),
    })
  }

  if (product.size && product.labelling.includeAverageWeightOnLabel) {
    generateTextBlock(ctx, {
      text: `<b>${translations.weightPrefix}:</b> ${getReducedDisplayWeight(product.size)}g`,
      x: CONFIG.startingXRightCol,
      y,
      width: CONFIG.rightColumnWidth,
      fontSize: convertFontSize(CONFIG.mainFontSize),
    })
  }
}

interface Props {
  product: ProductVariant
}

const LabelPreview = ({ product }: Props) => {
  const { locale } = Locale.useLocale()
  const { translate } = Translation.useTranslation()

  const canvas = React.useRef<HTMLCanvasElement>(null)
  const [fontLoaded, setFontLoaded] = React.useState(false)
  const font = new FontFace('Pret', `url(${labelMachineFont})`)
  const [isContentTooLong, setIsContentTooLong] = React.useState(false)

  const validateLabelSize = React.useCallback((isTooLong: boolean) => {
    setIsContentTooLong(isTooLong)
  }, [])

  document.fonts.add(font)
  font.load().then(() => {
    setFontLoaded(true)
  })

  React.useEffect(() => {
    const translatableSections: TranslatableSections = {
      ingredientsPrefix: translate('productVariantLabelling.preview.ingredientsPrefix'),
      allergenStatement: translate('productVariantLabelling.preview.allergenStatement'),
      nutritionalInformationPrefix: translate(
        'productVariantLabelling.preview.nutritionalInformationPrefix',
      ),
      nutritionalInformationDescription: translate(
        'productVariantLabelling.preview.nutritionalInformationDescription',
      ),
      useByPrefix: translate('productVariantLabelling.preview.useByPrefix'),
      sellByPrefix: translate('productVariantLabelling.preview.sellByPrefix'),
      weightPrefix: translate('productVariantLabelling.preview.weightPrefix'),
      productServesPrefix: translate('productVariantLabelling.preview.productServesPrefix'),
      legalTitlePlaceholder: translate(
        'productVariantLabelling.preview.propertyMissingPlaceholder',
        {
          propertyName: 'LEGAL TITLE',
        },
      ),
      productNamePlaceholder: translate(
        'productVariantLabelling.preview.propertyMissingPlaceholder',
        {
          propertyName: 'PRODUCT NAME',
        },
      ),
      ingredientsPlaceholder: translate(
        'productVariantLabelling.preview.propertyMissingPlaceholder',
        {
          propertyName: 'INGREDIENTS',
        },
      ),
      storageConditionsPlaceholder: translate(
        'productVariantLabelling.preview.propertyMissingPlaceholder',
        {
          propertyName: 'STORAGE CONDITIONS',
        },
      ),
    }

    if (canvas.current && fontLoaded) {
      draw(canvas.current, locale, product, translatableSections, validateLabelSize)
    }
  }, [canvas, locale, product, fontLoaded, translate, validateLabelSize])

  if (!fontLoaded) {
    return <LoadingSpinner />
  }

  return (
    <div>
      {isContentTooLong && (
        <Notice
          title={translate('productVariantLabelling.preview.labelContentTooLongMessage')}
          variant="critical"
        />
      )}
      <div style={{ fontFamily: font.family, textRendering: 'optimizeLegibility' }}>
        <canvas
          ref={canvas}
          width={CONFIG.labelWidth}
          height={CONFIG.labelHeight}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  )
}

export default LabelPreview
