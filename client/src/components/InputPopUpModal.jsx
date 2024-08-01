import React from 'react'
import { Button } from './ui/Button';

const InputPopUpModal = ({ open, onClose, confirmAction, fields = [], heading, para, confirmButtonText = "Confirm", cancelButtonText = "Cancel" }) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-background-80 rounded-xl shadow p-6 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">x</button>
                <div>
                    <h1 className='typography-h1'>
                        {heading}
                    </h1>

                    <p className='typography-large-p'>
                        {para}
                    </p>



                    {/* Render input or select fields */}
                    {fields.length > 0 && (
                        <div className="mt-4">
                            {fields.map((field, index) => (
                                <div key={index} className="mb-2 ">
                                    <label className="block typography-body">{field.label}</label>
                                    {field.type === 'input' ? (
                                        <input
                                            type={field.inputType || 'text'}
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        />
                                    ) : field.type === 'select' ? (
                                        <select
                                            value={field.value}
                                            onChange={field.onChange}
                                            className="mt-1 bg-background-100 block w-full outline-none rounded-md shadow-sm focus:ring-teal-300 focus:border-teal-300 sm:text-sm"
                                        >
                                            {field.options.map((option, idx) => (
                                                <option key={idx} value={option.value} className='bg-background-100 gap-6  typography-large-p'>{option.label}</option>
                                            ))}
                                        </select>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-4 mt-4">

                        <Button variant="secondary" onClick={onClose} >
                            {cancelButtonText}
                        </Button>

                        <Button variant="cancel" onClick={confirmAction}>
                            {confirmButtonText}
                        </Button>
                        {/* <button className="btn btn-danger w-full" onClick={confirmAction}>
                        </button>
                        <button className="btn btn-light w-full" onClick={onClose}>
                        </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
};

export default InputPopUpModal;
