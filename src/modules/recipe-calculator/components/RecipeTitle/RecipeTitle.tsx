import React, { useCallback, useEffect, useState } from 'react'
import { RecipeTitleStyles } from './RecipeTitle.styles'
import Edit from '../../../../icons/Edit'
import { RecipeCalculatorState } from '../../state/RecipeCalculatorState'

const { Title, Underline, StyledInput } = RecipeTitleStyles

interface Props {
  showEditOption: boolean
}

const RecipeTitle = ({ showEditOption }: Props) => {
  const [editMode, setEditMode] = useState(false)
  const {
    selectors: { recipeName: stateRecipeName },
    actions,
  } = RecipeCalculatorState.useState()
  const [recipeName, setRecipeName] = useState(stateRecipeName)

  const onClickOutside = useCallback(
    (event: MouseEvent) => {
      const inputElement = document.querySelector('#recipe-title-input')
      if (editMode && inputElement !== event.target) {
        setEditMode(false)
        actions.updateRecipeName(recipeName)
      }
    },
    [actions, editMode, recipeName],
  )

  useEffect(() => {
    document.addEventListener('click', onClickOutside, { once: true })
    return () => document.removeEventListener('click', onClickOutside)
  }, [onClickOutside])

  const onChange = useCallback(
    ({ target }: { target: HTMLInputElement }) => {
      setRecipeName(target.value)
    },
    [setRecipeName],
  )

  return (
    <Title data-testid="recipe-title">
      {!editMode && (
        <>
          {stateRecipeName}
          {showEditOption && <Edit data-testid="edit-toggle" onClick={() => setEditMode(true)} />}
          <Underline />
        </>
      )}

      {editMode && <StyledInput id="recipe-title-input" value={recipeName} onChange={onChange} />}
    </Title>
  )
}

export default RecipeTitle
