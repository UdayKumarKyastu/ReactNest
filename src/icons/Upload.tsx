import React, { SVGAttributes } from 'react'

interface Props extends SVGAttributes<SVGElement> {
  size?: number
}

const Upload = ({ size = 54, ...props }: Props) => {
  return (
    <svg
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      height={size}
    >
      <path
        d="M19.4056 44.332H10.5001C5.34542 44.332 1.16675 40.1534 1.16675 34.9987C1.16675 31.5997 2.98368 28.6251 5.69929 26.9931C5.04443 25.9279 4.66675 24.6741 4.66675 23.332C4.66675 19.466 7.80076 16.332 11.6667 16.332C13.6889 16.332 15.5109 17.1895 16.7887 18.5607C19.4313 13.099 25.0258 9.33203 31.5001 9.33203C40.5207 9.33203 47.8334 16.6447 47.8334 25.6654C47.8334 25.7253 47.833 25.7852 47.8322 25.8451C51.8245 26.6964 54.8334 30.4711 54.8334 34.9987C54.8334 40.1534 50.9333 44.332 46.1223 44.332H37.2168"
        stroke="#C5BFC0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M29.1667 44.3346V25.668"
        stroke="#C5BFC0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22.1667 32.668L29.1667 25.668L36.1667 32.668"
        stroke="#C5BFC0"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Upload
