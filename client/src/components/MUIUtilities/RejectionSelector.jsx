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
              style: { maxHeight: 300,  width: selectedAnchor?.getBoundingClientRect()?.width , borderRadius : "12px",padding : "8px",backgroundColor: 'rgba(12, 13, 13, 1)'},
            }}
            sx={{
              "& .MuiList-root": {
                backgroundColor: 'rgba(12, 13, 13, 1)',
                color: "white",
                font: "Outfit",
                padding : "0px "
              },
              "& .MuiMenu-paper": {
                maxHeight: "300px",
                overflow: "hidden", // Hide outer scrollbar
              },
              "& .MuiMenu-list": {
                maxHeight: "300px",
                overflowY: "auto", // Keep scrolling enabled
                scrollbarWidth: "none", // Hide scrollbar in Firefox
                msOverflowStyle: "none", // Hide scrollbar in IE/Edge
                "&::-webkit-scrollbar": {
                  display: "none", // Hide scrollbar in Chrome/Safari
                },
              },
              "& .MuiMenu-paper": {
                maxHeight: "300px",
                overflow: "hidden", // Hide outer scrollbar
              },
              "& .MuiMenu-list": {
                maxHeight: "300px",
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
                  sx={{
                    "& .MuiTypography-root": {
                      fontFamily: "Outfit", // Apply the custom font explicitly to the Typography
                      whiteSpace : "nowrap",
                      textOverflow : "ellipsis",
                      overflow : "hidden"
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
