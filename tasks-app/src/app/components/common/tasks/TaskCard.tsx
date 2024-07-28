import { Task } from "@/app/types/task";
import { getColorForPriority } from "@/app/util/priorityColors";
import moment from "moment";
import React, { useMemo, useRef } from "react";
import { useDrag } from "react-dnd";

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


    return (
        <div ref={selfRef} className={`task--card--wrapper rounded border p-2 bg-white`}>
            <div className="top--wrapper flex">
                <div className={`checkbox rounded border-[2.5px] w-4 h-4 mt-0.5 mr-2 ${colorByPriority}`}></div>
                <div className="task--details--container text-xs">
                    <div className="title--container font-bold text-sm text-neutral-700 text-wrap">{task.title}</div>
                    <div className="created--time mt-1 text-gray-600 font-medium">Created on {createdDate}</div>
                </div>
            </div>
        </div>
    )
}

export default TaskCard;
