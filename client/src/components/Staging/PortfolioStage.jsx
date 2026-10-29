import StatusBadge from '../ui/StatusBadge'
import Label from '../ui/Label'
import WarningIcon from '../../svg/Staging/WarningIcon'
import { Button } from '../Buttons/Button'
import { GeodeAvatar } from '@/components/geode/Avatar'
import { ExternalLink } from '@/components/geode/icons'

const PortfolioStage = ({ stageData, onAssign, onReject, onMoveToNextRound }) => {
  const { status, assignedTo, score, remarks, rejectionReason } = stageData

  const renderContent = () => {
    switch (status) {
      case 'Not Assigned':
        return <Label icon={WarningIcon} text="Candidate's portfolio has not yet been assigned to a reviewer." />
      case 'Under review':
        return <p className="typography-body">Portfolio is currently under review by the design reviewer</p>
      case 'Reviewed':
      case 'Cleared':
        return (
          <>
            <p className="typography-body">{remarks}</p>
            <div className="flex items-center justify-between">
              <span className="typography-body">Score</span>
              <span className="text-geode-h4 font-geode-heading">{score} <small>out of 5</small></span>
            </div>
          </>
        )
      case 'Rejected':
        return (
          <>
            <p className="typography-body">Reason for rejection</p>
            <p className="typography-body">{rejectionReason}</p>
            <div className="flex items-center justify-between">
              <span className="typography-body">Score</span>
              <span className="text-geode-h4 font-geode-heading">{score} <small>out of 5</small></span>
            </div>
          </>
        )
      default:
        return null
    }
  }

  const renderActions = () => {
    if (status === 'Not assigned') return <Button variant="primary" onClick={onAssign}>Assign Portfolio</Button>
    if (status === 'Reviewed') {
      return (
        <>
          <Button variant="cancel" onClick={onReject}>Reject</Button>
          <Button variant="primary" onClick={onMoveToNextRound}>Move to next round</Button>
        </>
      )
    }
    return null
  }

  return (
    <section className="geode-accordion">
      <div className="flex flex-col gap-geode-3 p-geode-card">
        <div className="flex items-center justify-between gap-geode-3">
          <div className="flex items-center gap-geode-3">
            <h3>Portfolio</h3>
            <a className="typography-body flex items-center gap-2 underline" href="duumy">
              View Portfolio
              <ExternalLink />
            </a>
          </div>
          <div className="flex items-center gap-geode-2">
            <StatusBadge status={status} />
            {assignedTo ? (
              <span className="geode-avatar-sm">
                <GeodeAvatar src={assignedTo.avatar} name={assignedTo.name || ''} />
              </span>
            ) : null}
          </div>
        </div>
        {renderContent()}
        <div className="flex items-center justify-between gap-geode-3">
          {renderActions()}
        </div>
      </div>
    </section>
  )
}

export default PortfolioStage
