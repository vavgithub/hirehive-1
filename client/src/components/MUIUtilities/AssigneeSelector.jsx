import { useEffect, useState } from 'react'
import { fetchAllDesignReviewers } from '../../services/auth.service'
import { useQuery } from '@tanstack/react-query'
import IconWrapper from '../Cards/IconWrapper'
import { ChevronDown, Search, UserRoundPlus } from '@/components/geode/icons'
import { AnchoredMenu } from '@/components/shadcn/anchored-menu'
import { GeodeAvatar } from '@/components/geode/Avatar'

const AssigneeSelector = ({
  mode = 'icon',
  value,
  onChange,
  onSelect,
  disabled = false,
  selectedAnchor,
  closeSelectedAnchor,
  autoFill = false,
  previousAssigneeId = null,
  stackedValues = [],
  fullWidth = false,
}) => {
  const [reviewers, setReviewers] = useState([])
  const [selectedReviewer, setSelectedReviewer] = useState(null)
  const [anchorEl, setAnchorEl] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')

  const { data: designReviewers, isLoading } = useQuery({
    queryKey: ['getAllDesignReviewers'],
    queryFn: () => fetchAllDesignReviewers(),
  })

  useEffect(() => {
    if (designReviewers && designReviewers?.data?.length > 0) setReviewers(designReviewers.data)
    else setReviewers([])
  }, [designReviewers])

  const handleClose = () => {
    if (closeSelectedAnchor) closeSelectedAnchor(null)
    setAnchorEl(null)
  }

  const handleSelect = (reviewer) => {
    if (disabled || !reviewer) return
    setSelectedReviewer(reviewer)
    if (onChange) onChange(reviewer)
    if (onSelect) onSelect(reviewer)
    handleClose()
  }

  useEffect(() => {
    if (autoFill && previousAssigneeId) {
      const match = reviewers?.find((reviewer) => reviewer._id === previousAssigneeId)
      if (match) handleSelect(match)
    }
  }, [reviewers, autoFill, previousAssigneeId])

  useEffect(() => {
    if (value && reviewers.length > 0) {
      const reviewer = reviewers.find((item) => item._id === value || item._id === value._id)
      setSelectedReviewer(reviewer || (designReviewers?.admin?._id === (value || value?._id) ? designReviewers?.admin : null) || null)
    } else {
      setSelectedReviewer(null)
    }
  }, [value, reviewers, designReviewers])

  const filteredReviewers = reviewers?.length > 0
    ? reviewers.filter((reviewer) => `${reviewer.firstName} ${reviewer?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()))
    : []

  const menuAnchor = mode === 'dropdown' ? selectedAnchor : anchorEl
  const reviewerName = (reviewer) => `${reviewer?.firstName || ''} ${reviewer?.lastName || ''}`.trim()

  const menu = (
    <AnchoredMenu open={Boolean(menuAnchor)} anchorEl={menuAnchor} onClose={handleClose} className="geode-menu-anchor">
      <div className="geode-menu-search-wrap">
        <IconWrapper icon={Search} size={0} customIconSize={3} isInActiveIcon />
        <input
          className="geode-menu-search"
          placeholder="Search"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          onKeyDown={(event) => event.stopPropagation()}
        />
      </div>
      {isLoading ? <div className="geode-menu-item"><span className="geode-spinner" /></div> : null}
      {!isLoading && filteredReviewers.length > 0 ? filteredReviewers.map((reviewer) => (
        <button
          type="button"
          className="geode-menu-item"
          data-selected={reviewer?._id === selectedReviewer?._id ? 'true' : 'false'}
          key={reviewer._id}
          onClick={() => handleSelect(reviewer)}
        >
          <span className="geode-avatar-sm">
            <GeodeAvatar src={reviewer.profilePicture} name={reviewerName(reviewer)} />
          </span>
          <span>{reviewerName(reviewer)}</span>
        </button>
      )) : null}
      {!isLoading && filteredReviewers.length === 0 ? <div className="geode-menu-item">No reviewers found</div> : null}
    </AnchoredMenu>
  )

  if (mode === 'dropdown') return menu

  if (mode === 'icon') {
    const stackedReviewerObjects = (Array.isArray(stackedValues) ? stackedValues : [])
      .map((item) => {
        const id = typeof item === 'string' ? item : item?._id || item
        return reviewers.find((reviewer) => reviewer._id === id) || (designReviewers?.admin?._id === id ? designReviewers?.admin : null) || null
      })
      .filter(Boolean)

    return (
      <>
        <button
          type="button"
          className="geode-icon-button"
          onClick={(event) => {
            if (disabled) return
            setAnchorEl(event.currentTarget)
            setSearchTerm('')
          }}
          disabled={disabled}
        >
          {stackedReviewerObjects.length > 1 ? (
            <span className="geode-avatar-stack">
              {stackedReviewerObjects.slice(0, 3).map((reviewer) => (
                <span key={reviewer._id} className="geode-avatar-sm">
                  <GeodeAvatar src={reviewer.profilePicture} name={reviewerName(reviewer)} />
                </span>
              ))}
            </span>
          ) : selectedReviewer ? (
            <span className="geode-avatar-sm">
              <GeodeAvatar src={selectedReviewer.profilePicture} name={reviewerName(selectedReviewer)} />
            </span>
          ) : (
            <span className={`rounded-full bg-background-70 ${disabled ? '' : 'hover-outline'}`}>
              <IconWrapper icon={UserRoundPlus} customIconSize={2} size={3} />
            </span>
          )}
        </button>
        {menu}
      </>
    )
  }

  return (
    <div className={fullWidth ? 'w-full' : undefined}>
      <button
        type="button"
        className="geode-select"
        disabled={disabled}
        onClick={(event) => {
          if (disabled) return
          setAnchorEl(event.currentTarget)
          setSearchTerm('')
        }}
      >
        <span>{selectedReviewer ? reviewerName(selectedReviewer) : 'Select Reviewer'}</span>
        {isLoading ? <span className="geode-spinner" /> : <ChevronDown />}
      </button>
      {menu}
    </div>
  )
}

export default AssigneeSelector
