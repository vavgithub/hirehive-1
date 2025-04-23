import React from 'react'
import { Button } from '../Buttons/Button'
import { Banknote , FolderSync} from 'lucide-react'
import IconWrapper from '../Cards/IconWrapper'

function AutoAssignWithBudget({ handleBudgetButtonClick, budgetFilter, autoAssignMutation, setIsAutoAssignModalOpen }) {
    return (
        <div className='flex gap-4'>
            <div className={`${budgetFilter.from || budgetFilter.to ? "" : "hidden"}`}>
                <Button
                    icon={() => <IconWrapper icon={FolderSync} size={0} customIconSize={5} customStrokeWidth={5} />}

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
                    icon={() => <IconWrapper icon={Banknote} size={0} customIconSize={5} customStrokeWidth={5} />}
                    onClick={handleBudgetButtonClick}
                >
                    {budgetFilter.from || budgetFilter.to ? '' : 'Screen With Budget'}
                </Button>
            </div>
        </div>
    )
}

export default AutoAssignWithBudget
