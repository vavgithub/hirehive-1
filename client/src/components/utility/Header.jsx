import React, { useEffect, useRef, useState } from 'react'
import ThreeDotsIcon from '../../svg/ThreeDotsIcon'
import { useNavigate } from 'react-router-dom'
import EditIcon from '../../svg/EditIcon'
import DeleteIcon from '../../svg/DeleteIcon'


const BackButton = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M22 12L2 12M2 12L12 22M2 12L12 2" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

const Kebab = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

const Header = ({ HeaderText , id , withKebab }) => {
    const [isOpen , setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const toggleMenu = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const navigate = useNavigate()
    return (
        <div className='flex items-center justify-between 'ref={menuRef}>
            <div className='flex items-center gap-4'>
                <div onClick={() => (navigate(-1))}>
                    <BackButton />
                </div>
                <h1 className='typography-h1'>
                    {HeaderText}
                </h1>
            </div>
            <div onClick={(e)=>toggleMenu(e)} className="absolute right-3" >
                {
                    withKebab == "true" && <Kebab /> 
                }
            
            </div>
            {
                isOpen && (
                    <div className="relative w-48 top-12 bg-background-70 shadow-lg rounded-md z-10">
                    <ul className='p-2 '>
                        <li className='cursor-pointer flex gap-2' onClick={(e) => {e.stopPropagation() , navigate(`/admin/jobs/edit-candidate/${id}`) }} >
                            <EditIcon/> Edit  
                        </li>
                        <li className='cursor-pointer flex gap-2' onClick={(e) => { console.log("Hello") ;e.stopPropagation() }}>
                            <DeleteIcon/> Delete
                        </li>
                    </ul>
                    </div>
                )
            }
        </div>
    )
}

export default Header