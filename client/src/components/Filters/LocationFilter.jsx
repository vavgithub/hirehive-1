import React from 'react'
import StyledCard from '../Cards/StyledCard'
import { LocationInputField } from '../Inputs/LocationInputField'
import { useState } from 'react'
import { Button } from '../Buttons/Button';

function LocationFilter({ handleLocation , closeDropDown}) {
    const [location,setLocation] = useState('');
    const [locationId,setLocationId] = useState('');
    const [sessionId,setSessionId] = useState('');

    const filterByLocation = () => {
        handleLocation([{
            location ,
            locationId,
            sessionId
        }])
        closeDropDown()
    }

  return (
    <StyledCard padding={3} backgroundColor={'bg-background-80'} extraStyles={'absolute left-[18.5rem] min-w-[18rem] flex flex-col'}>
        <LocationInputField
            type="text"
            id="location"
            label="Location"
            extraClass={'custom-input'}
            noPopover
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            setLocationId={(id) => setLocationId(id)}
            setSessionId={(id) => setSessionId(id)}
        />
        <Button disabled={!location} type='button' className="mt-4 place-self-end" onClick={filterByLocation} >Apply</Button>
    </StyledCard>
  )
}

export default LocationFilter
