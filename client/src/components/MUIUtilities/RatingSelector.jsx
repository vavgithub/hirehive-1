import { Menu, MenuItem } from '@mui/material';
import React from 'react'
import IconWrapper from '../Cards/IconWrapper';
import { Star } from 'lucide-react';

export const getRatingIcon = (rating) => {
    switch (rating) {
        case 'Good Fit':
        return <div className='text-[#12D382]'><IconWrapper inheritColor icon={Star} size={0} customIconSize={5} /></div>;
        case 'Not A Good Fit':
        return <div className='text-[#FF385C]'><IconWrapper inheritColor icon={Star} size={0} customIconSize={5} /></div>;
        case 'May Be':
        return <div className='text-[#EDBD14]'><IconWrapper inheritColor icon={Star} size={0} customIconSize={5} /></div>;
        default:
        return <IconWrapper inheritColor icon={Star} size={0} isInActiveIcon customIconSize={5} />;
    }
};

function RatingSelector({anchorEl,setAnchorEl,onSelectRating}) {
  return (
    <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={()=>setAnchorEl(null)}
        sx={{
            "& .MuiList-root": {
            backgroundColor: 'rgba(12, 13, 13, 1)',
            color: "white",
            display :"flex",
            flexDirection : "column",
            gap: "4px",
            padding : "0px !important"
        },
        }}
        slotProps={{
            paper: {
              sx: {
                boxShadow: '0px 4px 20px rgba(35, 35, 35, 0.8)', // Red drop shadow
                borderRadius: '12px', // Optional: Customize the border radius
                minWidth : "210px",
                padding : "8px !important",
                backgroundColor: 'rgba(12, 13, 13, 1)',

              },
            },
          }}
        >
        {['Good Fit', 'Not A Good Fit', 'May Be'].map((rating) => (
            <MenuItem sx={{
                height : "44px",
                backgroundColor: 'rgba(12, 13, 13, 1)',
                borderRadius: '12px', // Optional: Customize the border radius
                // ':hover' :{
                //     background :"rgba(35,36,37,1)"
                //   },
            }} key={rating} onClick={() => onSelectRating(rating)}

            >
            <div className="flex items-center gap-5">
                {getRatingIcon(rating)}
                <span className='typography-body'>{rating}</span>
            </div>
            </MenuItem>
        ))}
    </Menu>
  )
}

export default RatingSelector
