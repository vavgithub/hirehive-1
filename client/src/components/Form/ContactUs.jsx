import React, { useState } from 'react';
import StyledCard from '../ui/StyledCard';
import { InputField } from './FormFields';
import { showErrorToast, showSuccessToast } from '../ui/Toast';
import { Button } from '../ui/Button';
import Modal from '../Modal';


const ContactUs = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
  
    const toggleModal = () => {
      setIsOpen(!isOpen);
      if (!isOpen) {
        // Reset form when opening
        setFormData({
          name: '',
          email: '',
          message: ''
        });
        setErrors({});
      }
    };
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [id]: value
      }));
      
      // Clear error when typing
      if (errors[id]) {
        setErrors(prev => ({
          ...prev,
          [id]: null
        }));
      }
    };
  
    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.name.trim()) {
        newErrors.name = 'Name is required';
      }
      
      if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Email is invalid';
      }
      
      if (!formData.message.trim()) {
        newErrors.message = 'Message is required';
      } else if (formData.message.trim().length < 10) {
        newErrors.message = 'Message should be at least 10 characters';
      }
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };
  
    const handleSubmit = async () => {
      if (!validateForm()) {
        return;
      }
      
      setIsSubmitting(true);
      
      try {
        // Replace with your actual API endpoint
        // const response = await contactUsApi(formData);
        
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        showSuccessToast('Success', 'Your message has been sent successfully!');
        toggleModal();
      } catch (error) {
        showErrorToast('Error', error.message || 'Failed to send message');
      } finally {
        setIsSubmitting(false);
      }
    };
  
    return (
      <>
        {/* Floating Button */}
        <button
          onClick={toggleModal}
          className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-teal-400 hover:bg-teal-500 text-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
          aria-label="Contact Us"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
          </svg>
        </button>
        
        {/* Modal for Contact Form */}
        <Modal
          open={isOpen}
          onClose={toggleModal}
          customTitle="Contact Us"
          customMessage="Please fill out the form below and we'll get back to you as soon as possible."
          customConfirmLabel={isSubmitting ? "Sending..." : "Send Message"}
          confirmVariant="primary"
          cancelLabel="Cancel"
          onConfirm={handleSubmit}
          isconfirmButtonDisabled={isSubmitting}
        >
          <div className="space-y-4 mt-4">
            <InputField
              id="name"
              type="text"
              label="Name"
              required
              value={formData.name}
              onChange={handleChange}
              error={!!errors.name}
              errorMessage={errors.name}
            />
            
            <InputField
              id="email"
              type="email"
              label="Email"
              required
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              errorMessage={errors.email}
            />
            
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="typography-body">
                Message <span className="text-red-100">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                className={`w-full p-2 bg-background-40 rounded outline-none focus:outline-teal-300 ${
                  errors.message ? '!border !border-red-500' : 'border border-transparent'
                }`}
              ></textarea>
              {errors.message && (
                <span className="text-red-500 typography-small-p">{errors.message}</span>
              )}
            </div>
          </div>
        </Modal>
      </>
    );
  };

export default ContactUs;