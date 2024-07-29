import React, { useEffect, useMemo, useState } from "react";
import Modal from 'react-modal';
import { X } from "styled-icons/bootstrap";
import { BaseTask, Priority, Status, Task } from "@/app/types/task";
import { toast } from "sonner";

interface TaskEditorProps {
    task?: Task,
    heading: string;
    isOpen: boolean;
    onSave: (task: BaseTask) => void;
    onClose: () => void;
}

const defaultStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 'none',
    },
};

const TaskEditor: React.FC<TaskEditorProps> = ({heading, isOpen, onSave, onClose, task}) => {
    Modal.setAppElement('#modal--container');

    const [taskData, setTaskData] = useState<BaseTask>({
        title: task?.title || '',
        due_at: task?.due_at || null,
        priority: task?.priority || Priority.MEDIUM,
        status: task?.status || Status.NOT_STARTED
    });

    const [isMobile, setIsMobile] = useState(false);
    const customStyles = useMemo(() => ({ content: {...defaultStyles.content, minWidth: isMobile ? '100%' : '500px'} }), [isMobile])

    useEffect(() => {
        const checkScreenSize = () => {
        setIsMobile(window.innerWidth < 768);
        };

        // Check on initial render
        checkScreenSize();

        // Add event listener for window resize
        window.addEventListener('resize', checkScreenSize);

        // Clean up event listener on component unmount
        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTaskData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSave = () => {
        if (!taskData.title) {
            toast.error('Title is required!');
            return;
        }
        onSave(taskData);
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                style={customStyles}
                contentLabel="Task Editor Modal"
            >
                <div className="modal--wrapper">
                    <div className="header border-b flex items-center justify-between p-3">
                        <div className="heading--container text-sm font-semibold">{heading}</div>
                        <button type="button" className="outline-none bg-none border-none" onClick={onClose}>
                            <X size="25px" />
                        </button>
                    </div>
                    <div className="modal--content md:p-8 p-2">
                        <div className="mb-4">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={taskData.title}
                                onChange={handleInputChange}
                                className="mt-1 block w-full rounded-md px-1 py-1 border text-sm"
                                placeholder="Title of your task"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700">Due Date</label>
                            <input type="date" value={String(taskData.due_at)} name="due_at" onChange={handleInputChange} className="border rounded p-1"  />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="priority" className="block text-sm font-medium text-gray-700">Priority</label>
                            <select
                                id="priority"
                                name="priority"
                                value={String(taskData.priority)}
                                onChange={handleInputChange}
                                className="mt-1 block rounded p-1 border"
                            >
                                {Object.values(Priority).map(priority => (
                                    <option key={priority} value={priority}>{priority}</option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                id="status"
                                name="status"
                                value={taskData.status}
                                onChange={handleInputChange}
                                className="mt-1 block rounded p-1 border"
                            >
                                {Object.values(Status).map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="modal--footer border-t p-3 flex justify-end gap-3">
                        <button type="button" onClick={onClose} className="bg-none outline-none border border-blue-600 px-3 py-1 rounded text-blue-600 font-medium text-sm">Cancel</button>
                        <button type="button" onClick={handleSave} className="bg-none outline-none bg-blue-600 px-3 py-1 rounded text-white font-medium text-sm">Save</button>
                    </div>
                </div>
            </Modal>
        </div>
    )
};

export default TaskEditor;