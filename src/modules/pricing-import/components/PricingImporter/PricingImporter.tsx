import React, { useCallback, useState } from 'react'
import PricingImporterBreadcrumbs from '../PricingImporterBreadcrumbs/PricingImporterBreadcrumbs'
import UploadCSVStep from '../UploadCSVStep/UploadCSVStep'
import CsvValidationStep from '../CsvValidationStep/CsvValidationStep'
import ApplyChangesStep from '../ApplyChangesStep/ApplyChangesStep'
import { PricingImporterApi } from '../../api/pricingImporter.api'
import { ImporterError, UploadResponse } from '../../model/UploadResponse'
import CompletedStep from '../CompletedStep/CompletedStep'

const PricingImporter = () => {
  const [step, setStep] = useState<'upload' | 'validation' | 'apply' | 'completed'>('upload')
  const [filename, setFilename] = useState('')
  const [skuCount, setSkuCount] = useState<number>()
  const [importId, setImportId] = useState<string>()
  const [cancelFn, setCancelFn] = useState<() => void>()
  const [errors, setErrors] = useState<ImporterError[]>([])
  const { uploadFile } = PricingImporterApi.useUploadFile()

  const onCancelUpload = useCallback(() => {
    setFilename('')
    cancelFn?.()
  }, [cancelFn])

  const onCancelValidation = useCallback(() => {
    setFilename('')
    setStep('upload')
  }, [])

  const onUpload = useCallback(
    async (file: File) => {
      setErrors([])
      setFilename(file.name)

      const response = (await new Promise(async (resolve, reject) => {
        setCancelFn(() => reject)
        const data = await uploadFile(file)
        resolve(data)
      })) as UploadResponse

      if (response.errors?.length) {
        setErrors(response.errors)
        onCancelUpload()
        return
      }

      setSkuCount(response.skuCount)
      setImportId(response.importId)
      setStep('validation')
    },
    [onCancelUpload, uploadFile],
  )

  const onCompletedImport = (errors: ImporterError[]) => {
    setStep('completed')
    setErrors(errors)
  }

  return (
    <>
      <PricingImporterBreadcrumbs step={step} />

      {step === 'upload' && (
        <UploadCSVStep
          onUpload={onUpload}
          filename={filename}
          onCancel={onCancelUpload}
          errors={errors}
        />
      )}

      {step === 'validation' && (
        <CsvValidationStep
          filename={filename}
          productsNumber={skuCount!}
          onCancel={onCancelValidation}
          onContinue={() => setStep('apply')}
        />
      )}

      {step === 'apply' && skuCount && importId && (
        <ApplyChangesStep
          productsNumber={skuCount}
          onCancel={() => setStep('upload')}
          onCompleted={onCompletedImport}
          filename={filename}
          importId={importId}
        />
      )}

      {step === 'completed' && skuCount && <CompletedStep skuCount={skuCount} errors={errors} />}
    </>
  )
}

export default PricingImporter
