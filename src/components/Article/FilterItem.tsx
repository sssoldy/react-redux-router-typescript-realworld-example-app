import { AsyncThunkAction } from '@reduxjs/toolkit/dist/createAsyncThunk'
import * as React from 'react'
import { useAppDispatch } from '../../app/hooks'

interface FilterItemProps {
  isActive: boolean
  onFilterClick: () => AsyncThunkAction<any, any, {}>
  children: React.ReactNode
}

const FilterItem: React.FC<FilterItemProps> = ({
  isActive,
  onFilterClick,
  children,
}) => {
  const dispatch = useAppDispatch()

  const onButtonClicked = () => {
    dispatch(onFilterClick())
  }

  return (
    <li className="nav-item">
      <button
        className={`nav-link ${isActive ? 'active' : ''}`}
        style={{ outline: 'none' }}
        onClick={onButtonClicked}
      >
        {children}
      </button>
    </li>
  )
}

export default FilterItem
