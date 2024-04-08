import { SVGAttributes } from 'react'

export const ArrowRight = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="6"
      height="10"
      viewBox="0 0 6 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 9L5 5L1 1"
        stroke="#404040"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
