import { AnchoredMenu } from '@/components/shadcn/anchored-menu'
import IconWrapper from '../Cards/IconWrapper'
import { Star } from '@/components/geode/icons'

export const getRatingIcon = (rating) => {
  const tone = {
    'Good Fit': 'text-status-textgreen',
    'Not A Good Fit': 'text-status-textred',
    'May Be': 'text-status-textyellow',
  }[rating] || 'text-font-main'
  return (
    <div className={tone}>
      <IconWrapper inheritColor icon={Star} size={0} customIconSize={5} />
    </div>
  )
}

function RatingSelector({ anchorEl, setAnchorEl, onSelectRating }) {
  return (
    <AnchoredMenu open={Boolean(anchorEl)} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
      {['Good Fit', 'Not A Good Fit', 'May Be'].map((rating) => (
        <button
          type="button"
          className="geode-menu-item"
          key={rating}
          onClick={() => {
            onSelectRating(rating)
            setAnchorEl(null)
          }}
        >
          {getRatingIcon(rating)}
          <span>{rating}</span>
        </button>
      ))}
    </AnchoredMenu>
  )
}

export default RatingSelector
