import { ListItemText, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { REJECTION_REASONS } from '../Modal';

function RejectionSelector({selectedAnchor,handleClose,handleReasonSelect}) {
    return (
        <>
          <Menu
            anchorEl={selectedAnchor}
            open={Boolean(selectedAnchor)}
            onClose={handleClose}
            PaperProps={{
              style: { maxHeight: 300,  width: selectedAnchor?.width , borderRadius : "12px",padding : "8px",backgroundColor: 'rgba(12, 13, 13, 1)'},
            }}
            sx={{
              "& .MuiList-root": {
                backgroundColor: 'rgba(12, 13, 13, 1)',
                color: "white",
                font: "Outfit",
                padding : "0px "
              },
            }}
          >
            
            {REJECTION_REASONS.length > 0 ? (
              REJECTION_REASONS.map((reason) => (
                <MenuItem
                  sx={{
                    margin : "8px 0px !important",
                    padding :"8px 16px",
                    borderRadius : "12px",
                    ':hover' :{
                      background :"rgba(35,36,37,1)"
                    },
                    // ':hover .MuiTypography-root' :{
                    //   color :"rgba(24,233,208,1)"
                    // },
                    '&.Mui-selected': {
                      background: "rgba(24,233,208,0.1) !important", // Red background for selected item
                    },
                    '&.Mui-selected:hover' : {
                      background :"rgba(35,36,37,1) !important"
                    },
                    '&.Mui-selected span': {
                      color: "rgba(24,233,208,1) !important", // Slightly darker red on hover
                    },
                  }}
                  key={reason}
                  onClick={()=>handleReasonSelect(reason)}
                >
                  <ListItemText
                  primaryTypographyProps={{
                    component : 'span'
                  }}
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "Outfit", // Apply the custom font explicitly to the Typography
                    },
                  }}
                  primary={reason} />
                </MenuItem>
              ))
            ) : (
              <MenuItem>No reasons found</MenuItem>
            )}
          </Menu>
        </>
      );
}

export default RejectionSelector
