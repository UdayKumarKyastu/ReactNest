import React, { SVGAttributes } from 'react'

const Minus = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      {...props}
      width="25"
      height="25"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.833008 7.99967C0.833008 4.04163 4.04163 0.833008 7.99967 0.833008C11.9577 0.833008 15.1663 4.04163 15.1663 7.99967C15.1663 11.9577 11.9577 15.1663 7.99967 15.1663C4.04163 15.1663 0.833008 11.9577 0.833008 7.99967ZM5.17127 7.49966C4.89513 7.49966 4.67127 7.72352 4.67127 7.99966C4.67127 8.27581 4.89513 8.49966 5.17127 8.49966H10.8281C11.1043 8.49966 11.3281 8.27581 11.3281 7.99966C11.3281 7.72352 11.1043 7.49966 10.8281 7.49966H5.17127Z"
        fill="#9F1B32"
      />
    </svg>
  )
}

export default Minus
