import { ListItemText, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { REJECTION_REASONS } from '../Modals/Modal';

function RejectionSelector({selectedAnchor,handleClose,handleReasonSelect}) {
    return (
        <>
          <Menu
            anchorEl={selectedAnchor}
            open={Boolean(selectedAnchor)}
            onClose={handleClose}
            PaperProps={{
              style: { maxHeight: 300,  width: selectedAnchor?.width , borderRadius : "12px",padding : "8px"},
            }}
            sx={{
              "& .MuiList-root": {
                backgroundColor: 'rgba(12, 13, 13, 1)',
              },
            }}
          >
            
            {REJECTION_REASONS.length > 0 ? (
              REJECTION_REASONS.map((reason) => (
                <MenuItem
                  sx={{
                    margin : "8px 0px !important",
                    padding :"8px 16px",
                    backgroundColor: 'rgba(12, 13, 13, 1)',
                    ':hover' :{
                      background :"rgba(35,36,37,1)"
                    },
                    ':hover .MuiTypography-root' :{
                      color :"white"
                    },
                  }}
                  key={reason}
                  onClick={()=>handleReasonSelect(reason)}
                >
                  <ListItemText
                  primaryTypographyProps={{
                    component : 'span'
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
