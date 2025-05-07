import { Menu, MenuItem } from "@mui/material";
import React from "react";

function StyledMenu({handleMenuClose,anchorEl,itemComponents}) {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      sx={{
        top : "-2.75rem",
        left : "1.875rem",
        borderRadius : "0.75rem",
        "& .MuiList-root": {
          backgroundColor: "rgba(12, 13, 13, 1)",
          borderColor: "rgba(12, 13, 13, 1)",
          color: "white",
          width : "12.5rem",
          padding : "0.5rem",
        },
      }}
    >
        {
            itemComponents.map((item,i)=>{
                return (      
                <MenuItem key={i} sx={{
                    height : "2.75rem",
                    padding : "0px",
                    backgroundColor: "rgba(12, 13, 13, 1)",
                }} onClick={item.onClick}>
                    {item.content()}
                </MenuItem>)
            })
        }
    </Menu>
  );
}

export default StyledMenu;
