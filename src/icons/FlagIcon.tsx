import React, { SVGAttributes } from 'react'

export type FlagIcon = React.FC<
  { size: number | string } & SVGAttributes<SVGElement> & {
      css?: any
    }
>

const FR: FlagIcon = ({ size, ...svgProps }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <mask
        id={svgProps.id ? `${svgProps.id}-mask` : 'mask0-fr'}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="63"
        height="63"
      >
        <circle cx="31.5" cy="31.5" r="31.5" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0)">
        <path d="M20.8 -3H-1V62.4H20.8V-3Z" fill="#25377E" />
        <path d="M42.6008 -3H20.8008V62.4H42.6008V-3Z" fill="white" />
        <path d="M64.3996 -3H42.5996V62.4H64.3996V-3Z" fill="#E72E3C" />
      </g>
    </svg>
  )
}

const UK: FlagIcon = ({ size, ...svgProps }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <mask
        id={svgProps.id ? `${svgProps.id}-mask` : 'mask0-uk'}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="63"
        height="63"
      >
        <circle cx="31.5" cy="31.5" r="31.5" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0)">
        <path d="M78.2782 0H-16V62.8891H78.2782V0Z" fill="white" />
        <path d="M-16 42.1479V55.236L4.18662 42.1479H-16Z" fill="#253368" />
        <path d="M-16 8.09692V20.8522H3.63205L-16 8.09692Z" fill="#253368" />
        <path d="M68.629 0H39.791V18.8556L68.629 0Z" fill="#253368" />
        <path d="M22.5985 0H-6.57227L22.5985 18.9666V0Z" fill="#253368" />
        <path d="M-6.01758 62.8892H22.5986V44.2554L-6.01758 62.8892Z" fill="#253368" />
        <path d="M78.3886 20.8521V7.875L58.4238 20.8521H78.3886Z" fill="#253368" />
        <path d="M39.791 62.889H68.0745L39.791 44.4771V62.889Z" fill="#253368" />
        <path d="M78.3885 55.4578V42.1479H57.8691L78.3885 55.4578Z" fill="#253368" />
        <path
          d="M36.0194 25.3997H78.2782V37.6004H36.0194V62.8891H26.2588V37.6004H-16V25.3997H26.2588V0H36.0194V25.3997ZM-16 62.3345V63H-9.67781L22.2658 42.1479H14.9454L-16 62.3345ZM72.2887 0L40.3451 20.8521H47.6655L78.3891 0.776408V0H72.2887ZM47.1109 42.1479L78.2782 62.4454V57.6761L54.4313 42.1479H47.1109ZM14.8345 20.8521L-16 0.776408V5.54577L7.51409 20.8521H14.8345Z"
          fill="#C21720"
        />
      </g>
    </svg>
  )
}

