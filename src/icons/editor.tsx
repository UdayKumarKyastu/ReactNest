import * as React from 'react'
import { SVGAttributes } from 'react'

export function EditorIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      width={17}
      height={16}
      viewBox="0 0 17 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M12.523 16H1.733A1.739 1.739 0 010 14.267V4.247a1.739 1.739 0 011.733-1.733h3.415a.58.58 0 010 1.158H1.733a.578.578 0 00-.575.575v10.02c0 .316.258.573.575.575h10.788a.575.575 0 00.573-.575v-3.412a.58.58 0 011.159 0v3.414A1.731 1.731 0 0112.523 16z"
        fill="#575354"
      />
      <path
        d="M15.853 2.45L13.58.17a.583.583 0 00-.822 0L5.03 7.9a.563.563 0 00-.147.25l-.919 3.175a.579.579 0 00.712.718l3.203-.881a.561.561 0 00.255-.15l7.722-7.746a.578.578 0 00-.004-.817zM5.367 10.652L5.78 9.22l1.043 1.031-1.457.402zm2.356-.866L6.247 8.323l5.498-5.498 1.466 1.452-5.488 5.51zm6.17-6.194l-1.465-1.451.74-.74 1.456 1.457-.732.734z"
        fill="#575354"
      />
    </svg>
  )
}