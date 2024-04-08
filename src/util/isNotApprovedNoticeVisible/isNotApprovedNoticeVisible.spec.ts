import { isNotApprovedNoticeVisible } from './isNotApprovedNoticeVisible'
import { ProductVariantVersion } from '../../modules/product/model/product-variant'

const VERSION_KEY = '123'
const PRODUCT_VARIANT = {
  approvedTabs: {
    marketing: true,
    baristaAttributes: true,
    reporting: false,
  },
  versions: [{}, {}],
} as any as ProductVariantVersion

describe('isNotApprovedNoticeVisible', () => {
  it('returns proper state', () => {
    expect(isNotApprovedNoticeVisible(PRODUCT_VARIANT, 'reporting', VERSION_KEY, true)).toBe(true)
    expect(isNotApprovedNoticeVisible(PRODUCT_VARIANT, 'marketing', VERSION_KEY, true)).toBe(false)
    expect(isNotApprovedNoticeVisible(PRODUCT_VARIANT, 'reporting', null, true)).toBe(false)
    expect(isNotApprovedNoticeVisible(PRODUCT_VARIANT, 'reporting', VERSION_KEY, false)).toBe(false)
  })
})
