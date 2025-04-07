import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Success from '../../svg/Toast/Success';
import Delete from '../../svg/Toast/Delete';

// Custom toast component
const CustomToast = ({ title, message, variant }) => (
  <div className={`flex items-start  ${variant === 'success' ? 'text-green-500' : 'text-red-500'}`}>
    <div className="flex-shrink-0 mt-1">
      {variant === 'success' ? (
        <div className='bg-background-80 w-11 h-11 flex items-center justify-center rounded-xl'>
          <Success />
        </div>
      ) : (
        <div className='bg-background-80 w-11 h-11 flex items-center justify-center rounded-xl'>
          <Delete />
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
    {
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M15 5L5 15M5 5L15 15" stroke="#808389" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    }
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