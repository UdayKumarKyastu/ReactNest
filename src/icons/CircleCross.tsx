import { SVGAttributes } from 'react'

export const CircleCross = (props: SVGAttributes<SVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.833252 8.00004C0.833252 4.042 4.04188 0.833374 7.99992 0.833374C11.958 0.833374 15.1666 4.042 15.1666 8.00004C15.1666 11.9581 11.958 15.1667 7.99992 15.1667C4.04188 15.1667 0.833252 11.9581 0.833252 8.00004ZM10.3535 5.64648C10.5488 5.84174 10.5488 6.15832 10.3535 6.35358L8.70705 8.00003L10.3535 9.64648C10.5488 9.84174 10.5488 10.1583 10.3535 10.3536C10.1582 10.5488 9.84165 10.5488 9.64639 10.3536L7.99994 8.70714L6.35349 10.3536C6.15823 10.5488 5.84165 10.5488 5.64639 10.3536C5.45112 10.1583 5.45112 9.84174 5.64639 9.64648L7.29283 8.00003L5.64639 6.35358C5.45112 6.15832 5.45112 5.84174 5.64639 5.64648C5.84165 5.45121 6.15823 5.45121 6.35349 5.64648L7.99994 7.29292L9.64639 5.64648C9.84165 5.45121 10.1582 5.45121 10.3535 5.64648Z"
        fill="#D60000"
      />
    </svg>
  )
}