import { BaseTask, Task } from "@/app/types/task";
import { getColorForPriority } from "@/app/util/priorityColors";
import moment from "moment";
import React, { useMemo, useRef, useState } from "react";
import { useDrag } from "react-dnd";
import TaskEditor from "./TaskEditor";

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
    const colorByPriority = useMemo(() => getColorForPriority(task.priority), [task.priority])
    const [isEditorOpen, setIsEditorOpen] = useState(false);

    const onClose = () => setIsEditorOpen(false);
    const onTaskSave = (updatedTask: BaseTask) => {
        console.log('updated task: ', updatedTask);
    }

    return (
        <div className="task--wrapper">
            <div ref={selfRef} className={`task--card--wrapper rounded border p-2 bg-white cursor-pointer`} onClick={() => setIsEditorOpen(true)}>
                <div className="top--wrapper flex">
                    <div className={`checkbox rounded border-[2.5px] w-4 h-4 mt-0.5 mr-2 ${colorByPriority}`}></div>
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
