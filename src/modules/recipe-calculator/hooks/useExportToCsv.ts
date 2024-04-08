import { Translation } from '../../i18n/Translation'
import { Locale } from '../../i18n/Locale'
import { useCallback } from 'react'
import { format } from 'date-fns'
import { RecipeGood } from '../model/Good'
import { withPercentage } from '../../../util/withPercentage'
import { withCurrency } from '../../../util/withCurrency'

const useExportToCsv = (
  recipeName: string,
  recipeGoods: RecipeGood[],
  totalCost: number,
  vat: string,
  addVat: (price: string) => number | '',
  calculateTCOF: (price: string) => string,
  calculateContribution: (price: string) => string,
  price1: string,
  price2: string,
  price3: string,
  currency: string,
) => {
  const { translate } = Translation.useTranslation()
  const { locale } = Locale.useLocale()

  const exportToCsv = useCallback(() => {
    const today = format(new Date(), 'dd-MM-yyyy')
    const fileName = `${recipeName}_recipe-calculator_${today}.csv`
    const rows = [
      [translate('recipeCalculator.csv.productName'), recipeName, ''],
      [
        translate('recipeCalculator.csv.ingredients'),
        translate('recipeCalculator.csv.quantity'),
        translate('recipeCalculator.csv.cost'),
        translate('recipeCalculator.csv.itemTotalCost'),
      ],
      ...recipeGoods.map((good) => {
        return [
          good.name,
          good.quantity,
          withCurrency({
            locale,
            currency,
            value: Number(good.cost.centAmount) / 100,
            maximumSignificantDigits: 10,
          }),
          withCurrency({
            locale,
            currency,
            value: (Number(good.cost.centAmount) * good.quantity) / 100,
            maximumSignificantDigits: 10,
          }),
        ]
      }),
      [
        '',
        translate('recipeCalculator.csv.totalCost'),
        withCurrency({ locale, currency, value: totalCost, maximumSignificantDigits: 10 }),
      ],
      [
        translate('recipeCalculator.csv.vat'),
        withPercentage({ locale, value: Number(vat) / 100 }),
        '',
      ],
      [
        '',
        translate('recipeCalculator.csv.sellingPrice1'),
        translate('recipeCalculator.csv.sellingPrice2'),
        translate('recipeCalculator.csv.sellingPrice3'),
      ],
      [
        translate('recipeCalculator.csv.sellingPriceExVat'),
        withCurrency({ locale, currency, value: price1 }),
        withCurrency({ locale, currency, value: price2 }),
        withCurrency({ locale, currency, value: price3 }),
      ],
      [
        translate('recipeCalculator.csv.sellingPriceIncVat'),
        withCurrency({ currency, locale, value: addVat(price1) }),
        withCurrency({ currency, locale, value: addVat(price2) }),
        withCurrency({ currency, locale, value: addVat(price3) }),
      ],
      [
        translate('recipeCalculator.csv.tcof'),
        calculateTCOF(price1),
        calculateTCOF(price2),
        calculateTCOF(price3),
      ],
      [
        translate('recipeCalculator.csv.contribution'),
        calculateContribution(price1),
        calculateContribution(price2),
        calculateContribution(price3),
      ],
    ]

    const content = rows.map((row) => row.join(',')).join('\n')
    const encoded = encodeURI(`data:text/csv;charset=utf-8,${content}`)
    const link = document.createElement('a')
    link.setAttribute('href', encoded)
    link.setAttribute('download', fileName)
    document.body.appendChild(link)
    link.click()
  }, [
    addVat,
    calculateContribution,
    calculateTCOF,
    currency,
    locale,
    price1,
    price2,
    price3,
    recipeGoods,
    recipeName,
    totalCost,
    translate,
    vat,
  ])

  return { exportToCsv }
}

export default useExportToCsv
