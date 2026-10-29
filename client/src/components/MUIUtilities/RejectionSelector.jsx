import { AnchoredMenu } from '@/components/shadcn/anchored-menu'
import { REJECTION_REASONS } from '../Modals/Modal'

function RejectionSelector({ selectedAnchor, handleClose, handleReasonSelect }) {
  return (
    <AnchoredMenu
      open={Boolean(selectedAnchor)}
      anchorEl={selectedAnchor}
      onClose={handleClose}
      className="geode-menu-anchor"
    >
      {REJECTION_REASONS.length > 0 ? REJECTION_REASONS.map((reason) => (
        <button
          type="button"
          className="geode-menu-item"
          key={reason?.label}
          onClick={() => {
            handleReasonSelect(reason?.value)
            handleClose()
          }}
        >
          {reason?.label}
        </button>
      )) : (
        <div className="geode-menu-item">No reasons found</div>
      )}
    </AnchoredMenu>
  )
}

export default RejectionSelector
