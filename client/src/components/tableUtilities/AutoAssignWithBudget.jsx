import React from 'react'
import Budget from '../../svg/Buttons/Budget'
import AutoAssign from '../../svg/Buttons/AutoAssign'
import { Button } from '../Buttons/Button'

function AutoAssignWithBudget({handleBudgetButtonClick,budgetFilter,autoAssignMutation,setIsAutoAssignModalOpen}) {
  return (
    <div className='flex gap-4'>
        <div className={`${budgetFilter.from || budgetFilter.to ? "" : "hidden"}`}>
            <Button
                icon={AutoAssign}
                variant="primary"
                onClick={() => setIsAutoAssignModalOpen(true)}
                disabled={autoAssignMutation.isLoading}
            >
                {(autoAssignMutation.isLoading ? 'Auto-Assigning...' : 'Auto-Assign Portfolio')}
            </Button>
            </div>
            <div className={`${budgetFilter.from || budgetFilter.to ? "auto" : ""}`}>

            <Button
                variant={budgetFilter.from || budgetFilter.to ? "iconSec" : "primary"}
                icon={Budget}
                onClick={handleBudgetButtonClick}
            >
                {budgetFilter.from || budgetFilter.to ? '' : 'Screen With Budget'}
            </Button>
        </div>
    </div>
  )
}

export default AutoAssignWithBudget
