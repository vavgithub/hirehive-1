import React from 'react'

const InputPopUpModal = ({ open, onClose, confirmAction, fields = [], heading ,para, confirmButtonText = "Confirm", cancelButtonText = "Cancel" }) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl shadow p-6 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">x</button>
                <div className=" w-56">
                    <h3 className="text-lg font-black text-gray-800">
                        {heading}
                    </h3>
                    <p className='text-sm  text-gray-600' > 
                        {para}
                    </p>
                    
                    {/* Render input or select fields */}
                    {fields.length > 0 && (
                        <div className="mt-4">
                            {fields.map((field, index) => (
                                <div key={index} className="mb-2">
                                    <label className="block text-sm font-medium text-gray-700">{field.label}</label>
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
                                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            {field.options.map((option, idx) => (
                                                <option key={idx} value={option.value}>{option.label}</option>
                                            ))}
                                        </select>
                                    ) : null}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="flex gap-4 mt-4">
                        <button className="btn btn-danger w-full" onClick={confirmAction}>
                            {confirmButtonText}
                        </button>
                        <button className="btn btn-light w-full" onClick={onClose}>
                            {cancelButtonText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default InputPopUpModal;
