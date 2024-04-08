import React, { Fragment } from 'react'

interface Props {
  sections: React.ReactElement[]
  versionNotice?: React.ReactElement
  notice?: React.ReactNode
}

const ReadonlyView = ({ sections, versionNotice, notice }: Props) => {
  return (
    <Fragment>
      {versionNotice}
      {notice}
      {sections.map((section, index) => ({
        ...section,
        key: `section-${index}`,
      }))}
    </Fragment>
  )
}

export default ReadonlyView
