import {
    ListItemText,
    MenuItem,
    Popover,
    TextField
  } from '@mui/material';
  import React, { useEffect, useRef, useState } from 'react';
  
  function GlobalDropDown({
    onChange,
    options,
    label,
    error,
    errorMessage,
    defaultValue = '',
    value,
    customPlaceholder,
    extraStylesForLabel,
    required,
    searchEnabled = false
  }) {
    const dropdownRef = useRef(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleOpen = () => {
      setAnchorEl(dropdownRef.current);
      if (searchEnabled) setSearchTerm('');
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=>{
        if(defaultValue){
            onChange(options?.find(option => option?.value?.toLowerCase() === defaultValue?.toLowerCase())?.value)
        }
    },[defaultValue])
  
    const filteredOptions = searchEnabled
      ? options.filter(opt =>
          opt.label?.toLowerCase().includes(searchTerm.toLowerCase())
        )
      : options;
  
    return (
      <div ref={dropdownRef} className="w-full relative">
        {label && (
          <label className={"typography-body " + extraStylesForLabel}>
            {label}
            {required && <span className="text-red-100 ml-1">*</span>}
          </label>
        )}
        <button
          type="button"
          onClick={handleOpen}
          className={`${value ? "text-white" : "text-font-gray"} ${error ? '!border !border-red-500' : 'border border-transparent'}  typography-body ${label ? " mt-3 " : " mt-0 "} h-[2.75rem] flex items-center justify-between bg-background-80 hover:bg-background-60 w-full outline-none rounded-xl shadow-sm focus:ring-teal-300 focus:border-teal-300 text-left px-4`}
        >
          {options.find(opt => opt.value === value)?.label || options.find(opt => opt === value) || customPlaceholder ||  '-Select-'}
          <svg width="18" height="9" viewBox="0 0 18 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 0.5L9 8.5L17 0.5" stroke="#585B5F" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {error && errorMessage && (
          <span className="text-red-500 typography-small-p absolute top-[5rem]">
            {errorMessage}
          </span>
        )}
  
        <Popover
          disableScrollLock
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          PaperProps={{
            style: {
              maxHeight: 300,
              width: anchorEl?.getBoundingClientRect()?.width,
              borderRadius: "0.75rem",
              padding: "0.5rem",
              backgroundColor: 'var(--color-background-90)'
            }
          }}
        >
          <div className="flex flex-col gap-2 px-1 py-2 w-full text-white">
            {searchEnabled && (
              <div style={{ padding: '4px 0.5rem' }}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                  autoFocus
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '0.5rem',
                      backgroundColor: 'rgba(255,255,255,0.1)',
                      color: 'white',
                    },
                    '& input': {
                      color: 'white',
                      fontSize: '14px',
                    },
                  }}
                  InputProps={{
                    style: { height: '36px' },
                  }}
                />
              </div>
            )}
  
            {filteredOptions.length > 0 ? (
              filteredOptions.map((optionObj) => (
                <MenuItem
                  sx={{
                    margin: "0px !important",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.75rem",
                    backgroundColor: 'var(--color-background-90)',
                  }}
                  key={optionObj?.value}
                  onClick={() => {
                    onChange(optionObj?.value);
                    handleClose();
                  }}
                >
                  <ListItemText
                    primaryTypographyProps={{ component: 'span' }}
                    primary={optionObj?.label}
                  />
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>No options found</MenuItem>
            )}
          </div>
        </Popover>
      </div>
    );
  }
  
  export default GlobalDropDown;
  