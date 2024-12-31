// ProfilePictureUpload.jsx
import React, { useRef } from 'react';
import { Camera, Upload } from 'lucide-react';

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
      <div 
        className="bg-background-40 hover:bg-background-60 cursor-pointer rounded-xl p-4 mt-2 flex flex-col items-center justify-center"
        onClick={() => fileInputRef.current?.click()}
      >
        {previewUrl ? (
          <div className="relative w-24 h-24">
            <img 
              src={previewUrl} 
              alt="Profile" 
              className="w-full h-full object-cover rounded-full"
            />
            <div className="absolute bottom-0 right-0 p-1 bg-background-90 rounded-full">
              <Camera size={16} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <Upload className="w-8 h-8 mb-2" />
            <span className="typography-small-p text-font-gray">
              Click to upload profile picture
            </span>
          </div>
        )}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileSelect}
        />
      </div>
      {error && (
        <span className="text-red-500 typography-small-p mt-1">{error}</span>
      )}
    </div>
  );
};