const US: FlagIcon = ({ size, ...svgProps }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <mask
        id={svgProps.id ? `${svgProps.id}-mask` : 'mask0-us'}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="63"
        height="63"
      >
        <circle cx="31.5" cy="31.5" r="31.5" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0)">
        <path
          d="M3.00487 5.21118L3.56053 6.21137L4.67186 6.43364L3.89393 7.21156L4.1162 8.43402L3.00487 7.87835L2.00468 8.43402L2.22695 7.21156L1.33789 6.43364L2.56035 6.21137L3.00487 5.21118Z"
          fill="white"
        />
        <path
          d="M11.0047 5.21118L11.4492 6.21137L12.6717 6.43364L11.7826 7.21156L12.0049 8.43402L11.0047 7.87835L9.89336 8.43402L10.1156 7.21156L9.22656 6.43364L10.449 6.21137L11.0047 5.21118Z"
          fill="white"
        />
        <path
          d="M18.8975 5.21118L19.4531 6.21137L20.5644 6.43364L19.7865 7.21156L19.8976 8.43402L18.8975 7.87835L17.8973 8.43402L18.0084 7.21156L17.2305 6.43364L18.3418 6.21137L18.8975 5.21118Z"
          fill="white"
        />
        <path
          d="M26.7881 5.21118L27.3437 6.21137L28.4551 6.43364L27.6771 7.21156L27.8994 8.43402L26.7881 7.87835L25.7879 8.43402L26.0102 7.21156L25.1211 6.43364L26.3436 6.21137L26.7881 5.21118Z"
          fill="white"
        />
        <path
          d="M3.00487 11.9904L3.56053 13.1017L4.67186 13.2128L3.89393 14.1019L4.1162 15.2132L3.00487 14.6575L2.00468 15.2132L2.22695 14.1019L1.33789 13.2128L2.56035 13.1017L3.00487 11.9904Z"
          fill="white"
        />
        <path
          d="M11.0047 11.9904L11.4492 13.1017L12.6717 13.2128L11.7826 14.1019L12.0049 15.2132L11.0047 14.6575L9.89336 15.2132L10.1156 14.1019L9.22656 13.2128L10.449 13.1017L11.0047 11.9904Z"
          fill="white"
        />
        <path
          d="M18.8975 11.9904L19.4531 13.1017L20.5644 13.2128L19.7865 14.1019L19.8976 15.2132L18.8975 14.6575L17.8973 15.2132L18.0084 14.1019L17.2305 13.2128L18.3418 13.1017L18.8975 11.9904Z"
          fill="white"
        />
        <path
          d="M26.7881 11.9904L27.3437 13.1017L28.4551 13.2128L27.6771 14.1019L27.8994 15.2132L26.7881 14.6575L25.7879 15.2132L26.0102 14.1019L25.1211 13.2128L26.3436 13.1017L26.7881 11.9904Z"
          fill="white"
        />
        <path
          d="M3.00487 18.8805L3.56053 19.8807L4.67186 20.1029L3.89393 20.8809L4.1162 21.9922L3.00487 21.5477L2.00468 21.9922L2.22695 20.8809L1.33789 20.1029L2.56035 19.8807L3.00487 18.8805Z"
          fill="white"
        />
        <path
          d="M11.0047 18.8805L11.4492 19.8807L12.6717 20.1029L11.7826 20.8809L12.0049 21.9922L11.0047 21.5477L9.89336 21.9922L10.1156 20.8809L9.22656 20.1029L10.449 19.8807L11.0047 18.8805Z"
          fill="white"
        />
        <path
          d="M18.8975 18.8805L19.4531 19.8807L20.5644 20.1029L19.7865 20.8809L19.8976 21.9922L18.8975 21.5477L17.8973 21.9922L18.0084 20.8809L17.2305 20.1029L18.3418 19.8807L18.8975 18.8805Z"
          fill="white"
        />
        <path
          d="M26.7881 18.8805L27.3437 19.8807L28.4551 20.1029L27.6771 20.8809L27.8994 21.9922L26.7881 21.5477L25.7879 21.9922L26.0102 20.8809L25.1211 20.1029L26.3436 19.8807L26.7881 18.8805Z"
          fill="white"
        />
        <path
          d="M3.00487 25.6595L3.56053 26.7709L4.67186 26.882L3.89393 27.6599L4.1162 28.8824L3.00487 28.3267L2.00468 28.8824L2.22695 27.6599L1.33789 26.882L2.56035 26.7709L3.00487 25.6595Z"
          fill="white"
        />
        <path
          d="M11.0047 25.6595L11.4492 26.7709L12.6717 26.882L11.7826 27.6599L12.0049 28.8824L11.0047 28.3267L9.89336 28.8824L10.1156 27.6599L9.22656 26.882L10.449 26.7709L11.0047 25.6595Z"
          fill="white"
        />
        <path
          d="M18.8975 25.6595L19.4531 26.7709L20.5644 26.882L19.7865 27.6599L19.8976 28.8824L18.8975 28.3267L17.8973 28.8824L18.0084 27.6599L17.2305 26.882L18.3418 26.7709L18.8975 25.6595Z"
          fill="white"
        />
        <path
          d="M26.7881 25.6595L27.3437 26.7709L28.4551 26.882L27.6771 27.6599L27.8994 28.8824L26.7881 28.3267L25.7879 28.8824L26.0102 27.6599L25.1211 26.882L26.3436 26.7709L26.7881 25.6595Z"
          fill="white"
        />
        <path d="M81.7958 -0.0119629H-13V63H81.7958V-0.0119629Z" fill="white" />
        <path d="M34.898 -0.0119629H-13V33.9945H34.898V-0.0119629Z" fill="#2F4597" />
        <path d="M81.6871 -0.0119629H34.9004V4.98899H81.6871V-0.0119629Z" fill="#E41513" />
        <path d="M81.6871 9.65649H34.9004V14.6574H81.6871V9.65649Z" fill="#E41513" />
        <path d="M81.6871 19.3251H34.9004V24.326H81.6871V19.3251Z" fill="#E41513" />
        <path d="M81.6871 28.9935H34.9004V33.9945H81.6871V28.9935Z" fill="#E41513" />
        <path d="M81.7977 38.6621H-12.998V43.6631H81.7977V38.6621Z" fill="#E41513" />
        <path d="M81.7977 48.3306H-12.998V53.3315H81.7977V48.3306Z" fill="#E41513" />
        <path d="M81.7977 57.999H-12.998V63H81.7977V57.999Z" fill="#E41513" />
        <path
          d="M-0.332435 3.87767L0.89002 2.98862H-0.554699L-0.999228 1.65503L-1.44376 2.98862H-2.77734L-1.66602 3.87767L-2.11055 5.21126L-0.999228 4.3222L0.112094 5.21126L-0.332435 3.87767Z"
          fill="white"
        />
        <path
          d="M7.67128 3.87767L8.7826 2.98862H7.33788L7.00448 1.65503L6.55995 2.98862H5.11523L6.22656 3.87767L5.78203 5.21126L7.00448 4.3222L8.11581 5.21126L7.67128 3.87767Z"
          fill="white"
        />
        <path
          d="M15.5619 3.87767L16.7844 2.98862H15.3396L14.8951 1.65503L14.4506 2.98862H13.0059L14.2283 3.87767L13.7838 5.21126L14.8951 4.3222L16.0064 5.21126L15.5619 3.87767Z"
          fill="white"
        />
        <path
          d="M23.5619 3.87767L24.6732 2.98862H23.2285L22.784 1.65503L22.3394 2.98862H21.0059L22.1172 3.87767L21.6727 5.21126L22.784 4.3222L24.0064 5.21126L23.5619 3.87767Z"
          fill="white"
        />
        <path
          d="M31.4525 3.87767L32.5638 2.98862H31.2303L30.7857 1.65503L30.3412 2.98862H28.8965L30.1189 3.87767L29.6744 5.21126L30.7857 4.3222L31.8971 5.21126L31.4525 3.87767Z"
          fill="white"
        />
        <path
          d="M3.66932 7.21161L4.78064 6.43368H3.44706L3.00253 5.1001L2.558 6.43368H1.11328L2.33574 7.21161L1.89121 8.5452L3.00253 7.76727L4.11385 8.5452L3.66932 7.21161Z"
          fill="white"
        />
        <path
          d="M11.6732 7.21161L12.7846 6.43368H11.3398L10.8953 5.1001L10.4508 6.43368H9.11719L10.2285 7.21161L9.78398 8.5452L10.8953 7.76727L12.1178 8.5452L11.6732 7.21161Z"
          fill="white"
        />
        <path
          d="M19.5619 7.21161L20.6732 6.43368H19.3396L18.8951 5.1001L18.4506 6.43368H17.0059L18.1172 7.21161L17.6727 8.5452L18.8951 7.76727L20.0064 8.5452L19.5619 7.21161Z"
          fill="white"
        />
        <path
          d="M27.4508 7.21161L28.6732 6.43368H27.2285L26.784 5.1001L26.3394 6.43368H25.0059L26.1172 7.21161L25.6727 8.5452L26.784 7.76727L27.8953 8.5452L27.4508 7.21161Z"
          fill="white"
        />
        <path
          d="M-0.330482 10.6567L0.891973 9.76767H-0.552746L-0.997275 8.43408L-1.4418 9.76767H-2.77539L-1.66407 10.6567L-2.1086 11.9903L-0.997275 11.1013L0.114048 11.9903L-0.330482 10.6567Z"
          fill="white"
        />
        <path
          d="M7.67128 10.6567L8.7826 9.76767H7.33788L7.00448 8.43408L6.55995 9.76767H5.11523L6.22656 10.6567L5.78203 11.9903L7.00448 11.1013L8.11581 11.9903L7.67128 10.6567Z"
          fill="white"
        />
        <path
          d="M15.5619 10.6567L16.7844 9.76767H15.3396L14.8951 8.43408L14.4506 9.76767H13.0059L14.2283 10.6567L13.7838 11.9903L14.8951 11.1013L16.0064 11.9903L15.5619 10.6567Z"
          fill="white"
        />
        <path
          d="M23.5619 10.6567L24.6732 9.76767H23.2285L22.784 8.43408L22.3394 9.76767H21.0059L22.1172 10.6567L21.6727 11.9903L22.784 11.1013L24.0064 11.9903L23.5619 10.6567Z"
          fill="white"
        />
        <path
          d="M31.4525 10.6567L32.5638 9.76767H31.2303L30.7857 8.43408L30.3412 9.76767H28.8965L30.1189 10.6567L29.6744 11.9903L30.7857 11.1013L31.8971 11.9903L31.4525 10.6567Z"
          fill="white"
        />
        <path
          d="M3.66932 13.9907L4.78064 13.2127H3.44706L3.00253 11.8792L2.558 13.2127H1.11328L2.33574 13.9907L1.89121 15.4354L3.00253 14.5463L4.11385 15.4354L3.66932 13.9907Z"
          fill="white"
        />
        <path
          d="M11.6732 13.9907L12.7846 13.2127H11.3398L10.8953 11.8792L10.4508 13.2127H9.11719L10.2285 13.9907L9.78398 15.4354L10.8953 14.5463L12.1178 15.4354L11.6732 13.9907Z"
          fill="white"
        />
        <path
          d="M19.5619 13.9907L20.6732 13.2127H19.3396L18.8951 11.8792L18.4506 13.2127H17.0059L18.1172 13.9907L17.6727 15.4354L18.8951 14.5463L20.0064 15.4354L19.5619 13.9907Z"
          fill="white"
        />
        <path
          d="M27.4508 13.9907L28.6732 13.2127H27.2285L26.784 11.8792L26.3394 13.2127H25.0059L26.1172 13.9907L25.6727 15.4354L26.784 14.5463L27.8953 15.4354L27.4508 13.9907Z"
          fill="white"
        />
        <path
          d="M-0.330482 17.4359L0.891973 16.6579H-0.552746L-0.997275 15.3243L-1.4418 16.6579H-2.77539L-1.66407 17.4359L-2.1086 18.7694L-0.997275 17.9915L0.114048 18.7694L-0.330482 17.4359Z"
          fill="white"
        />
        <path
          d="M7.67128 17.4359L8.7826 16.6579H7.33788L7.00448 15.3243L6.55995 16.6579H5.11523L6.22656 17.4359L5.78203 18.7694L7.00448 17.9915L8.11581 18.7694L7.67128 17.4359Z"
          fill="white"
        />
        <path
          d="M15.5619 17.4359L16.7844 16.6579H15.3396L14.8951 15.3243L14.4506 16.6579H13.0059L14.2283 17.4359L13.7838 18.7694L14.8951 17.9915L16.0064 18.7694L15.5619 17.4359Z"
          fill="white"
        />
        <path
          d="M23.5619 17.4359L24.6732 16.6579H23.2285L22.784 15.3243L22.3394 16.6579H21.0059L22.1172 17.4359L21.6727 18.7694L22.784 17.9915L24.0064 18.7694L23.5619 17.4359Z"
          fill="white"
        />
        <path
          d="M31.4525 17.4359L32.5638 16.6579H31.2303L30.7857 15.3243L30.3412 16.6579H28.8965L30.1189 17.4359L29.6744 18.7694L30.7857 17.9915L31.8971 18.7694L31.4525 17.4359Z"
          fill="white"
        />
        <path
          d="M3.66932 20.881L4.78064 19.9919H3.44706L3.00253 18.6583L2.558 19.9919H1.11328L2.33574 20.881L1.89121 22.2146L3.00253 21.3255L4.11385 22.2146L3.66932 20.881Z"
          fill="white"
        />
        <path
          d="M11.6732 20.881L12.7846 19.9919H11.3398L10.8953 18.6583L10.4508 19.9919H9.11719L10.2285 20.881L9.78398 22.2146L10.8953 21.3255L12.1178 22.2146L11.6732 20.881Z"
          fill="white"
        />
        <path
          d="M19.5619 20.881L20.6732 19.9919H19.3396L18.8951 18.6583L18.4506 19.9919H17.0059L18.1172 20.881L17.6727 22.2146L18.8951 21.3255L20.0064 22.2146L19.5619 20.881Z"
          fill="white"
        />
        <path
          d="M27.4508 20.881L28.6732 19.9919H27.2285L26.784 18.6583L26.3394 19.9919H25.0059L26.1172 20.881L25.6727 22.2146L26.784 21.3255L27.8953 22.2146L27.4508 20.881Z"
          fill="white"
        />
        <path
          d="M-0.330482 24.2149L0.891973 23.437H-0.552746L-0.997275 22.1034L-1.4418 23.437H-2.77539L-1.66407 24.2149L-2.1086 25.5485L-0.997275 24.7706L0.114048 25.5485L-0.330482 24.2149Z"
          fill="white"
        />
        <path
          d="M7.67128 24.2149L8.7826 23.437H7.33788L7.00448 22.1034L6.55995 23.437H5.11523L6.22656 24.2149L5.78203 25.5485L7.00448 24.7706L8.11581 25.5485L7.67128 24.2149Z"
          fill="white"
        />
        <path
          d="M15.5619 24.2149L16.7844 23.437H15.3396L14.8951 22.1034L14.4506 23.437H13.0059L14.2283 24.2149L13.7838 25.5485L14.8951 24.7706L16.0064 25.5485L15.5619 24.2149Z"
          fill="white"
        />
        <path
          d="M23.5619 24.2149L24.6732 23.437H23.2285L22.784 22.1034L22.3394 23.437H21.0059L22.1172 24.2149L21.6727 25.5485L22.784 24.7706L24.0064 25.5485L23.5619 24.2149Z"
          fill="white"
        />
        <path
          d="M31.4525 24.2149L32.5638 23.437H31.2303L30.7857 22.1034L30.3412 23.437H28.8965L30.1189 24.2149L29.6744 25.5485L30.7857 24.7706L31.8971 25.5485L31.4525 24.2149Z"
          fill="white"
        />
        <path
          d="M3.66932 27.6599L4.78064 26.7708H3.44706L3.00253 25.4373L2.558 26.7708H1.11328L2.33574 27.6599L1.89121 28.9935L3.00253 28.2156L4.11385 28.9935L3.66932 27.6599Z"
          fill="white"
        />
        <path
          d="M11.6732 27.6599L12.7846 26.7708H11.3398L10.8953 25.4373L10.4508 26.7708H9.11719L10.2285 27.6599L9.78398 28.9935L10.8953 28.2156L12.1178 28.9935L11.6732 27.6599Z"
          fill="white"
        />
        <path
          d="M19.5619 27.6599L20.6732 26.7708H19.3396L18.8951 25.4373L18.4506 26.7708H17.0059L18.1172 27.6599L17.6727 28.9935L18.8951 28.2156L20.0064 28.9935L19.5619 27.6599Z"
          fill="white"
        />
        <path
          d="M27.4508 27.6599L28.6732 26.7708H27.2285L26.784 25.4373L26.3394 26.7708H25.0059L26.1172 27.6599L25.6727 28.9935L26.784 28.2156L27.8953 28.9935L27.4508 27.6599Z"
          fill="white"
        />
        <path
          d="M-0.330482 31.1051L0.891973 30.216H-0.552746L-0.997275 28.8824L-1.4418 30.216H-2.77539L-1.66407 31.1051L-2.1086 32.4387L-0.997275 31.5496L0.114048 32.4387L-0.330482 31.1051Z"
          fill="white"
        />
        <path
          d="M7.67128 31.1051L8.7826 30.216H7.33788L7.00448 28.8824L6.55995 30.216H5.11523L6.22656 31.1051L5.78203 32.4387L7.00448 31.5496L8.11581 32.4387L7.67128 31.1051Z"
          fill="white"
        />
        <path
          d="M15.5619 31.1051L16.7844 30.216H15.3396L14.8951 28.8824L14.4506 30.216H13.0059L14.2283 31.1051L13.7838 32.4387L14.8951 31.5496L16.0064 32.4387L15.5619 31.1051Z"
          fill="white"
        />
        <path
          d="M23.5619 31.1051L24.6732 30.216H23.2285L22.784 28.8824L22.3394 30.216H21.0059L22.1172 31.1051L21.6727 32.4387L22.784 31.5496L24.0064 32.4387L23.5619 31.1051Z"
          fill="white"
        />
        <path
          d="M31.4525 31.1051L32.5638 30.216H31.2303L30.7857 28.8824L30.3412 30.216H28.8965L30.1189 31.1051L29.6744 32.4387L30.7857 31.5496L31.8971 32.4387L31.4525 31.1051Z"
          fill="white"
        />
      </g>
    </svg>
  )
}

