import React, { SVGAttributes } from 'react'

type Props = SVGAttributes<SVGElement> & {
  size?: number | string
}

const Edit = ({ size = 24, ...props }: Props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      height={size}
      width={size}
    >
      <path
        d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
        stroke="#9F1B32"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M18.5 2.50023C18.8978 2.1024 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.1024 21.5 2.50023C21.8978 2.89805 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.1024 21.5 5.50023L12.7834 14.2168C12.2708 14.7294 11.6285 15.0931 10.9251 15.2689L8 16.0002L8.73129 13.0751C8.90712 12.3718 9.27079 11.7294 9.78343 11.2168L18.5 2.50023Z"
        fill="#9F1B32"
        stroke="#9F1B32"
        strokeLinecap="round"
      />
    </svg>
  )
}

export default Edit
