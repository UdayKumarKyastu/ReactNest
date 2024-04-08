import React, { SVGAttributes } from 'react'

const CircleQuestion = (props: SVGAttributes<SVGElement>) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M7.99992 14.6668C11.6818 14.6668 14.6666 11.6821 14.6666 8.00016C14.6666 4.31826 11.6818 1.3335 7.99992 1.3335C4.31802 1.3335 1.33325 4.31826 1.33325 8.00016C1.33325 11.6821 4.31802 14.6668 7.99992 14.6668Z"
      stroke="#9F1B32"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M8 11.3335H8.00667" stroke="#9F1B32" strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M6.10027 6.01985C6.44562 4.97066 7.57612 4.40008 8.62532 4.74544C9.42022 5.00709 9.79971 5.59247 9.93697 6.29574C10.0262 6.75285 9.91417 7.23711 9.60667 7.5869C9.11385 8.14748 8.48265 8.39671 8 8.64571"
      stroke="#9F1B32"
      strokeLinecap="round"
    />
  </svg>
)

export default CircleQuestion
