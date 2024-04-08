import { TabNavigation } from '../../../common/components/TabNavigation/TabNavigation'

export declare namespace ProductVariantVersionNavigation {
  export type Props = {
    navItems: TabNavigation.NavLinkProps[]
  }
}

export const ProductVariantVersionNavigation = ({
  navItems,
}: ProductVariantVersionNavigation.Props) => {
  return <TabNavigation items={navItems} />
}
