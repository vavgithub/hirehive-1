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
          horizontal: 'right',
        }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
        sx={{
          "& .MuiList-root": {
            backgroundColor: 'rgba(12, 13, 13, 1)',
            color: "white",
            font: "Outfit",
            padding : "8px",
            display : "flex",
            flexDirection : "column",
            gap:"8px",
          },
          "& .MuiPaper-root": {
            marginTop: '8px',
            marginLeft: '-60px', // Adjust this value to move the menu more to the left
          }
        }}
      >
        <div className='flex items-center justify-start typograhy-body'>
          <MenuItem
          sx={{
            fontFamily :"Outfit",
            width : "100%",
            display : "flex",
            gap: "4px"
          }}
          onClick={handleBudgetEdit}>
          <EditIcon />
            Edit</MenuItem>

        </div>
        <div className='flex items-center justify-start typograhy-body '>
          <MenuItem 
          sx={{
            fontFamily :"Outfit",
            width : "100%",
            display : "flex",
            gap: "4px"
          }}
          onClick={handleBudgetClear}>
          <DeleteIcon />
            Clear</MenuItem>
        </div>
      </Menu>
  )
}

export default BudgetMenu
