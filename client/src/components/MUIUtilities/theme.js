import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#18e9d0", // Example primary color
    },
    background: {
      default: "#0c0d0d", // Background color
      paper: "#1b1c1d", // Paper color
    },
    text: {
      primary: "#ffffff", // Default text color
    },
  },
  typography: {
    fontFamily: "Gilroy, sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "Gilroy, sans-serif",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          height: "2.75rem",
          borderRadius: "0.75rem",
          textTransform: "none",
          padding: "0.5rem 1rem",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "var(--color-background-70) !important",
            borderRadius: "0.75rem",
            color: "var(--color-font-main)",
            "& fieldset": {
              borderColor: "var(--color-font-accent-200)",
            },
            "&:hover fieldset": {
              borderColor: "var(--color-font-accent-300)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "var(--color-font-accent-100) !important",
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          overflow: "auto",
        },
        paper: {
          backgroundColor: "var(--color-background-80) !important",
          // boxShadow: "3px 5px 50px rgba(25, 25, 25, 0.75)",
          borderRadius: "0.75rem",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--color-background-80) !important", // Background color of each option
          color: "var(--color-font-main)", // Text color of each option
          fontFamily: "Gilroy",
          borderRadius: "0.75rem",
          "&:hover": {
            background: "var(--color-background-60) !important",
          },
          "&:hover .MuiTypography-root": {
            color: "var(--color-font-accent-100)",
          },
          ":hover span": {
            color: "var(--color-font-accent-100)",
          },
          "&.Mui-selected": {
            background: "var(--color-accent-300) !important",
            color: "var(--color-font-accent-100) !important",
          },
          "&.Mui-selected:hover": {
            background: "var(--color-background-60) !important",
          },
          "&.Mui-selected span": {
            color: "var(--color-font-accent-100) !important",
          },
        },
      },
    },
    MuiIconButton : {
      styleOverrides : {
        root : {
          "&:hover": {
            background: "transparent !important",
          },
        }
      }
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          width: 32,
          height: 32,
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          fontFamily: "Gilroy, sans-serif",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          height: "2.75rem",
          backgroundColor: "var(--color-background-100)",
          borderRadius: "0.75rem !important",
          "& fieldset": {
            border: "none",
          },
          "&:hover": {
            backgroundColor: "var(--color-background-60)",
          },
          "&.Mui-focused fieldset": {
            border: "1px solid -var(-color-accent-100) !important",
          },
        },
        input: {
          padding: "0px 0.625rem",
          backgroundColor: "transparent !important",
        },
      },
    },
    MuiPickersDay: {
      styleOverrides: {
        root: {
          color: "var(--color-font-gray-90)",
          "&.Mui-selected": {
            color: "var(--color-accent-100) !important",
            backgroundColor: "var(--color-accent-300) !important",
          },
          "&.Mui-selected:hover": {
            color: "var(--color-accent-100)",
            backgroundColor: "var(--color-background-60) !important",
          },
          "&:hover": {
            backgroundColor: "var(--color-background-60)",
          },
          "&.Mui-disabled": {
            color: "var(--color-font-gray-80) !important",
          },
        },
      },
    },
    MuiDayCalendar: {
      styleOverrides: {
        weekContainer: {
          justifyContent: "space-between",
        },
        header: {
          justifyContent: "space-between",
        },
        weekDayLabel: {
          color: "var(--color-font-gray-90)",
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          marginTop: "0px",
          padding: "0px",
          "& .MuiPickersArrowSwitcher-button": {
            color: "var(--color-font-gray-90);",
          },
        },

        switchViewButton: {
          color: "var(--color-font-gray-90);",
        },
      },
    },
    MuiPickersLayout: {
      styleOverrides: {
        root: {
          maxHeight: "21rem",
          overflowY: "hidden",
          boxSizing: "border-box",
          scrollbarWidth: "none", // For Firefox
          "-ms-overflow-style": "none", // For IE and Edge
          "&::-webkit-scrollbar": {
            display: "none", // For Chrome, Safari, and Edge
          },
          padding: "1rem",
          '& .MuiYearCalendar-root' : {
            color: "var(--color-font-gray-90)",
            '& .MuiPickersYear-root .Mui-selected' : {
              color : "var(--color-font-accent-100)",
              backgroundColor : "var(--color-accent-300)",
            },
            '& .MuiPickersYear-root button': {
              '&:hover': {
                backgroundColor: 'var(--color-background-60)',
              }
            },
            '&::-webkit-scrollbar': {
              backgroundColor: 'var(--color-font-gray-80) !important',
              borderRadius: '10px !important', // 👈 Add this
              width: '8px !important',
              height: '8px !important',
            },
          }
        },
        
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          "& .MuiButton-root": {
            color: "#ffffff",
            width: "100%",
            backgroundColor: "var(--color-primary-100)",
          },
          "& .MuiButton-root:hover": {
            backgroundColor: "var(--color-primary-100) !important",
          },
        },
      },
    },
    MuiMultiSectionDigitalClock: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
          color: "var(--color-font-gray-90) !important",
          borderBottom:"0px !important",
          maxHeight: "11rem",
          "& .MuiList-root": {
            width: "75px",
            border: "0",
            gap: "0px !important",
            scrollbarWidth: "none", // For Firefox
            "-ms-overflow-style": "none", // For IE and Edge
            "&::-webkit-scrollbar": {
              display: "none", // For Chrome, Safari, and Edge
            },
          },
          "& .MuiButtonBase-root": {
            marginLeft: "0",
            marginRight: "0",
            padding: "1rem 1.5rem",
            width: "100%",
            borderRadius: "0px",
          },
          "& .Mui-selected": {
            backgroundColor: "var(--color-accent-300) !important",
            color: "var(--color-accent-100) !important",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--color-background-80) !important",
          color: "var(--color-font-main)",
          borderRadius: "1.25rem",
          overflowY: "auto", // Ensures scrolling
          scrollbarWidth: "none !important", // Hide scrollbar for Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Chrome/Safari
        },
      },
    },
    MuiDesktopDatePicker: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-root": {
            height: "2.75rem",
            backgroundColor: "var(--color-background-100)",
          },
          "& .MuiOutlinedInput-input": {
            padding: "0px 0.625rem",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
          },
          "& .Mui-focused": {
            "& fieldset": {
              border: "1px solid -var(-color-accent-100) !important",
              borderRadius: "0.75rem !important",
            },
          },
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          "& .MuiInputBase-input": {
            height: "2.75rem",
            maxHeight: "2.75rem !important",
            color: "var(--color-font-main)",
            boxSizing: "border-box",
          },
          "& .MuiOutlinedInput-root": {
            padding: "0px !important",
            "& fieldset": {
              border: "none",
            },
            "& .MuiAutocomplete-input": {
              padding: "0.5rem 1rem !important",
            },
          },
          "& .Mui-focused": {
            "& fieldset": {
              border: "1px solid -var(-color-accent-100) !important",
              borderRadius: "0.75rem !important",
            },
          },
        },
        paper: {
          backgroundColor: "var(--color-background-80) !important", // Background color of the list
          padding: "0.5rem !important",
        },
        inputRoot: {
          padding: "0px !important", // Override the default padding
        },
        listbox: {
          padding: "0px !important", // Apply padding override
          backgroundColor: "var(--color-background-80) !important", // Set the background color of the list
          "& .MuiInputBase-root": {
            padding: "0px !important", // Override default padding for the input base
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--color-background-80) !important",
          color: "var(--color-font-main)",
          padding: "0.5rem",
          display :"flex",
          flexDirection : "column",
          gap: "0.5rem",
          scrollbarWidth: "none", // Hide scrollbar in Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Chrome/Safari
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: "0.75rem",
          "& .MuiDataGrid-columnHeaders": {
            borderTop: "none",
            borderBottom: "none",
            color: "var(--color-font-gray-90)",
            backgroundColor: "var(--color-background-70) !important",
          },
          '& .MuiDataGrid-columnHeaders div' : {
            backgroundColor: "var(--color-background-70) !important",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "var(--color-background-70) !important",
          },
          "& .MuiDataGrid-scrollbarFiller--header" :{
              background: "var(--color-background-70) !important",
          },
          "& .MuiDataGrid-scrollbarFiller--borderTop" : {
            display : "none"
          },
          "& .MuiDataGrid-scrollbar--horizontal" :{
              '&::-webkit-scrollbar': {
                height: '8px !important', // Increase this value to make the scrollbar thicker
              },
            display : "block !important",
            // Scrollbar track (scrollable background area)
            '&::-webkit-scrollbar-track': {
              backgroundColor: 'var(--color-background-50) !important', // Your desired track color
            },
            // Thumb (draggable part of scrollbar)
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: 'var(--color-background-60) !important', // Customize this
            },
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "var(--color-font-gray-90)",
          },
          "&  .MuiDataGrid-footerContainer": {
            backgroundColor: "var(--color-background-40) !important",
            borderBottomLeftRadius: "0.75rem",
            borderBottomRightRadius: "0.75rem",
          },
          "& .MuiDataGrid-cell": {
            color: "var(--color-font-main)",
            borderBottom: "none",
            borderTop: "none",
          },
          "& .MuiDataGrid-row": {
            borderBottom: "none",
            borderTop: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            color: "var(--color-font-main)",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "var(--color-background-60)",
            borderRadius: "0.75rem 0.75rem 0px 0px !important",
          },
          "& .MuiDataGrid-overlayWrapper": {
            height: "4rem",
          },
          "& .MuiDataGrid-overlay": {
            color: "var(--color-font-main)",
            backgroundColor: "var(--color-background-60)",
          },
          "& .MuiDataGrid-selectedRowCount": {
            opacity: 0,
          },
          "& .Mui-selected .MuiSvgIcon-root": {
            color: "var(--color-accent-100)",
          },
          "& .MuiDataGrid-row.Mui-selected": {
            color: "var(--color-accent-100) !important",
            backgroundColor: "var(--color-accent-300) !important",
          },
          "& .first-row": {
            borderRadius: 2,
            backgroundColor: "var(--color-background-50)",
            "&:hover": {
              backgroundColor: "var(--color-background-60)",
            },
          },
          "& .MuiDataGrid-filler": {
            backgroundColor: "var(--color-background-70) !important",
          },
          "& .MuiDataGrid-scrollbar": {
            display: "none",
            height : "8px"
          },
          "& .second-row": {
            borderRadius: 2,
            backgroundColor: "var(--color-background-40)",
            "&:hover": {
              backgroundColor: "var(--color-background-60)",
            },
          },
          "& .MuiSvgIcon-root": {
            color: "var(--color-font-main)",
          },
          "& .MuiDataGrid-columnSeparator": {
            display: "none !important", // Hide column resizing separator
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          color: "var(--color-font-main)",
        },
        toolbar: {
          color: "var(--color-font-main)",
        },
        selectIcon: {
          color: "var(--color-font-main)",
        },
        select: {
          color: "var(--color-font-main)",
          borderRadius: "0.75rem",
          "&:hover": {
            backgroundColor: "var(--color-background-60) !important",
          },
        },
        actions : {
      "& button:not(.Mui-disabled)": {
        cursor: "pointer !important",
      },

      "& button.Mui-disabled .MuiSvgIcon-root": {
        color: "var(--color-font-gray-90) !important",
      },
        }
      },
    },
  },
});

export default theme;
