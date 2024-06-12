import React from 'react';

const Modal = ({ open, onClose, action, confirmAction }) => {
    return (
        <div onClick={onClose} className={`fixed inset-0 flex justify-center items-center ${open ? "visible bg-black/20" : "invisible"}`}>
            <div onClick={(e) => e.stopPropagation()} className={`bg-white rounded-xl shadow p-6 ${open ? "scale-100 opacity-100" : "scale-125 opacity-0"}`}>
                <button onClick={onClose} className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600">x</button>
                <div className="text-center w-56">
                    <h3 className="text-lg font-black text-gray-800">
                        {action === 'delete' ? 'Confirm Delete' :
                            action === 'edit' ? 'Confirm Edit' :
                                action === 'draft' ? 'Confirm Draft' : 
                                    action === 'closed' ? 'Confirm Close' : 
                                        action === 'reject' ? 'Confirm Reject' : 'Confirm Archive'}
                    </h3>
                    <p className="text-sm text-gray-500">
                        {action === 'delete' ? 'Are you sure you want to delete this item?' :
                            action === 'edit' ? 'Are you sure you want to edit this item?' :
                                action === 'draft' ? 'Are you sure you want to draft this item?' :
                                    action === 'closed' ? 'Are you sure you want to close this item?' :
                                        action === 'reject' ? 'Are you sure you want to reject this candidate?' : 'Are you sure you want to archive this item?'}
                    </p>
                    <div className="flex gap-4">
                        <button className="btn btn-danger w-full" onClick={confirmAction}>
                            Confirm
                        </button>
                        <button className="btn btn-light w-full" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Modal;
