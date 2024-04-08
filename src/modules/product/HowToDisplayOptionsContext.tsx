import React, { createContext, useCallback, useState, useEffect } from 'react'
import { ProductApi } from './api/product.api'
import { HowToDisplayOption } from './model/how-to-display'
import { ProductType } from './model/product-type'

const Context = createContext<HowToDisplayOption[] | []>([])

const Provider = ({
  children,
  productType,
}: {
  children: React.ReactNode
  productType: ProductType
}) => {
  const [availableHowToDisplayOptions, setAvailableHowToDisplayOptions] = useState<
    Array<{ key: string; label: string }>
  >([])

  const { getAvailableHowToDisplayOptions } = ProductApi.useGetAvailableHowToDisplayOptions()

  const fetchHowToDisplayOptions = useCallback(async () => {
    try {
      const response = await getAvailableHowToDisplayOptions(productType)
      setAvailableHowToDisplayOptions(response.options || [])
    } catch (e) {
      setAvailableHowToDisplayOptions([])
    }
  }, [getAvailableHowToDisplayOptions, productType])

  useEffect(() => {
    fetchHowToDisplayOptions()
  }, [fetchHowToDisplayOptions])

  return <Context.Provider value={availableHowToDisplayOptions}>{children}</Context.Provider>
}

export const HowToDisplayOptionsContext = {
  Provider,
  Context,
}
