import * as React from 'react'
import { SVGAttributes } from 'react'

export function ApproverIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8 0a8 8 0 00-8 8 8 8 0 008 8 8 8 0 008-8 8 8 0 00-8-8zm0 14.4A6.409 6.409 0 011.6 8 6.41 6.41 0 018 1.6c3.528 0 6.4 2.872 6.4 6.4 0 3.528-2.872 6.4-6.4 6.4z"
        fill="#575354"
      />
      <path
        d="M6.287 11.19a.79.79 0 01-.551-.349l-1.6-2.4a.8.8 0 011.329-.888l1.105 1.66 4.117-3.43a.802.802 0 011.127.1.802.802 0 01-.1 1.128l-4.8 4c-.208.211-.59.186-.627.18z"
        fill="#575354"
      />
    </svg>
  )
}
