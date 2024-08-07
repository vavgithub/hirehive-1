import React, { useEffect, useRef, useState } from 'react'
import ThreeDotsIcon from '../svg/ThreeDotsIcon';
import EditIcon from '../svg/KebabList/EditIcon';
import ArchiveIcon from '../svg/KebabList/ArchivedIcon';
import DeleteIcon from '../svg/KebabList/DeleteIcon';
import CloseIcon from '../svg/KebabList/CloseIcon';

const ThreeDots = ({ job, handleAction, page }) => {
    const [isOpen, setIsOpen] = useState(false);
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

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={(e) => toggleMenu(e)} className="focus:outline-none">
                <ThreeDotsIcon /> {/* This is the three dots icon */}
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-background-70 shadow-lg rounded-md z-10">

                    {job.status == 'open' && page == 'dashboard' && (
                        <ul className="py-1">
                            <li className="px-4 py-2 flex items-center gap-1 typography-body" onClick={(e) => { handleAction('edit', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><EditIcon /></button>Edit</li>
                            <li className="px-4 py-2 flex items-center gap-1 typography-body" onClick={(e) => { handleAction('draft', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><ArchiveIcon /></button>Move To Draft</li>
                            <li className="px-4 py-2 flex items-center gap-1 typography-body" onClick={(e) => { handleAction('closed', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><CloseIcon /></button>Close job</li>
                            <li className="px-4 py-2 flex items-center gap-1 typography-body text-red-100" onClick={(e) => { handleAction('delete', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><DeleteIcon /></button>Delete</li>
                        </ul>
                    )
                    }
                    {job.status == 'open' && page == 'viewJob' && (
                        <ul className="py-1">
                            {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={(e) => { handleAction('edit', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><EditIcon /></button>Edit</li> */}
                            <li className="px-4 py-2 flex items-center gap-1" onClick={(e) => { handleAction('draft', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><ArchiveIcon /></button>Move To Draft</li>
                            <li className="px-4 py-2 flex items-center gap-1" onClick={(e) => { handleAction('closed', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><ArchiveIcon /></button>Close job</li>
                            <li className="px-4 py-2 flex items-center gap-1" onClick={(e) => { handleAction('delete', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><DeleteIcon /></button>Delete</li>
                        </ul>
                    )
                    }
                    {job.status == 'closed' && (
                        <ul className="py-1">
                            <li className="px-4 py-2 flex items-center gap-1" onClick={(e) => { handleAction('edit', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><EditIcon /></button>Edit</li>
                            <li className="px-4 py-2 flex items-center gap-1" onClick={(e) => { handleAction('draft', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><ArchiveIcon /></button>Move To Draft</li>
                            <li className="px-4 py-2 flex items-center gap-1" onClick={(e) => { handleAction('delete', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><DeleteIcon /></button>Delete</li>
                        </ul>
                    )
                    }

                    {job.status == 'draft' && (
                        <ul className="py-1">
                            <li className="px-4 py-2 flex items-center gap-1" onClick={() => handleAction('edit', job._id)}><button className="text-black rounded m-1"><EditIcon /></button>Edit</li>
                            <li className="px-4 py-2 flex items-center gap-1" onClick={(e) => { handleAction('delete', job._id); e.stopPropagation() }}><button className="text-black rounded m-1"><DeleteIcon /></button>Delete</li>
                        </ul>
                    )
                    }


                </div>
            )}
        </div>
    );
};

export default ThreeDots