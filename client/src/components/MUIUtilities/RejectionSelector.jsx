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
              style: { maxHeight: 300,  width: selectedAnchor?.getBoundingClientRect()?.width , borderRadius : "0.75rem",padding : "0.5rem",backgroundColor: 'var(--color-background-70)',},
            }}
            sx={{
              "& .MuiList-root": {
                backgroundColor: 'var(--color-background-70) !important',
                color: "white",
                padding : "0px "
              },
              "& .MuiMenu-paper": {
                maxHeight: "18.75rem",
                overflow: "hidden", // Hide outer scrollbar
              },
              "& .MuiMenu-list": {
                maxHeight: "18.75rem",
                overflowY: "auto", // Keep scrolling enabled
                scrollbarWidth: "none", // Hide scrollbar in Firefox
                msOverflowStyle: "none", // Hide scrollbar in IE/Edge
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar in Chrome/Safari
                },
              },
              "& .MuiMenu-paper": {
                maxHeight: "18.75rem",
                overflow: "hidden", // Hide outer scrollbar
              },
              "& .MuiMenu-list": {
                maxHeight: "18.75rem",
                overflowY: "auto", // Keep scrolling enabled
                scrollbarWidth: "none", // Hide scrollbar in Firefox
                msOverflowStyle: "none", // Hide scrollbar in IE/Edge
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar in Chrome/Safari
                },
              },
            }}
          >
            
            {REJECTION_REASONS.length > 0 ? (
              REJECTION_REASONS.map((reason) => (
                <MenuItem
                  sx={{
                    margin : "0.5rem 0px !important",
                    padding :"0.5rem 1rem",
                    backgroundColor: 'var(--color-background-70)',
                    ':hover' :{
                      background :"rgba(35,36,37,1)"
                    },
                    ':hover .MuiTypography-root' :{
                      color :"white"
                    },
                  }}
                  key={reason?.label}
                  onClick={()=>handleReasonSelect(reason?.value)}
                >
                  <ListItemText
                  primaryTypographyProps={{
                    component : 'span'
                  }}
                  sx={{
                    "& .MuiTypography-root": {
                      whiteSpace : "nowrap",
                      textOverflow : "ellipsis",
                      overflow : "hidden"
                    },
                  }}
                  primary={reason?.label} />
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
