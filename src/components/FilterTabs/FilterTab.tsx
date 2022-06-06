import * as React from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectArticlesFilter } from '../../app/slices/articlesSlice'
import { ResponseType } from '../../types/api'

interface FilterTabProps {
  filterType: ResponseType
  onClick: () => void
  children: React.ReactNode
}

const FilterTab: React.FC<FilterTabProps> = ({
  filterType,
  onClick,
  children,
}) => {
  const stateFilter = useAppSelector(selectArticlesFilter)

  if (!stateFilter) return null

  const btnClass = filterType === stateFilter.type ? 'active' : ''

  return (
    <li className="nav-item">
      <button className={`nav-link ${btnClass}`} onClick={onClick}>
        {children}
      </button>
    </li>
  )
}

export default FilterTab
