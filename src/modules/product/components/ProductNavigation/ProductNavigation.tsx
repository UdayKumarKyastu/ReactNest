import { TabNavigation } from '../../../common/components/TabNavigation/TabNavigation'

export declare namespace ProductNavigation {
  export type Props = {
    navItems: TabNavigation.NavLinkProps[]
  }
}

export const ProductNavigation = ({ navItems }: ProductNavigation.Props) => {
  return <TabNavigation items={navItems} />
}
