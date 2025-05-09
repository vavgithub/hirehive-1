import React from "react";
import IconWrapper from "../Cards/IconWrapper";
import { ChevronRight, Info } from "lucide-react";

function CustomPill({
  variant,
  name,
  value,
  hasInfoButton = false,
  infoButtonClick,
  error,
  selected,
  pointer = true,
  children,
  extraStyles,
  paddingX,
  paddingY,
  data,
  onChange,
  backgroundColor,
  hoverColor,
  noHover,
  borderRadius,
  ...props
}) {
  let valueSteps = {
    0: "0",
    1: "2",
    2: "4",
    3: "6",
    4: "8",
  };

  let borderSteps = {
    0: "[0px]",
    1: "[4px]",
    2: "[8px]",
    3: "[12px]",
    4: "[16px]",
    5: "[20px]",
    6: "[24px]",
    7: "[28px]",
    8: "[32px]",
    9: "[36px]",
    10: "full",
  };

  const styles = `inline-block flex items-center gap-4 h-[2.75rem]  ${
    pointer ? "cursor-pointer" : "cursor-default"
  }  
    ${paddingY?.toString() ? `py-${valueSteps[paddingY]}` : "py-2"}  
    ${paddingX?.toString() ? `px-${valueSteps[paddingX]}` : "px-6"} 
    ${
      !selected ? (backgroundColor ? backgroundColor : "bg-background-40") : ""
    } 
    ' border ' 
    ${
      selected
        ? " selection-primary border-transparent"
        : error
        ? "border-red-100"
        : "border-transparent "
    } 
    ${
      noHover
        ? ""
        : hoverColor && typeof hoverColor === "string" && !selected
        ? `hover:${hoverColor}`
        : "hover:bg-background-60"
    } 
    ${
      borderRadius?.toString()
        ? `rounded-${borderSteps[borderRadius]}`
        : "rounded-xl"
    } 
    `;
  console.log(data, value);
  if (variant === "selective") {
    return (
      <label {...props} className={styles + "  " + extraStyles} htmlFor={name}>
        <input
          type="radio"
          name={name}
          value={data?._id}
          checked={data?._id === value}
          onChange={onChange}
          className=" custom-radio "
        />
        {data?.title}
        {hasInfoButton && (
          <span>
            <IconWrapper
              inheritColor
              size={0}
              onClick={(e) => {
                e.stopPropagation();
                infoButtonClick(data?.title);
              }}
              hasBg
              customIconSize={5}
              customStrokeWidth={4}
              customBgHover={" bg-background-60 "}
              icon={Info}
            />
          </span>
        )}
      </label>
    );
  }
  return (
    <p {...props} className={styles + "  " + extraStyles}>
      {data?.title}
      {hasInfoButton && (
        <span>
          <IconWrapper
            inheritColor
            size={0}
            onClick={(e) => {
              e.stopPropagation();
              infoButtonClick(data?.title);
            }}
            hasBg
            customIconSize={5}
            customStrokeWidth={4}
            customBgHover={" bg-background-60 "}
            icon={Info}
          />
        </span>
      )}
    </p>
  );
}

export default CustomPill;
