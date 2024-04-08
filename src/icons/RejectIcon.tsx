import React, { SVGAttributes } from 'react'

const RejectIcon = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="575354"
      xmlns="http://www.w3.org/2000/svg"
      style={{ strokeWidth: '2px', stroke: props.stroke || 'white' }}
      {...props}
    >
      <path d="M1.00024 1L14.9999 14.9997" />
      <path d="M1 15L14.9997 1.00033" />
    </svg>
  )
}

export default RejectIcon
