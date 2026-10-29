import { AnchoredMenu } from '@/components/shadcn/anchored-menu'
import IconWrapper from '../Cards/IconWrapper'
import { SquarePen, Trash } from '@/components/geode/icons'

function BudgetMenu({ budgetMenuAnchorEl, handleBudgetMenuClose, handleBudgetEdit, handleBudgetClear }) {
  return (
    <AnchoredMenu
      open={Boolean(budgetMenuAnchorEl)}
      anchorEl={budgetMenuAnchorEl}
      onClose={handleBudgetMenuClose}
      align="end"
    >
      <button type="button" className="geode-menu-item" onClick={handleBudgetEdit}>
        <IconWrapper icon={SquarePen} size={0} customIconSize={4} />
        Edit
      </button>
      <button type="button" className="geode-menu-item geode-menu-danger" onClick={handleBudgetClear}>
        <IconWrapper icon={Trash} isErrorIcon size={0} customIconSize={4} />
        Clear
      </button>
    </AnchoredMenu>
  )
}

export default BudgetMenu
