import React from 'react'
import Done from '../../../../icons/Done'
import { Title, TitleTextWrapper, ListWrapper, Root } from './CompletedStep.styles'
import { Translation } from '../../../i18n/Translation'
import { ImporterError } from '../../model/UploadResponse'
import { Critical } from '../../../../icons/Critical'

interface Props {
  skuCount: number
  errors: ImporterError[]
}

const CompletedStep = ({ skuCount, errors }: Props) => {
  const { translate } = Translation.useTranslation()

  const hasErrors = errors.length > 0
  const icon = hasErrors ? <Critical height={40} width={40} /> : <Done size={35} />
  return (
    <Root>
      <Title>
        {icon}
        <TitleTextWrapper>
          {translate('pricingImport.completedTitle', {
            skuCount,
            errors: errors.length,
          })}
        </TitleTextWrapper>
      </Title>

      {errors.length > 0 ? (
        <>
          <ListWrapper>
            {errors.map((error) => (
              <li>
                [{error.sku}]: {error.message}
              </li>
            ))}
          </ListWrapper>
          <p>{translate('pricingImport.completedErrorHelp')}</p>
          <p>{translate('pricingImport.completedErrorPartialImportInfo')}</p>
        </>
      ) : (
        <p>{translate('pricingImport.completedNoErrors')}</p>
      )}
    </Root>
  )
}

export default CompletedStep
