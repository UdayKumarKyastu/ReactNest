export const getSearchResultsMock = (resultsQuantity: number) => {
  const products = []

  for (let i = 1; i <= resultsQuantity; i++) {
    products.push({
      sku: `UK${i}`,
      name: {
        'en-GB': `GB Product group name ${i}`,
        'en-US': `US Product group name ${i}`,
        'fr-FR': `FR Product group name ${i}`,
        'en-HK': `en-HK Product group name ${i}`,
        'zh-HK': `zh-HK Product group name ${i}`,
      },
      description: {
        'en-GB': `GB Product group description ${i}`,
        'en-US': `US Product group description ${i}`,
        'fr-FR': `FR Product group description ${i}`,
        'en-HK': `en-HK Product group description ${i}`,
        'zh-HK': `zh-HK Product group description ${i}`,
      },
      createdAt: '2020-04-09T17:18:53.589Z',
      countryCode: 'UK',
      published: true,
      visibleOnWebsiteVariants: 1,
      variants: [
        {
          sku: `UK${i}`,
          name: {
            'en-GB': `GB Variant name ${i}`,
            'en-US': `US Variant name ${i}`,
            'fr-FR': `FR Variant name ${i}`,
            'en-HK': `en-HK Variant name ${i}`,
            'zh-HK': `zh-HK Variant name ${i}`,
          },
          description: {
            'en-GB': `GB Variant description ${i}`,
            'en-US': `US Variant description ${i}`,
            'fr-FR': `FR Variant description ${i}`,
            'en-HK': `en-HK Variant description ${i}`,
            'zh-HK': `zh-HK Variant description ${i}`,
          },
          isMaster: true,
          imageUrl:
            '//images.ctfassets.net/4zu8gvmtwqss/FR003131-Americano/c7245188171f48a8196a5d9a511f23fc/FR003131-Americano.jpg',
          hgCode: `FP${i}`,
          createdAt: '2020-04-09T17:18:53.589Z',
          countryCode: 'UK',
          published: true,
          visibleOnWebsite: true,
        },
      ],
    })
  }

  return { products: products, total: resultsQuantity }
}
