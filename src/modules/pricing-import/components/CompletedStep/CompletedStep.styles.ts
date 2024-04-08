import tw, { styled } from 'twin.macro'

export const Title = styled('h3')`
  ${tw`text-grey-700 text-3xl leading-3xl mb-3 font-bold flex items-center`}
`
export const TitleTextWrapper = styled('span')`
  ${tw`ml-3`}
`

export const ListWrapper = styled('ul')`
  ${tw`mb-3`}
`

export const Root = styled.div`
  ${tw`pb-8 border-b`}
  min-height: 400px
`
