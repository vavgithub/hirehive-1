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
        top : "-44px",
        left : "30px",
        borderRadius : "12px",
        "& .MuiList-root": {
          backgroundColor: "rgba(12, 13, 13, 1)",
          borderColor: "rgba(12, 13, 13, 1)",
          color: "white",
          width : "200px",
          padding : "8px",
        },
      }}
    >
        {
            itemComponents.map((item,i)=>{
                return (      
                <MenuItem key={i} sx={{
                    height : "44px",
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
