import React from "react";
import Modal from 'react-modal';
import { X } from "styled-icons/bootstrap";


interface TaskEditorProps {
    heading: string
    isOpen: boolean
    onSave: () => void
    onClose: () => void
}

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 'none',
      minWidth: '500px'
    },
  };

const TaskEditor: React.FC<TaskEditorProps> = ({heading, isOpen, onSave, onClose}) => {
    Modal.setAppElement('#modal--container');

    return (
        <div>
            <Modal
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Example Modal"
            >
                <div className="modal--wrapper">
                    <div className="header border-b flex items-center justify-between p-3">
                        <div className="heading--container text-sm font-semibold">{heading}</div>
                        <button type="button" className="outline-none bg-none border-none" onClick={onClose}>
                            <X size="25px" />
                        </button>
                    </div>
                    <div className="modal--content p-8">

                    </div>
                    <div className="modal--footer border-t p-3 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-none outline-none border border-blue-600 px-3 py-1 rounded text-blue-600 font-medium text-sm">Cancel</button>
                        <button type="button" className="bg-none outline-none bg-blue-600 px-3 py-1 rounded text-white font-medium text-sm">Save</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default TaskEditor;