const HK: FlagIcon = ({ size, ...svgProps }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <mask
        id={svgProps.id ? `${svgProps.id}-mask` : 'mask0-hk'}
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="63"
        height="63"
      >
        <circle cx="31.5" cy="31.5" r="31.5" fill="#C4C4C4" />
      </mask>
      <g mask="url(#mask0)">
        <path d="M78.4444 0H-16V63H78.4444V0Z" fill="#DF2C14" />
        <path
          d="M28.5562 28.6667C27.4451 26.3334 28.0006 23.1111 29.1117 21.6667L29.3339 21.8889C28.2228 23.3334 27.7784 26.4445 28.8895 28.6667C29.334 29.5556 30.0006 30.4445 30.6673 31C30.4451 30.7778 30.334 30.4445 30.1117 30.2222C29.2228 28.3334 30.0006 26 31.8895 25.1111C32.0006 25 32.2228 24.8889 32.2228 24.8889C34.5562 23.7778 35.6673 21 34.6673 18.5556C34.4451 18.1111 34.2229 17.7778 34.1117 17.5556C33.4451 16 34.1117 14.2222 35.6673 13.5556C35.7784 13.5556 35.8895 13.4445 35.8895 13.4445C34.2229 13.2222 32.5562 13.4445 30.8895 14.2222C26.1117 16.4445 23.6673 22 25.8895 26.6667C26.8895 28.7778 28.6673 30.4445 30.6673 31.3334C29.6673 30.5556 29.0006 29.6667 28.5562 28.6667ZM29.5562 20V18.8889L30.4451 19.5556L31.4451 19.2222L31.1117 20.2222L31.7784 21.1111H30.6673L30.0006 22L29.6673 20.8889L28.6673 20.5556L29.5562 20ZM47.6673 25.5556C44.1117 21.7778 38.0006 21.1111 34.2229 24.6667C32.4451 26.3334 31.5562 28.4445 31.334 30.5556C31.6673 29.6667 32.2229 28.6667 33.1117 28C35.0006 26.2222 38.1117 25.6667 40.0006 26.3334L39.8895 26.6667C38.1117 26.1111 35.1117 26.6667 33.334 28.3334C32.6673 29 32.0006 29.8889 31.6673 30.7778C31.7784 30.5556 32.0006 30.2222 32.2228 30.1111C33.7784 28.6667 36.1117 28.6667 37.6673 30.2222C37.7784 30.2222 37.8895 30.4445 37.8895 30.4445C39.6673 32.3334 42.6673 32.4445 44.6673 30.7778C45.0006 30.4445 45.3339 30.1111 45.4451 29.8889C46.6673 28.7778 48.5562 28.7778 49.7784 30C49.8895 30.1111 49.8895 30.1111 50.0006 30.2222C49.7784 28.5556 49.0006 27 47.6673 25.5556ZM42.334 27.1111L43.0006 28H41.8895L41.2228 28.8889L40.8895 27.7778L39.8895 27.4445L40.7784 26.8889V25.7778L41.6673 26.4445L42.6673 26.1111L42.334 27.1111ZM24.6673 35.1111C27.0006 34.7778 29.1117 33.6667 30.5562 32C29.7784 32.5556 28.6673 33 27.5562 33.1111C25.0006 33.4445 22.1117 32 21.0006 30.4445L21.2228 30.2222C22.334 31.6667 25.0006 33.1111 27.4451 32.7778C28.4451 32.6667 29.4451 32.3334 30.2229 31.7778C29.8895 31.8889 29.6673 32 29.3339 32C27.2228 32.2222 25.334 30.7778 25.0006 28.7778C25.0006 28.6667 24.8895 28.4445 24.8895 28.4445C24.5562 25.8889 22.2228 24 19.5562 24.2222C19.1117 24.2222 18.6673 24.4445 18.334 24.4445C16.6673 24.6667 15.1117 23.4445 15.0006 21.7778C15.0006 21.6667 15.0006 21.5556 15.0006 21.4445C14.334 22.8889 14.0006 24.6667 14.2229 26.4445C15.0006 31.6667 19.5562 35.7778 24.6673 35.1111ZM19.6673 28.4445V27.3334L20.5562 28L21.6673 27.6667L21.2228 28.6667L21.8895 29.5556H20.7784L20.1117 30.4445L19.7784 29.3334L18.7784 29L19.6673 28.4445ZM32.0006 31.3334C33.0006 31.3334 34.1117 31.6667 35.1117 32.1111C37.334 33.3334 38.8895 36.2222 38.8895 38.1111H38.5562C38.5562 36.3334 37.1117 33.5556 35.0006 32.3334C34.1117 31.8889 33.1117 31.5556 32.2228 31.5556C32.5562 31.6667 32.7784 31.7778 33.1117 31.8889C35.0006 32.8889 35.6673 35.2222 34.6673 37.1111C34.6673 37.2222 34.5562 37.4445 34.5562 37.4445C33.334 39.7778 34.1117 42.6667 36.334 44C36.6673 44.2222 37.2229 44.3334 37.4451 44.5556C38.8895 45.3334 39.4451 47.2222 38.6673 48.6667C38.6673 48.7778 38.5562 48.7778 38.5562 48.8889C40.0006 48.1111 41.2228 46.8889 42.1117 45.2222C44.6673 40.6667 43.3339 34.6667 38.7784 32.2222C36.4451 31.1111 34.1117 30.8889 32.0006 31.3334ZM39.8895 40.6667H38.7784L38.1117 41.5556L37.7784 40.4445L36.7784 40.1111L37.6673 39.5556V38.4445L38.5562 39.1111L39.5562 38.7778L39.2229 39.7778L39.8895 40.6667ZM31.5562 32.2222C31.8895 33.1111 31.8895 34.3334 31.6673 35.3334C31.2228 37.8889 28.8895 40.1111 27.1117 40.7778L27.0006 40.4445C28.6673 39.8889 30.8895 37.6667 31.334 35.2222C31.5562 34.2222 31.4451 33.2222 31.2228 32.3334C31.2228 32.6667 31.2228 32.8889 31.1117 33.2222C30.6673 35.3334 28.7784 36.6667 26.6673 36.3334C26.5562 36.3334 26.334 36.3334 26.334 36.3334C23.7784 35.8889 21.2228 37.5556 20.6673 40.1111C20.5562 40.5556 20.5562 41 20.5562 41.3334C20.2228 43 18.6673 44.1111 17.0006 43.7778C16.8895 43.7778 16.7784 43.7778 16.7784 43.6667C18.0006 44.7778 19.5562 45.5556 21.334 45.8889C26.4451 46.8889 31.6673 43.7778 32.6673 38.6667C33.2228 36.3334 32.6673 34.1111 31.5562 32.2222ZM26.8895 41.7778H25.7784L25.1117 42.6667L24.7784 41.5556L23.7784 41.2222L24.6673 40.6667V39.5556L25.5562 40.2222L26.5562 39.8889L26.2228 40.8889L26.8895 41.7778Z"
          fill="white"
        />
      </g>
    </svg>
  )
}

const ALL: FlagIcon = ({ size, ...svgProps }) => {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
      width={size}
      height={size}
    >
      <circle cx="8" cy="8" r="8" fill="#F6F4F5" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.01485 3L6.67587 7.10587H3L5.97136 9.26369L4.83989 12.9727L8.01485 10.8188L11.2161 13L10.0774 9.26369L13 7.10587H9.35059L8.01485 3Z"
        fill="#9F1B32"
      />
    </svg>
  )
}

export const FlagIcon = {
  FR,
  UK,
  US,
  HK,
  ALL,
}
