import React, { useCallback, useMemo, useState } from 'react'
import { Translation } from '../../../i18n/Translation'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'
import { CreateGoodModalStyles } from './CreateGoodModal.styles'
import { Modal, RadioButton } from '@pretamanger/component-library'
import generateID from '../../../../util/generateID'
import { getCurrencySymbol } from '../../../../util/getCurrencySymbol'
import { Locale } from '../../../i18n/Locale'
import { UnitOfMeasure } from '../../model/Good'
import { DEFAULT_CURRENCY_CODE, DECIMAL_REGEX, INTEGER_REGEX } from '../../../common/constants'

const { Title, ModalFooter, StyledButton, StyledInput, InputRow, ModalWrapper, RadioWrapper } =
  CreateGoodModalStyles

const INIT_FORM = {
  id: generateID(),
  name: '',
  packSizeQuantity: 1,
  packSizeUnitQuantity: 1,
  packCost: '0',
  distributionCost: '0',
  quantity: '1',
  unitOfMeasure: '' as UnitOfMeasure,
}

const CreateGoodModal = () => {
  const { translate } = Translation.useTranslation()
  const { actions } = RecipeCalculatorState.useState()
  const [form, setForm] = useState(INIT_FORM)
  const { locale } = Locale.useLocale()
  const currency = getCurrencySymbol(locale)

  const setField = useCallback(
    (fieldName: string, fieldValue: string) => {
      setForm({
        ...form,
        [fieldName]: fieldValue,
      })
    },
    [form, setForm],
  )

  const totalCost = useMemo(() => {
    return Number(form.packCost) + Number(form.distributionCost)
  }, [form])

  const costPerUnit = useMemo(() => {
    const totalWeight = form.packSizeQuantity * form.packSizeUnitQuantity
    const costPerUnit =
      form.unitOfMeasure === 'each' ? totalCost / totalWeight : totalCost / (totalWeight * 1000)
    return costPerUnit * Number(form.quantity)
  }, [totalCost, form])

  const addToRecipe = useCallback(() => {
    const { name, id, quantity, unitOfMeasure } = form
    const good = {
      id,
      name,
      modifiedAt: new Date().toISOString(),
      unitOfMeasurement: unitOfMeasure,
      quantity: parseInt(quantity),
      cost: { currencyCode: DEFAULT_CURRENCY_CODE, centAmount: costPerUnit * 100 },
      hgGoodId: null,
    }
    actions.addCreatedGoodToRecipe(good)
  }, [form, costPerUnit, actions])

  const isFormValid = useMemo(() => {
    return (
      form.name &&
      Number(form.packSizeUnitQuantity) &&
      Number(form.packSizeQuantity) &&
      form.unitOfMeasure &&
      Number(form.packCost) &&
      Number(form.quantity) &&
      Number(form.distributionCost)
    )
  }, [form])

  return (
    <ModalWrapper data-testid="create-good-modal">
      <Modal size="narrow" open onClose={actions.toggleCreateGoodModal}>
        <Title>{translate('recipeCalculator.createGoodModal.title')}</Title>

        <StyledInput
          label={translate('recipeCalculator.createGoodModal.name')}
          value={form.name}
          onChange={(value: string) => setField('name', value)}
          testSelector="name-input"
        />

        <InputRow>
          <StyledInput
            label={translate('recipeCalculator.createGoodModal.packSizeQuantity')}
            value={form.packSizeQuantity}
            onChange={(value: string) => setField('packSizeQuantity', value)}
            testSelector="pack-size-quantity-input"
            mask={DECIMAL_REGEX}
          />
          <StyledInput
            label={translate('recipeCalculator.createGoodModal.packSizeUnitQuantity')}
            value={form.packSizeUnitQuantity}
            onChange={(value: string) => setField('packSizeUnitQuantity', value)}
            testSelector="pack-size-unit-quantity-input"
            mask={INTEGER_REGEX}
          />
        </InputRow>

        <RadioWrapper>
          <p>{translate('recipeCalculator.createGoodModal.packSizeUnit')}</p>
          <RadioButton
            id="pack-size-unit-grams"
            data-testid="pack-size-unit-grams"
            label={translate('recipeCalculator.createGoodModal.kg')}
            name="packSizeUnit"
            onChange={() => setField('unitOfMeasure', 'g')}
          />
          <RadioButton
            id="ml"
            label={translate('recipeCalculator.createGoodModal.litre')}
            name="packSizeUnit"
            onChange={() => setField('unitOfMeasure', 'ml')}
          />
          <RadioButton
            id="each"
            label={translate('recipeCalculator.createGoodModal.each')}
            name="packSizeUnit"
            onChange={() => setField('unitOfMeasure', 'each')}
          />
        </RadioWrapper>

        <InputRow>
          <StyledInput
            label={translate('recipeCalculator.createGoodModal.packCost')}
            value={form.packCost}
            onChange={(value: string) => setField('packCost', value)}
            prefix={currency}
            mask={DECIMAL_REGEX}
            testSelector="pack-cost-input"
          />
          <StyledInput
            label={translate('recipeCalculator.createGoodModal.distributionCost')}
            value={form.distributionCost}
            onChange={(value: string) => setField('distributionCost', value)}
            prefix={currency}
            mask={DECIMAL_REGEX}
            testSelector="distribution-cost-input"
          />
        </InputRow>

        <InputRow>
          <StyledInput
            value={totalCost}
            label={translate('recipeCalculator.createGoodModal.totalCost')}
            disabled
            prefix={currency}
            testSelector="total-cost-field"
          />
        </InputRow>

        <InputRow>
          <StyledInput
            value={form.unitOfMeasure}
            label={translate('recipeCalculator.createGoodModal.recipeUnit')}
            disabled
            testSelector="recipe-unit-input"
          />
          <StyledInput
            label={translate('recipeCalculator.createGoodModal.quantity')}
            mask={INTEGER_REGEX}
            value={form.quantity}
            onChange={(value: string) => setField('quantity', value)}
            testSelector="quantity-input"
          />
        </InputRow>

        <InputRow>
          <StyledInput
            label={translate('recipeCalculator.createGoodModal.costPerUnit')}
            prefix={currency}
            value={costPerUnit}
            disabled
            testSelector="cost-per-unit-input"
          />
        </InputRow>

        <ModalFooter>
          <StyledButton styleType="secondary" compact onClick={actions.toggleCreateGoodModal}>
            {translate('recipeCalculator.createGoodModal.discard')}
          </StyledButton>

          <StyledButton
            compact
            onClick={addToRecipe}
            disabled={!isFormValid}
            data-testid="submit-button"
          >
            {translate('recipeCalculator.createGoodModal.addToRecipe')}
          </StyledButton>
        </ModalFooter>
      </Modal>
    </ModalWrapper>
  )
}

export default CreateGoodModal
