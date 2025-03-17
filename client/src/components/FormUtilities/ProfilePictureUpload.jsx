// ProfilePictureUpload.jsx
import React, { useRef } from 'react';
import { Button } from '../Buttons/Button';
import StyledCard from '../Cards/StyledCard';

export const ProfilePictureUpload = ({ 
  previewUrl,
  onFileSelect,
  error
}) => {
  const fileInputRef = useRef(null);

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    onFileSelect(file);
  };

  return (
    <div>
      <label className="typography-body">Profile Picture</label>
      <StyledCard 
        padding={2}
        backgroundColor={"bg-background-40"}
        extraStyles=" hover:bg-background-60 cursor-pointer  mt-2 flex flex-col items-center justify-center"
        onClick={() => fileInputRef.current?.click()}
      >
          <div className='flex justify-start w-full gap-4'>
            <div className="relative w-24 h-24">
              <img src={previewUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/694px-Unknown_person.jpg"} alt="Profile" className="w-full h-full object-cover rounded-full" />
              {/* <div className="absolute bottom-0 right-0 p-1 bg-background-90 rounded-full">
              </div> */}
            </div>
            <div className="flex flex-col items-start">
              <span className="typography-small-p text-font-gray my-2">
                Click to {previewUrl ? "edit" : "upload"}  profile picture
              </span>
              <Button variant="secondary" type="button" >{previewUrl ? "Edit" : "Upload"} </Button>
            </div>
          </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </StyledCard>
      {error && (
        <span className="text-red-500 typography-small-p mt-1">{error}</span>
      )}
    </div>
  );
};