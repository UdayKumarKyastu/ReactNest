import React, { useCallback, useEffect, useState } from 'react'
import MaskedInput from '../../../../common/components/MaskedInput/MaskedInput'
import Decimal from 'decimal.js'

interface Props {
  onChange: (value: number) => void
  disabled: boolean
  value: number | string
  testSelector?: string
  className?: string
}

const COST_REGEX = /^\d*[.]?\d{0,10}$/

const CostInput = (props: Props) => {
  const [innerValue, setInnerValue] = useState('')

  useEffect(() => {
    const numberValue = new Decimal(props.value).dividedBy(100).toNumber()
    if (numberValue !== parseFloat(innerValue)) {
      setInnerValue(numberValue.toString())
    }
  }, [innerValue, props.value])

  const onChange = useCallback(
    (value: string) => {
      setInnerValue(value)
      props.onChange(parseFloat(value) * 100)
    },
    [props],
  )

  return <MaskedInput {...props} value={innerValue} onChange={onChange} mask={COST_REGEX} />
}

export default CostInput
