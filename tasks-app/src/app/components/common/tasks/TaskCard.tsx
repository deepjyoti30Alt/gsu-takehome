import { BaseTask, Status, Task } from "@/app/types/task";
import { getColorForPriority } from "@/app/util/priorityColors";
import moment from "moment";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import TaskEditor from "./TaskEditor";
import { useAppSelector } from "@/app/lib/hooks";
import { selectBasicAuthCredentials } from "@/app/lib/features/authDataSlice";
import { useTasks } from "@/app/lib/hooks/useTasks";
import { TaskUpdateError } from "@/app/lib/errors/TaskError";
import { toast } from "sonner";
import { Check2, X } from "styled-icons/bootstrap";
import { getColorForStatus } from "@/app/util/statusColors";

interface TaskCardProps {
    task: Task,
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
    const selfRef = useRef<HTMLDivElement | null>(null);
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'card',
        item: task,
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging
        })
    }))
    drag(selfRef);

    const createdDate = useMemo(() => moment(task.createdAt).format('D MMM'), [task.createdAt]);
    const colorByPriority = useMemo(() => getColorForPriority(task.priority, task.status), [task.priority, task.status]);
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const authToken = useAppSelector(selectBasicAuthCredentials)
    const { updateTask } = useTasks()
    const showIcon = useMemo(() => [Status.COMPLETED, Status.SKIPPED].includes(task.status), [task.status]);
    const isCompleted = useMemo(() => task.status === Status.COMPLETED, [task.status])
    const IconComponent = useMemo(() => isCompleted ? Check2 : X, [isCompleted]);

    const onClose = () => setIsEditorOpen(false);
    const onTaskSave = useCallback((updatedTask: BaseTask) => {
        try {
            if (!authToken) {
                throw new Error('Not authenticated');
            }
            onClose();
            updateTask(updatedTask, authToken, task);
        } catch (err) {
            if (err instanceof TaskUpdateError) {
                toast.error('Failed to update task')
            } else {
                toast.error('Something went wrong, please try again')
            }
        }
    }, [task, authToken])

    return (
        <div className="task--wrapper">
            <div ref={selfRef} className={`task--card--wrapper rounded border p-2 bg-white cursor-pointer`} onClick={() => setIsEditorOpen(true)}>
                <div className="top--wrapper flex">
                    <div className={`checkbox rounded border-[2.5px] w-4 h-4 mt-0.5 mr-2 p-0 text-black relative ${colorByPriority}`}>
                        {showIcon && <IconComponent size={isCompleted ? '12px' : '14px'} className={`${isCompleted ? 'top-0' : 'top-[-1px]'} absolute left-0`} />}
                    </div>
                    <div className="task--details--container text-xs">
                        <div className="title--container font-bold text-sm text-neutral-700 text-wrap">{task.title}</div>
                        <div className="created--time mt-1 text-gray-600 font-medium">Created on {createdDate}</div>
                    </div>
                </div>
            </div>
            <TaskEditor heading="Edit task" isOpen={isEditorOpen} onClose={onClose} onSave={onTaskSave} task={task} />
        </div>
    )
}

export default TaskCard;
