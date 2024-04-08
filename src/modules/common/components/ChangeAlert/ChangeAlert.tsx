import { Alert } from '@pretamanger/component-library'

interface Props {
  size?: string
}

export const ChangeAlert = ({ size }: Props) => {
  const width = size || '16px'
  const height = size || '16px'

  return <Alert data-cy="change-icon" data-testid="change-icon" width={width} height={height} />
}
