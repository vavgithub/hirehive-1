import React from 'react'
import StyledCard from '../Cards/StyledCard';
import { X } from 'lucide-react';

function ImageModal({isOpen, onClose, imageUrl}) {

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
        {/* Blurred backdrop */}
        <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-md"
            onClick={onClose} // Close modal when clicking backdrop
        />

        {/* Modal content */}
        <StyledCard backgroundColor={"bg-background-80"} extraStyles="relative w-[80%] max-w-4xl z-10 max-h-[80vh] overflow-hidden">
            {/* Close button */}

            {/* Video container with loader */}
            <div className="relative  overflow-hidden h-full   rounded-lg ">
                <div className='h-full  w-auto relative mx-auto'>
                    <button
                        onClick={onClose}
                        className="absolute -top-2 -right-2 p-2  hover:bg-background-80 rounded-full transition-colors z-20"
                    >
                        <X className="w-6 h-6 text-font-gray" />
                    </button>
                    <img
                        src={imageUrl}
                        className="h-full max-h-[70vh] mx-auto rounded-lg aspect-square"
                    />
                </div>
            </div>
        </StyledCard>
    </div>
  )
}

export default ImageModal