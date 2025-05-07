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
            borderRadius: "0.75rem",
            color: "white",
            "& fieldset": {
              borderColor: "rgba(24, 233, 208, 0.5)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(24, 233, 208, 0.8)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "rgba(24, 233, 208, 1)",
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
          backgroundColor: "rgba(12, 13, 13, 1)",
          boxShadow: "3px 5px 50px rgba(25, 25, 25, 0.75)",
          borderRadius: "0.75rem",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          backgroundColor: "black", // Background color of each option
          color: "white", // Text color of each option
          fontFamily: "Gilroy",
          borderRadius: "0.75rem",
          "&:hover": {
            background: "rgba(35,36,37,1) !important",
          },
          "&:hover .MuiTypography-root": {
            color: "rgba(24,233,208,1)",
          },
          ":hover span": {
            color: "rgba(24,233,208,1)",
          },
          "&.Mui-selected": {
            background: "rgba(24,233,208,0.1) !important",
          },
          "&.Mui-selected:hover": {
            background: "rgba(35,36,37,1) !important",
          },
          "&.Mui-selected span": {
            color: "rgba(24,233,208,1) !important",
          },
        },
      },
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
          backgroundColor: "rgba(12,13,13,1)",
          borderRadius: "0.75rem !important",
          "& fieldset": {
            border: "none",
          },
          "&:hover": {
            backgroundColor: "rgba(35, 36, 37, 1)",
          },
          "&.Mui-focused fieldset": {
            border: "1px solid rgb(24, 233, 208) !important",
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
          color: "rgba(128, 131, 137, 1);",
          "&.Mui-selected": {
            color: "rgb(24, 233, 208)",
            backgroundColor: "rgba(24, 233, 208, 0.2) !important",
          },
          "&.Mui-selected:hover": {
            color: "rgb(24, 233, 208)",
            backgroundColor: "rgba(24, 233, 208, 0.3) !important",
          },
          "&:hover": {
            backgroundColor: "rgba(35, 36, 37, 1)",
          },
          "&.Mui-disabled": {
            color: "rgba(128, 131, 137, 0.5) !important",
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
          color: "rgba(128, 131, 137, 1)",
        },
      },
    },
    MuiPickersCalendarHeader: {
      styleOverrides: {
        root: {
          marginTop: "0px",
          padding: "0px",
          "& .MuiPickersArrowSwitcher-button": {
            color: "rgba(128, 131, 137, 1);",
          },
        },
      
        switchViewButton: {
          color: "rgba(128, 131, 137, 1);",
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
            backgroundColor: "rgba(4, 95, 253, 1)",
          },
          "& .MuiButton-root:hover": {
            backgroundColor: "rgba(4, 95, 253, 1) !important",
          },
        },
      },
    },
    MuiMultiSectionDigitalClock: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
          color: "rgba(128, 131, 137, 1)",
          maxHeight: "11rem",
          "& .MuiList-root": {
            width: "75px",
            border: "0",
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
            backgroundColor: "rgba(24, 233, 208, 0.1) !important",
            color: "rgb(24, 233, 208) !important",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
          color: "white",
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
            backgroundColor: "rgba(12,13,13,1)",
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
              border: "1px solid rgb(24, 233, 208) !important",
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
            color: "white",
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
              border: "1px solid rgb(24, 233, 208) !important",
              borderRadius: "0.75rem !important",
            },
          },
        },
        paper: {
          backgroundColor: "black", // Background color of the list
          padding: "0.5rem !important",
        },
        inputRoot: {
          padding: "0px !important", // Override the default padding
        },
        listbox: {
          padding: "0px !important", // Apply padding override
          backgroundColor: "black", // Set the background color of the list
          "& .MuiInputBase-root": {
            padding: "0px !important", // Override default padding for the input base
          },
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
          color: "white",
          padding: "0px",
          scrollbarWidth: "none", // Hide scrollbar in Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Hide scrollbar in Chrome/Safari
        },
      },
    },

    MuiDataGrid: {
      styleOverrides: {
        root: {
          borderRadius: "0.75rem",
          backgroundColor: "black",
          "& .MuiDataGrid-columnHeaders": {
            borderTop: "none",
            borderBottom: "none",
            color: "gray",
            backgroundColor: "black !important",
          },
          "& .MuiDataGrid-columnHeader": {
            backgroundColor: "black !important",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            color: "gray",
          },
          "& .MuiDataGrid-cell": {
            color: "white",
            borderBottom: "none",
            borderTop: "none",
          },
          "& .MuiDataGrid-row": {
            borderBottom: "none",
            borderTop: "none",
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            color: "white",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: "transparent",
            borderRadius: "0.75rem 0.75rem 0px 0px !important",
          },
          "& .MuiDataGrid-overlayWrapper": {
            height: "3rem",
          },
          "& .MuiDataGrid-overlay": {
            color: "white",
            backgroundColor: "rgba(12, 13, 13, 1)",
          },
          "& .MuiDataGrid-selectedRowCount": {
            opacity: 0,
          },
          "& .Mui-selected .MuiSvgIcon-root": {
            color: "rgb(24, 233, 208)",
          },
          "& .first-row": {
            borderRadius: 2,
            backgroundColor: "rgba(18, 19, 20, 1)",
            "&:hover": {
              backgroundColor: "#232425",
            },
          },
          "& .MuiDataGrid-filler": {
            backgroundColor: "black",
          },
          "& .MuiDataGrid-scrollbar": {
            display: "none",
            background: "transparent",
          },
          "& .second-row": {
            borderRadius: 2,
            backgroundColor: "rgba(12, 13, 13, 1)",
            "&:hover": {
              backgroundColor: "#232425",
            },
          },
          "& .MuiSvgIcon-root": {
            color: "white",
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
          color: "white",
        },
        toolbar: {
          color: "white",
        },
        selectIcon: {
          color: "white",
        },
      },
    },
  },
});

export default theme;
