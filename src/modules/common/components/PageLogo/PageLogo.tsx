import { Logo } from '../../../../icons/logo'
import { PageLogoStyles } from './PageLogo.styles'
import { Routes } from '../../../routing/Routes'

const { LogoNavLink, Heading } = PageLogoStyles

export const PageLogo = () => {
  return (
    <LogoNavLink to={Routes.LandingPage}>
      <Logo size={25} />
      <Heading>
        <span>Pret</span>
        <strong>Portal</strong>
      </Heading>
    </LogoNavLink>
  )
}
