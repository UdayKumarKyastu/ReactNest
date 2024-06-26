import React, { SVGAttributes } from 'react'

type Props = SVGAttributes<SVGElement> & {
  size?: number
}

const Chef = ({ size = 70, ...props }: Props) => {
  return (
    <svg
      viewBox="0 0 70 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      height={size}
      {...props}
    >
      <g clipPath="url(#clip0_12340_66450)">
        <path d="M16.3226 63.6196H53.8967V69.9999H16.3226V63.6196Z" fill="#C5BFC0" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.4029 7.56079C18.1224 7.56306 18.841 7.60567 19.5551 7.68839C21.284 5.30181 23.6055 3.352 26.3164 2.00959C29.0274 0.667177 32.0452 -0.0269232 35.1058 -0.0119705C38.1664 0.00298223 41.1765 0.726532 43.8726 2.09536C46.5688 3.46419 48.8688 5.43658 50.5715 7.83993C51.2433 7.75986 51.9199 7.71991 52.5971 7.7203C57.1059 7.72544 61.4366 9.384 64.677 12.3466C67.9174 15.3093 69.8146 19.3447 69.9688 23.6029C70.1231 27.8611 68.5224 32.0097 65.504 35.1748C62.4855 38.3399 58.285 40.2744 53.7871 40.5709V61.5462H16.2129V40.4034C11.6919 40.1383 7.45861 38.2171 4.41331 35.0483C1.36801 31.8796 -0.249069 27.7132 -0.0940628 23.4352C0.0609436 19.1573 1.97581 15.1052 5.24334 12.1407C8.51087 9.17616 12.8733 7.53306 17.4029 7.56079ZM31.2949 54.2009L35 51.9359L38.6544 54.169L37.3547 50.3169L40.7306 48.0758H36.5107L35 43.8169L33.4639 48.0758H29.244L32.62 50.3169L31.2949 54.2009Z"
          fill="#C5BFC0"
        />
      </g>
      <defs>
        <clipPath id="clip0_12340_66450">
          <rect width="70" height="70" fill="white" transform="matrix(-1 0 0 1 70 0)" />
        </clipPath>
      </defs>
    </svg>
  )
}

export default Chef
