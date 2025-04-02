import React, { useRef, useState } from 'react';
import EyeIcon from '../../svg/Icons/EyeIcon';
import EyeIconCrossed from '../../svg/Icons/EyeIconCrossed';
import IconWrapper from '../Cards/IconWrapper';
import { Eye, EyeOff } from 'lucide-react';

function TogglePassword({ children, typeState, setTypeState }) {
  // Local state to manage visibility of the password
  const [isVisible, setIsVisible] = useState(false);

  // Ref to store the timeout ID, preventing unnecessary re-renders
  let timeout = useRef(null);

  // Function to toggle password visibility and type state
  const handleVisibility = () => {
    // Clear any previous timeout to prevent multiple timeouts running concurrently
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    // Toggle the visibility of the password
    setIsVisible(!isVisible);

    // Toggle the input type between 'password' and 'text'
    if (typeState === 'password') {
      setTypeState('text');  // If password is hidden, make it visible
    } else {
      setTypeState('password');  // If text is visible, hide it as password
    }

    // Set a timeout to revert visibility and input type after 2 seconds if visible
    if (!isVisible) {
      timeout.current = setTimeout(() => {
        setIsVisible(false);  // Hide the password after 2 seconds
        setTypeState('password');  // Revert type to 'password'
      }, 2000);
    }
  };

  return (
    <div className="relative">
      {children} {/* Render the input field or other children passed */}
      
      {/* Icon to toggle visibility of password */}
      <div onClick={handleVisibility} className="absolute top-0 right-4 flex items-center h-full">
        {/* Conditionally render either crossed or normal eye icon based on visibility */}
        {!isVisible ? <IconWrapper size={0} customIconSize={5} isInActiveIcon icon={EyeOff} /> : <IconWrapper size={0} customIconSize={5} isInActiveIcon icon={Eye} />}
      </div>
    </div>
  );
}

export default TogglePassword;
