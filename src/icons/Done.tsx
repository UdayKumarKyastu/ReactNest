import React, { SVGAttributes } from 'react'

type Props = SVGAttributes<SVGElement> & {
  size?: number
  color?: string
}

const Done = ({ size = 16, color = '#66A403', ...props }: Props) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      height={size}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.833496 7.9987C0.833496 4.04066 4.04212 0.832031 8.00016 0.832031C11.9582 0.832031 15.1668 4.04066 15.1668 7.9987C15.1668 11.9567 11.9582 15.1654 8.00016 15.1654C4.04212 15.1654 0.833496 11.9567 0.833496 7.9987ZM11.3604 6.35224C11.5557 6.15698 11.5557 5.8404 11.3604 5.64513C11.1651 5.44987 10.8486 5.44987 10.6533 5.64513L7.00018 9.29824L5.35374 7.6518C5.15847 7.45653 4.84189 7.45653 4.64663 7.6518C4.45137 7.84706 4.45137 8.16364 4.64663 8.3589L6.64663 10.3589C6.84189 10.5542 7.15847 10.5542 7.35374 10.3589L11.3604 6.35224Z"
        fill={color}
      />
    </svg>
  )
}

export default Done
