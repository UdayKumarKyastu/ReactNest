import React, { FC } from 'react'
import { ProductNameCellStyles } from './ProductNameCell.styles'
import { FlagIcon } from '../../../../icons/FlagIcon'
import { CountryCode } from '../../../../shared/model/country-code'
import { ProductGroup as ProductGroupIcon } from '../../../../icons/ProductGroup'
import { Variant as VariantIcon } from '../../../../icons/Variant'
import { Translation } from '../../../i18n/Translation'
import { Version as VersionIcon } from '../../../../icons/Version'

export declare namespace ProductNameCell {
  export type Props = {
    name: string
    imageUrl: string
    onClick: () => void
    countryCode: CountryCode
    type: 'group' | 'variant' | 'master-variant'
    variantsCount?: number
    version?: number
  }
}

const {
  ProductNameCellWrapper,
  Image,
  CountryWrapper,
  ProductName,
  VariantsCountWrapper,
  DetailsWrapper,
  TextWithIcon,
} = ProductNameCellStyles

export const ProductNameCell: FC<ProductNameCell.Props> = ({
  name,
  imageUrl,
  onClick,
  countryCode,
  variantsCount,
  type,
  version,
}) => {
  const Flag = FlagIcon[countryCode]
  const { translate } = Translation.useTranslation()

  const getDetails = () => {
    switch (type) {
      case 'master-variant':
        return (
          <>
            <TextWithIcon withBorder>
              <VariantIcon />
              {translate('productNotifications.masterVariant')}
            </TextWithIcon>
            {version && (
              <TextWithIcon>
                <VersionIcon />
                {`${translate('productNotifications.version')} ${version}`}
              </TextWithIcon>
            )}
          </>
        )
      case 'variant':
        return (
          <>
            <TextWithIcon withBorder>
              <VariantIcon />
              {translate('productNotifications.variant')}
            </TextWithIcon>
            {version && (
              <TextWithIcon>
                <VersionIcon />
                {`${translate('productNotifications.version')} ${version}`}
              </TextWithIcon>
            )}
          </>
        )
      case 'group':
        return (
          <>
            <ProductGroupIcon />
            {`${translate('productNotifications.productGroup')}: ${variantsCount} ${translate(
              'productNotifications.variants',
            )}`}
          </>
        )
    }
  }

  return (
    <ProductNameCellWrapper>
      <Image alt="Image" src={imageUrl} />
      <div>
        <ProductName onClick={onClick} data-testid={`product-name-cell-${name.replace(/ /g, '-')}`}>
          {name}
        </ProductName>
        <DetailsWrapper>
          <CountryWrapper>
            {Flag && <Flag size={14} />}
            <span>{countryCode}</span>
          </CountryWrapper>
          <VariantsCountWrapper>{getDetails()}</VariantsCountWrapper>
        </DetailsWrapper>
      </div>
    </ProductNameCellWrapper>
  )
}
