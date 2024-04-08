import { NavLink } from 'react-router-dom'
import { SideBySideView } from '../SideBySideView/SideBySideView'
import { Translation } from '../../../i18n/Translation'

export declare namespace AllDraftChangesSideBySideView {
  export interface Props extends SideBySideView.Props {
    route: string
  }
}

export const AllDraftChangesSideBySideView = (props: AllDraftChangesSideBySideView.Props) => {
  const { route } = props
  const { translate } = Translation.useTranslation()

  return (
    <SideBySideView
      redirectionRoute={<NavLink to={route}>{translate('product.editButton')}</NavLink>}
      {...props}
    />
  )
}
