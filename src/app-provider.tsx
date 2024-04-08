import React, { ReactNode } from 'react'
import { Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { createMemoryHistory } from 'history'
import { ProductEditState } from './modules/product/ProductEditState'
import { SingleProductState } from './modules/product/SingleProductState'
import { Product } from './modules/product/model/product'

export const withRouter = (wrappedComponent: ReactNode) => {
  let history = createMemoryHistory({
    initialEntries: ['/'],
  })

  return (
    <Router navigator={history} location={history.location}>
      {wrappedComponent}
    </Router>
  )
}

export const withQueryClient = (wrappedComponent: ReactNode) => {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>{wrappedComponent}</QueryClientProvider>
}

export const withEditState = (wrappedComponent: ReactNode) => {
  return <ProductEditState.Provider>{wrappedComponent}</ProductEditState.Provider>
}

interface Props {
  providers: ((wrappedComponent: ReactNode) => ReactNode)[]
  initialProduct?: Product
  children: ReactNode
}

export const AppProvider = ({ providers, initialProduct, children }: Props) => {
  if (initialProduct) {
    return (
      <SingleProductState.Provider initialProduct={initialProduct}>
        {providers.reduce((app, provider) => {
          return provider(app)
        }, children)}
      </SingleProductState.Provider>
    )
  }

  return (
    <>
      {providers.reduce((app, provider) => {
        return provider(app)
      }, children)}
    </>
  )
}
