import { LabellingOptions } from '../../../src/modules/product/model/product'

export const getLabellingOptionsMock = (): LabellingOptions => {
  return {
    useBy: [
      {
        key: '4',
        label: 'Use up to 4 days after purchase',
      },
      {
        key: '1',
        label: 'Use up to 1 day after purchase',
      },
      {
        key: '2',
        label: 'Use up to 2 days after purchase',
      },
      {
        key: '3',
        label: 'Use up to 3 days after purchase',
      },
      {
        key: '5',
        label: 'Use up to 5 days after purchase',
      },
      {
        key: '0',
        label: 'Use on the day of purchase',
      },
    ],
    sellBy: [
      {
        key: '0',
        label: 'Sell on the day of purchase',
      },
      {
        key: '2',
        label: 'Sell up to 2 days after purchase',
      },
      {
        key: '3',
        label: 'Sell up to 3 days after purchase',
      },
      {
        key: '5',
        label: 'Sell up to 5 days after purchase',
      },
      {
        key: '1',
        label: 'Sell up to 1 day after purchase',
      },
      {
        key: '4',
        label: 'Sell up to 4 days after purchase',
      },
    ],
    instructionsForUse: [
      {
        key: 'Enjoy on day of purchase',
        label: 'Enjoy on day of purchase',
      },
      {
        key: 'Keep refrigerated, enjoy on the day of purchase',
        label: 'Keep refrigerated, enjoy on the day of purchase',
      },
      {
        key: 'Enjoy whilst hot, do not reheat',
        label: 'Enjoy whilst hot, do not reheat',
      },
    ],
    productServes: [
      {
        key: 'NA',
        label: 'N/A',
      },
      {
        key: '1',
        label: '1',
      },
      {
        key: '2',
        label: '2',
      },
      {
        key: '3',
        label: '3',
      },
      {
        key: '4',
        label: '4',
      },
      {
        key: '5',
        label: '5',
      },
      {
        key: '3',
        label: '3',
      },
      {
        key: '6',
        label: '6',
      },
      {
        key: '7',
        label: '7',
      },
      {
        key: '8',
        label: '8',
      },
      {
        key: '9',
        label: '9',
      },
      {
        key: '10',
        label: '10',
      },
    ],
  }
}
