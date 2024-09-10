import React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { X, AlertCircle, CheckCircle } from 'lucide-react';

// Custom toast component
const CustomToast = ({ title, message, variant }) => (
  <div className={`flex items-start ${variant === 'success' ? 'text-green-500' : 'text-red-500'}`}>
    <div className="flex-shrink-0 mt-1">
      {variant === 'success' ? (
        <CheckCircle className="w-5 h-5" />
      ) : (
        <AlertCircle className="w-5 h-5" />
      )}
    </div>
    <div className="ml-3 flex-1">
      <h3 className="typography-h3">{title}</h3>
      <p className="typography-large text-font-gray">{message}</p>
    </div>
  </div>
);

// Custom close button
const CloseButton = ({ closeToast }) => (
  <button onClick={closeToast} className="text-gray-500 hover:text-gray-700 absolute top-1 right-1">
    <X className="w-4 h-4" />
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
        ? 'bg-gradient-to-r bg-black from-[rgba(20,225,89,0.20)] to-[rgba(20,225,89,0.00)] border-l-4 border-green-500'
        : 'bg-gradient-to-r bg-black from-[rgba(255,56,92,0.20)] to-[rgba(255,56,92,0.00)] border-l-4 border-red-500'
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