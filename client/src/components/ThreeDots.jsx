import React, { useEffect, useRef, useState } from 'react'
import ThreeDotsIcon from '../svg/ThreeDotsIcon';
import EditIcon from '../svg/EditIcon';
import ArchiveIcon from '../svg/ArchivedIcon';
import DeleteIcon from '../svg/DeleteIcon';

const ThreeDots = ({ job, handleAction }) => {
        const [isOpen, setIsOpen] = useState(false);
        const menuRef = useRef(null);
    
        const toggleMenu = () => {
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
                <button onClick={toggleMenu} className="focus:outline-none">
                    <ThreeDotsIcon /> {/* This is the three dots icon */}
                </button>
                {isOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-md z-10">
    
                        {job.status == 'active' && (
                            <ul className="py-1">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('edit', job._id)}><button className="text-black rounded m-1"><EditIcon /></button>Edit</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('archive', job._id)}><button className="text-black rounded m-1"><ArchiveIcon /></button>Move To Draft</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('unarchive', job._id)}><button className="text-black rounded m-1"><ArchiveIcon /></button>Close job</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('delete', job._id)}><button className="text-black rounded m-1"><DeleteIcon /></button>Delete</li>
                            </ul>
                        )
                        }
                        {job.status == 'draft' && (
                            <ul className="py-1">
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('edit', job._id)}><button className="text-black rounded m-1"><EditIcon /></button>Edit</li>
                                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => handleAction('archive', job._id)}><button className="text-black rounded m-1"><ArchiveIcon /></button>Move To Draft</li>
                            </ul>
                        )
                        }
    
    
                    </div>
                )}
            </div>
        );
    };

export default ThreeDots