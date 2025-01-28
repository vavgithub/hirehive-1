import { Menu, MenuItem } from '@mui/material';
import React from 'react'
import { GoodFit, MayBe, NotAGoodFit, Rating } from '../../svg/Buttons/Rating';

const getRatingIcon = (rating) => {
    switch (rating) {
        case 'Good Fit':
        return <GoodFit />;
        case 'Not A Good Fit':
        return <NotAGoodFit />;
        case 'May Be':
        return <MayBe />;
        default:
        return <Rating />;
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
                borderRadius: '12px', // Optional: Customize the border radius
                ':hover' :{
                    background :"rgba(35,36,37,1)"
                  },
                  ':hover span' :{
                    color :"rgba(24,233,208,1)"
                  },
            }} key={rating} onClick={() => onSelectRating(rating)}

            >
            <div className="flex items-center gap-5">
                {getRatingIcon(rating)}
                <span className='font-outfit'>{rating}</span>
            </div>
            </MenuItem>
        ))}
    </Menu>
  )
}

export default RatingSelector
