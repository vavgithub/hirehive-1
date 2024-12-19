import React from "react";
import { Button, Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

let sizes = {
    1 : {
        padding : "6px 12px",
        fontSize: "12px"
    },
    2 : {
        padding : "8px 20px",
        fontSize: "12px"
    }
}

const CustomStyledTooltip = styled(({ className, size , ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({size = 1}) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(7,7,8,1)", // Custom background color
    color: "white",                    // Custom text color
    fontSize: sizes[size].fontSize,    // Custom font size
    fontFamily: "'Outfit', sans-serif", // Apply the Outfit font
    letterSpacing: '0.5px',
    padding: sizes[size].padding,      // Add padding around the tooltip text
    borderRadius: "10px",              // Add border radius to tooltip
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgba(7,7,8,1)",            // Arrow color matching background
  },
}));

function CustomToolTip({ title, children, size, arrowed = false }) {
  return (
    <CustomStyledTooltip
      title={title}
      size={size}
      arrow={arrowed}
      PopperProps={{
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [0, -4], // Adjust the offset, [x, y], 4px is the vertical distance
            }
          }
        ]
      }}
    >
      <Button
        sx={{
          width: "100%",
          minWidth: 0,                  // Remove minimum width
          padding: 0,                   // Remove padding
          textTransform: "none",        // Prevent automatic capitalization
          "& .MuiButton-startIcon, & .MuiButton-endIcon": {
            margin: 0,                  // Remove icon margins if any
          },
        }}
      >
        {children}
      </Button>
    </CustomStyledTooltip>
  );
}

export default CustomToolTip;
