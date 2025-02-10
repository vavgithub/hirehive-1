import { Menu, MenuItem } from '@mui/material'
import React from 'react'
import EditIcon from '../../svg/KebabList/EditIcon'
import DeleteIcon from '../../svg/KebabList/DeleteIcon'

function BudgetMenu({budgetMenuAnchorEl , handleBudgetMenuClose , handleBudgetEdit , handleBudgetClear}) {
  return (
    <Menu
        anchorEl={budgetMenuAnchorEl}
        open={Boolean(budgetMenuAnchorEl)}
        onClose={handleBudgetMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        sx={{
          "& .MuiList-root": {
            backgroundColor: 'rgba(12, 13, 13, 1)',
            color: "white",
            font: "Outfit"
          },
          "& .MuiPaper-root": {
            marginTop: '8px',
            marginLeft: '-60px', // Adjust this value to move the menu more to the left
          }
        }}
      >
        <div className='flex items-center justify-start px-4 typograhy-body '>
          <EditIcon />
          <MenuItem
          sx={{
            fontFamily :"Outfit",
          }}
          onClick={handleBudgetEdit}>Edit</MenuItem>

        </div>
        <div className='flex items-center justify-start px-4 typograhy-body '>
          <DeleteIcon />
          <MenuItem 
          sx={{
            fontFamily :"Outfit",
          }}
          onClick={handleBudgetClear}>Clear</MenuItem>
        </div>
      </Menu>
  )
}

export default BudgetMenu
