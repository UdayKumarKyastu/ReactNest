import React, { useCallback } from 'react'
import { Translation } from '../../../i18n/Translation'
import { TemplateFileInfoStyles } from './TemplateFileInfo.styles'
import { Button } from '@pretamanger/component-library'
import templateFile from '../../../../assets/pricingTemplate.csv'

const { Wrapper } = TemplateFileInfoStyles

const TemplateFileInfo = () => {
  const { translate } = Translation.useTranslation()

  const onClick = useCallback(() => {
    const link = document.createElement('a')
    link.setAttribute('href', templateFile)
    link.setAttribute('download', 'PretPortal_price_upload_file_format.csv')
    document.body.appendChild(link)
    link.click()
  }, [])

  return (
    <Wrapper className="template-file-info">
      <p>{translate('pricingImport.pleaseEnsure')}</p>
      <Button compact styleType="tertiary" icon={null} onClick={onClick}>
        {translate('pricingImport.templateFile')}
      </Button>
    </Wrapper>
  )
}

export default TemplateFileInfo
