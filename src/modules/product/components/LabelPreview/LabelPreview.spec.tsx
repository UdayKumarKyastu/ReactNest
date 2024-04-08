import { ProductVariantDtoMockBuilder } from '../../mock/product-variant-dto-mock-builder'
import { ProductVariant } from '../../model/product-variant'

import {
  addDaysToToday,
  formatNutritionToString,
  getLines,
  generateTextBlock,
  getReducedDisplayWeight,
  formatCaloriesToString,
} from './LabelPreview'

const sku = 'UK001'
const mockLabelData = {
  useBy: '0',
  sellBy: '1',
}
const mockHamiltonGrantData: Partial<ProductVariant['hamiltonGrant']> = {
  nutrition: [
    {
      per100g: 1118.5,
      perServing: 2181,
      name: 'Energy (KJ)',
      localisedLabel: {
        'en-GB': 'Energy (KJ)',
        'en-US': 'Kilojoules',
        'fr-FR': 'Énergie (KJ)',
        'en-HK': '',
        'zh-HK': '熱量(千焦)',
      },
    },
    {
      per100g: 267.7,
      perServing: 522,
      name: 'Energy (KCal)',
      localisedLabel: {
        'en-GB': 'Energy (Kcal)',
        'en-US': 'Calories',
        'fr-FR': 'Énergie (kcal)',
        'en-HK': '',
        'zh-HK': '能量  (千卡)',
      },
    },
  ],
}
const mockProduct = new ProductVariantDtoMockBuilder()
  .asMaster()
  .withSku(sku)
  .withLabelling(mockLabelData)
  .withHamiltonGrant(mockHamiltonGrantData)
  .build()
const mockToday = new Date(2020, 0, 1)

describe('Label preview utils', () => {
  beforeAll(() => {
    jest.useFakeTimers('modern')
    jest.setSystemTime(mockToday)
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  describe('addDaysToToday', () => {
    it('Adds the number of days provided to the current date and returns in the `00 JAN` format', () => {
      expect(addDaysToToday(1)).toBe('02 Jan')
    })
  })

  describe('formatNutritionToString', () => {
    it('Produces a nutritional information string from the HG nutrition array', () => {
      expect(formatNutritionToString(mockProduct.hamiltonGrant.nutrition, 'en-GB')).toBe(
        'Energy (KJ) 1118.5/2181.0, Energy (Kcal) 267.7/522.0',
      )
    })
  })

  describe('formatCaloriesToString', () => {
    it('Produces calories information from HG nutrition item', () => {
      const caloriesItem = mockHamiltonGrantData.nutrition?.find(
        ({ name }) => name === 'Energy (KCal)',
      )!

      expect(formatCaloriesToString(caloriesItem, 'en-GB')).toBe('Energy (Kcal) 522.0')
    })
  })

  describe('getLines', () => {
    let mockCtx: { measureText: jest.Mock }
    beforeEach(() => {
      mockCtx = {
        measureText: jest.fn(),
      }
    })

    it("breaks long strings onto multiple lines if they don't fit the specified width", () => {
      mockCtx.measureText.mockReturnValue({ width: 100 })
      expect(
        getLines(mockCtx as unknown as CanvasRenderingContext2D, 'test long piece of text', 50),
      ).toEqual(['test', 'long', 'piece', 'of', 'text'])
    })

    it('keeps shorter strings on the same line if they fit the specified width', () => {
      mockCtx.measureText.mockReturnValue({ width: 10 })
      expect(
        getLines(mockCtx as unknown as CanvasRenderingContext2D, 'test short text', 30),
      ).toEqual(['test short text'])
    })
  })

  describe('generateTextBlock', () => {
    let mockCtx: { measureText: jest.Mock; fillText: jest.Mock; font: string }
    beforeEach(() => {
      mockCtx = {
        measureText: jest.fn(),
        fillText: jest.fn(),
        font: 'default font',
      }
    })

    it('sets the current font if provided', () => {
      mockCtx.measureText.mockReturnValue({ width: 100 })
      generateTextBlock(mockCtx as unknown as CanvasRenderingContext2D, {
        text: 'some text',
        x: 0,
        y: 0,
        width: 10,
        fontSize: 5,
      })

      expect(mockCtx.font).toEqual('normal 5pt Pret')
    })

    it('calls to print mulitple lines of text if the text is too wide for the container', () => {
      mockCtx.measureText.mockReturnValue({ width: 10 })
      generateTextBlock(mockCtx as unknown as CanvasRenderingContext2D, {
        text: 'some text',
        x: 0,
        y: 0,
        width: 10,
        fontSize: 5,
      })

      expect(mockCtx.fillText).toHaveBeenCalledTimes(2)
    })

    it('increments the `y` value based on how many text lines were drawn and the configured line height', () => {
      mockCtx.measureText.mockReturnValue({ width: 10 })
      generateTextBlock(mockCtx as unknown as CanvasRenderingContext2D, {
        text: 'some text',
        x: 0,
        y: 0,
        width: 10,
        fontSize: 5,
      })

      expect(
        generateTextBlock(mockCtx as unknown as CanvasRenderingContext2D, {
          text: 'some text',
          x: 0,
          y: 0,
          width: 10,
          fontSize: 5,
        }),
      ).toEqual(45.4)
    })
  })

  describe('getReducedDisplayWeight', () => {
    it('Returns the displayed weight at 90% of the original value', () => {
      expect(getReducedDisplayWeight(10)).toEqual(9)
    })
    it('Returns the displayed weight at 90% of the original value, rounding to the nearest decimal place', () => {
      // 219*0.9=197.1
      expect(getReducedDisplayWeight(219)).toEqual(197)
      // 195*0.9=175.5
      expect(getReducedDisplayWeight(195)).toEqual(176)
    })
    it('Can deal with strings or numbers as input', () => {
      expect(getReducedDisplayWeight(10)).toEqual(9)
      expect(getReducedDisplayWeight('10')).toEqual(9)
    })
  })
})
