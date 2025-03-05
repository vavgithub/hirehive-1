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
        <StyledCard backgroundColor={"bg-transparent"} extraStyles="relative w-[80%] max-w-4xl z-10 overfflow-hidden">
            {/* Close button */}


            {/* Video title */}
            {/* <h2 className="typography-h2 mb-4">Assessment Recording</h2> */}

            {/* Video container with loader */}
            <div className="relative  w-full  rounded-lg ">
                <div className='h-full w-fit relative mx-auto'>
                    <button
                        onClick={onClose}
                        className="absolute -top-2 -right-2 p-2 bg-background-90 hover:bg-background-80 rounded-full transition-colors z-20"
                    >
                        <X className="w-6 h-6 text-font-gray" />
                    </button>
                    <img
                        src={imageUrl}
                        className="h-full mx-auto rounded-lg"
                    />
                </div>
            </div>
        </StyledCard>
    </div>
  )
}

export default ImageModal