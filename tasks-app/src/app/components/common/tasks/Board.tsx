import { BaseTask, Status, Task } from "@/app/types/task";
import React, { useCallback, useMemo, useState } from "react";
import StatusContainer from "./StatusContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Plus } from "styled-icons/bootstrap";
import TaskEditor from "./TaskEditor";
import { useTasks } from "@/app/lib/hooks/useTasks";
import { TaskCreateError, TaskUpdateError } from "@/app/lib/errors/TaskError";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { useDispatch } from "react-redux";
import { selectBasicAuthCredentials } from "@/app/lib/features/authDataSlice";

interface BoardProps {
    tasks: Task[]
}

const Board: React.FC<BoardProps> = ({tasks}) => {
    const tasksLength = useMemo(() => tasks.length, [tasks]);
    const statusToShow: Array<Status> = [
        Status.NOT_STARTED,
        Status.IN_PROGRESS,
        Status.COMPLETED,
        Status.SKIPPED
    ]
    const tasksByStatus: { [key: string]: Task[] } = useMemo(() => {
        const statusObj: { [key: string]: Task[] } = {};
        tasks.forEach((task) => {
            const statusValue = String(task.status.toLowerCase().replace("_", "-"));
            if (!Object.keys(statusObj).includes(statusValue)) statusObj[statusValue] = []
            statusObj[statusValue].push(task);
        });
        return statusObj
    }, [tasks])
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const { addTask, updateTask } = useTasks();
    const authToken = useAppSelector(selectBasicAuthCredentials)

    const handleDrop = (oldStatus: Status, newStatus: Status, task_id: string) => {
        // Find the task that is to be updated.
        const updatePromise = (async () => {
            const taskToUpdate = tasks.find((task) => task.task_id === task_id);
            if (!taskToUpdate) {
                // Cannot update invalid task
                throw new Error('Failed to update task status');
            }

            onTaskUpdate({ ...taskToUpdate, status: newStatus }, taskToUpdate);
        })()

        console.log(updatePromise);

        toast.promise(updatePromise, {
            loading: 'Updating the task',
            success: 'Task updated successfully',
            error: 'Failed to update task'
        })
    }

    const onTaskUpdate = useCallback((task: BaseTask, originalTask: Task) => {
        try {
            if (!authToken) {
                throw new Error('Not authenticated');
            }
            updateTask(task, authToken, originalTask);
        } catch (err) {
            if (err instanceof TaskUpdateError) {
                toast.error('Failed to create task')
            } else {
                toast.error('Something went wrong, please try again')
            }
        }
    }, [authToken])

    const onClose = () => setIsEditorOpen(false);
    const onSave = useCallback((task: BaseTask) => {
        try {
            if (!authToken) {
                throw new Error('Not authenticated');
            }
            onClose();
            addTask(task, authToken);
        } catch (err) {
            if (err instanceof TaskCreateError) {
                toast.error('Failed to create task')
            } else {
                toast.error('Something went wrong, please try again')
            }
        }
    }, [authToken, addTask]);

    return (
        <div>
            <DndProvider backend={HTML5Backend}>
                <div className="2xl:w-4/5 w-11/12 mx-auto md:min-h-[90vh] md:pb-0 pb-12">
                    <div className="header mt-6 flex justify-between px-1">
                        <div className="count--container text-xl text-center font-semibold text-neutral-800">
                            {tasksLength} tasks
                        </div>
                        <div className="new--task--btn--wrapper">
                            <button type="button" className="outline-none bg-none flex items-center py-0.5 pl-1 pr-2 rounded uppercase bg-blue-500 text-white" onClick={() => setIsEditorOpen(true)}>
                                <Plus size="25px" />
                                <div className="font-semibold text-sm" >Add</div>
                            </button>
                        </div>
                    </div>
                    <div className="status--container mt-6 flex md:flex-row flex-col items-center">
                        {statusToShow.map((status) => (
                            <div key={status} className="md:w-1/4 w-full border-r md:first:border-l md:border-l-0 border-l md:min-h-[85vh] p-3">
                                <div className="header border-b py-2 flex items-center justify-between">
                                    <div className="status--name font-semibold text-neutral-800 capitalize flex items-center">
                                        <div className="status--text">{status.replace("-", " ")}</div>
                                        <div className="tasks--count ml-2 text-center rounded-lg text-xs font-bold rounded-full bg-blue-600 text-white px-1.5 pt-0.5">{tasksByStatus[status]?.length || 0}</div>
                                    </div>
                                </div>
                                <div className="tasks--container mt-6">
                                    <StatusContainer status={status} dropHandlerFn={handleDrop} tasks={tasksByStatus[status] || []} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </DndProvider>
            <TaskEditor onClose={onClose} onSave={onSave} isOpen={isEditorOpen} heading="Create a task" />
        </div>
    )
};

export default Board;
