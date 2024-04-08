import React, { SVGAttributes } from 'react'

type Props = SVGAttributes<SVGElement> & {
  size?: number | string
}

export const DiscardIcon = ({ size = 30, className, ...props }: Props) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 18 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.76706 0L0 6.60448L7.76706 12.5373V8.28358C16.1502 8.33827 17.0825 10.2227 15.8768 15H16.7906C18.4427 14.5606 20.4039 2.93374 7.76706 4.02985V0Z"
        fill="currentColor"
      />
    </svg>
  )
}
