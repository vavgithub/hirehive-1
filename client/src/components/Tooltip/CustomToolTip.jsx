import React from "react";
import { Button, Tooltip, tooltipClasses } from "@mui/material";
import { styled } from "@mui/material/styles";

let sizes = {
    1: {
        padding: "0.375rem 0.75rem",
        fontSize: "0.75rem",
    },
    2: {
        padding: "0.5rem 1.25rem",
        fontSize: "0.75rem",
    },
};

const CustomStyledTooltip = styled(({ className, size, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ size = 1 }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "rgba(7,7,8,1)", // Custom background color
    color: "white", // Custom text color
    fontSize: sizes[size].fontSize, // Custom font size
    letterSpacing: "0.5px",
    padding: sizes[size].padding, // Add padding around the tooltip text
    borderRadius: "0.625rem", // Add border radius to tooltip
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "rgba(7,7,8,1)", // Arrow color matching background
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
            },
          },
        ],
      }}
    >
      <div
        style={{
          display: "flex", // Mimic button's inline-flex display
          justifyContent : "center",
          alignItems : "center",
          width: "100%",
          minWidth: 0, // Remove minimum width
          padding: 0, // Remove padding
          textTransform: "none", // Prevent automatic capitalization
          cursor: "pointer", // Add pointer cursor for better UX
        }}
      >
        {children}
      </div>
    </CustomStyledTooltip>
  );
}

export default CustomToolTip;
