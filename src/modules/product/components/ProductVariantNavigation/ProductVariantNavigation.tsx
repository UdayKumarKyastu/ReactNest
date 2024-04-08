import { TabNavigation } from '../../../common/components/TabNavigation/TabNavigation'

export declare namespace ProductNavigation {
  export type Props = {
    navItems: TabNavigation.NavLinkProps[]
  }
}

export const ProductVariantNavigation = ({ navItems }: ProductNavigation.Props) => {
  return <TabNavigation items={navItems} />
}
