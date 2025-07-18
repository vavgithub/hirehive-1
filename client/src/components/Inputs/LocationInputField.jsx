import React, { useEffect, useRef, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { getLocationSuggestions } from '../../services/auth.candidate.service';
import { v4 as uuidv4 } from 'uuid';
import { Menu, Popover } from '@mui/material';
import { SpinnerCircular } from 'spinners-react/lib/esm/SpinnerCircular';
import StyledCard from '../Cards/StyledCard';

export const LocationInputField = React.forwardRef(({
  id,
  type = 'text',
  label = 'Location',
  required,
  extraClass,
  labelStyles,
  noPopover = false,
  placeholder,
  setLocationId,
  setSessionId,
  rowWise = false,
  error,
  errorMessage,
  onChange,
  value,
  ...props
}, ref) => {
  const [inputValue, setInputValue] = useState(value ?? '');
  const [debouncedQuery,setDebouncedQuery] = useState('');
  const [suggestions , setSuggestions] = useState([])
  const [shouldChange,setShouldChange] = useState(false);
  const sessionId = useRef(uuidv4());

  const [isDebouncing, setIsDebouncing] = useState(false);

  const getLocationSuggestionsMutation = useMutation({
    mutationFn : (text) => getLocationSuggestions(text,sessionId.current),
    onSuccess : (data) => {
      setSuggestions((data?.data && Array.isArray(data?.data)) ? data.data : [])
      setIsDebouncing(false)
    },
    onError : (error) => {
      setIsDebouncing(false)  
      console.log('Error fetching location suggestions :',error)
    }
  })


  const handleSuggestionClick = (suggestion) => {
    setShouldChange(false);
    onChange({target : {value : suggestion?.placeName}})
    setLocationId(suggestion?.placeId)
    setSessionId(sessionId.current);
    setSuggestions([])
    setInputValue(suggestion?.placeName)
    setIsDebouncing(false)
  }

  const inputRef = useRef()

  useEffect(()=>{
    if(debouncedQuery && shouldChange){
        getLocationSuggestionsMutation.mutate(debouncedQuery)
    }
  },[debouncedQuery,shouldChange])

  // Debounce logic
  useEffect(() => {
    if(inputValue){
      setIsDebouncing(true)
    }
    const handler = setTimeout(() => {
      setDebouncedQuery(inputValue); // Simulating event object
    }, 600); // 600ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue]);

  const inputClasses = `
    w-full 
    outline-none 
    focus:outline-teal-300
    ${error ? '!border !border-red-500' : 'border border-transparent'} 
    ${extraClass || ''}
  `.trim();

  return (
    <div className={'flex gap-2 relative ' + (rowWise ? "justify-between items-center" : "flex-col justify-between")}>
      {label && (
        <label htmlFor={id} className={`${labelStyles} typography-body ${rowWise ? "min-w-[25%] max-w-[25%]" : ""}`}>
          {label} {required && <span className="text-red-100">*</span>}
        </label>
      )}

      <div ref={inputRef} className='relative w-full'>
        <input
          id={id}
          type={type}
          placeholder={placeholder || `Enter ${label}`}
          className={inputClasses}
          ref={ref}
          onChange={(e) => {
            setInputValue(e.target.value);
            if(!shouldChange){
                setShouldChange(true)
            }
          }}
          value={inputValue}
          {...props}
        />
        {(isDebouncing && shouldChange) && <div className='absolute right-2 top-2'>
          <SpinnerCircular  size={26} color='white' secondaryColor='gray' />
        </div>}
        {suggestions?.length > 0 && (
          noPopover ? 
            <StyledCard
            padding={5}
            extraStyles={'absolute z-10 w-full overflow-hidden flex flex-col gap-4'}
          >
            {suggestions.map((suggestion, idx) => (
              <p
                key={idx}
                className='overflow-hidden text-ellipsis  bg-background-60 hover:bg-background-50 px-4 py-2 rounded-xl scrollbar-hide whitespace-nowrap cursor-pointer'
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.placeName}
              </p>
            ))}
          </StyledCard>
            :<Popover
            anchorEl={inputRef.current}
            open={Boolean(suggestions?.length)}
            onClose={()=>setSuggestions([])}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left'
            }}
            PaperProps={{
                style: {
                maxHeight: 300,
                width: inputRef.current?.getBoundingClientRect()?.width,
                borderRadius: "0.75rem",
                display : 'flex',
                flexDirection : 'column',
                gap : '8px',
                padding: "0.5rem",
                backgroundColor: 'var(--color-background-90)'
                }
            }}
          >
            {suggestions.map((suggestion, idx) => (
              <p
                key={idx}
                className='overflow-x-scroll bg-background-60 hover:bg-background-50 px-4 py-2 rounded-xl scrollbar-hide whitespace-nowrap cursor-pointer'
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.placeName}
              </p>
            ))}
          </Popover>
        )}
      </div>

      {error && errorMessage && (
        <span className={`text-red-500 typography-small-p absolute ${rowWise ? "top-[42px] left-[27%]" : "top-[5rem]"}`}>
          {errorMessage}
        </span>
      )}
    </div>
  );
});
