import { ListItemText, Menu, MenuItem } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'

function GlobalDropDown({onChange,options, label ,error,errorMessage, value, extraStylesForLabel , required}) {
    const dropdownRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);

    return (
        <div ref={dropdownRef} className='w-full relative'>
            {label && 
            <label className={"typography-body " + extraStylesForLabel }>{label}{required && <span className="text-red-100 ml-1">*</span>}</label>}
            <button
                type="button"
                onClick={(e)=> setAnchorEl(anchorEl ? null : dropdownRef.current)}
                className={`${value ? "text-white" : "text-font-gray"} ${error ? '!border !border-red-500' : 'border border-transparent'}  typography-body mt-3 h-[44px] flex items-center justify-between bg-background-40 hover:bg-background-60 w-full outline-none rounded-xl shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4`}
                >
                {options.find(opt => opt.value === value)?.label || options.find(opt => opt === value) || '-Select-'}
                <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 0.5L9 8.5L17 0.5" stroke="#585B5F" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                </button>
                {error && errorMessage && (
                    <span className={"text-red-500 typography-small-p  absolute top-[5rem]"}>{errorMessage}</span>
                )}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={()=>setAnchorEl(null)}
                PaperProps={{
                style: { maxHeight: 300,  width: anchorEl?.getBoundingClientRect()?.width , borderRadius : "12px",padding : "8px",backgroundColor: 'rgba(12, 13, 13, 1)'},
                }}
                sx={{
                "& .MuiList-root": {
                    backgroundColor: 'rgba(12, 13, 13, 1)',
                    color: "white",
                    font: "Outfit",
                    padding : "0px ",
                    display : "flex",
                    flexDirection : "column",
                    gap : "8px"
                },
                }}
            >
                
                {options?.length > 0 ? (
                options?.map((optionObj) => (
                    <MenuItem
                    sx={{
                        margin : "0px !important",
                        padding :"8px 16px",
                        borderRadius : "12px",
                        backgroundColor: 'rgba(12, 13, 13, 1)',
                    }}
                    key={optionObj?.value}
                    onClick={()=>{onChange(optionObj?.value); setAnchorEl(null)}}
                    >
                    <ListItemText
                    primaryTypographyProps={{
                        component : 'span'
                    }}
                    primary={optionObj?.label} />
                    </MenuItem>
                ))
                ) : (
                <MenuItem>No options found</MenuItem>
                )}
            </Menu>
        </div>
      );
}

export default GlobalDropDown
