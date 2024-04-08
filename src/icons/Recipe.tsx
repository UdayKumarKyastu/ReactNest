import React, { SVGAttributes } from 'react'

type Props = SVGAttributes<SVGElement> & {
  size?: number
  color?: string
}

const Recipe = ({ size = 70, color = '#C5BFC0', ...props }: Props) => {
  return (
    <svg
      viewBox="0 0 54 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      {...props}
    >
      <g clipPath="url(#clip0_12340_67016)">
        <path
          d="M0.0737305 0V70H53.926V0H0.0737305ZM25.0987 14.0557L26.9999 8.43182L28.9169 14.0557H34.159L29.959 17.0148L31.5976 22.1295L26.9999 19.1466L22.4419 22.0898L24.0328 17.0148L19.8408 14.0557H25.0987ZM46.0908 59.0466H7.90896V57.3205H46.0908V59.0466ZM46.0908 53.0648H7.90896V51.3307H46.0908V53.0648ZM46.0908 47.075H7.90896V45.3409H46.0908V47.075ZM46.0908 41.0852H7.90896V39.3511H46.0908V41.0852ZM46.0908 35.0955H7.90896V33.3614H46.0908V35.0955Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_12340_67016">
          <rect width="53.8523" height="70" fill="white" transform="translate(0.0737305)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Recipe
