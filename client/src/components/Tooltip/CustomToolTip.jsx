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
    backgroundColor: "var(--color-background-100)",
    color: "var(--color-font-main)",
    fontSize: sizes[size].fontSize,
    letterSpacing: "0.5px",
    padding: sizes[size].padding,
    borderRadius: "0.625rem",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.12)",
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: "var(--color-background-100)",
  },
}));

function CustomToolTip({ title, disabled, children, size, arrowed = false }) {
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
          ...(disabled ? { cursor:"default" }  : { cursor:"pointer" }), // Add pointer cursor for better UX
        }}
      >
        {children}
      </div>
    </CustomStyledTooltip>
  );
}

export default CustomToolTip;
