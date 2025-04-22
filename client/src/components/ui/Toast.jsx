import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IconWrapper from '../Cards/IconWrapper';
import { CircleCheckBig, Trash, X } from 'lucide-react';

// Custom toast component
const CustomToast = ({ title, message, variant }) => (
  <div className={`flex items-start  ${variant === 'success' ? 'text-green-500' : 'text-red-500'}`}>
    <div className="flex-shrink-0 mt-1">
      {variant === 'success' ? (
        <div className='bg-background-80 w-11 h-11 flex items-center justify-center rounded-xl'>
          <IconWrapper icon={CircleCheckBig} inheritColor size={0} customIconSize={6} />
        </div>
      ) : (
        <div className='bg-background-80 w-11 h-11 flex items-center justify-center rounded-xl'>
          <IconWrapper icon={Trash} inheritColor size={0} customIconSize={6} />
        </div>
      )}
    </div>
    <div className="ml-3 flex-1">
      <h3 className="typography-h3">{title}</h3>
      <p className="typography-large-p text-font-gray">{message}</p>
    </div>
  </div>
);

// Custom close button
const CloseButton = ({ closeToast }) => (
  <button onClick={closeToast} className="text-gray-500 hover:text-gray-700 absolute top-7 right-6">
      <IconWrapper icon={X} isInActiveIcon size={0} customIconSize={3} />
  </button>
);

// Styled ToastContainer
export const StyledToastContainer = () => (
  <ToastContainer
    position="top-right"
    autoClose={3000}
    // autoClose={false} // Set to false to prevent auto-closing
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    // closeOnClick={false} // Prevent closing on click for debugging
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    closeButton={CloseButton}
    icon={false} // This removes the default icons
    toastClassName={(context) =>
      context?.type === 'success'
        ? 'rounded-xl bg-gradient-to-r bg-black-100 from-[rgba(20,225,89,0.20)] to-[rgba(20,225,89,0.00)] p-4 border-green-500'
        : 'rounded-xl bg-gradient-to-r bg-black-100 from-[rgba(255,56,92,0.20)] to-[rgba(255,56,92,0.00)] p-4 border-red-500'
    }
  />
);

// Custom toast functions
export const showSuccessToast = (title, message) => {
  toast.success(<CustomToast title={title} message={message} variant="success" />);
};

export const showErrorToast = (title, message) => {
  toast.error(<CustomToast title={title} message={message} variant="error" />);
};