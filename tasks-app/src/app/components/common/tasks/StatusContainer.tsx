import { Status, Task } from "@/app/types/task";
import React, { useMemo, useRef } from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";
import TaskCard from "./TaskCard";

interface StatusContainerProps {
    status: Status,
    dropHandlerFn: (
        oldStatus: Status,
        newStatus: Status,
        task_id: string
    ) => void,
    tasks: Task[]
}

const StatusContainer: React.FC<StatusContainerProps> = ({ status, dropHandlerFn = () => {}, tasks }) => {
    const selfRef = useRef<HTMLDivElement | null>(null);

    const dropConfig = useMemo(() => ({
        accept: 'card',
        drop: (item: Task, monitor: DropTargetMonitor<Task, unknown>) => {
            if (monitor.didDrop()) {
                // If the card was already dropped,
                return;
            }

            dropHandlerFn(item.status, status, item.task_id);
        }
    }), [dropHandlerFn, status])

    const [_, drop] = useDrop(dropConfig);
    drop(selfRef)

    return (
        <div ref={selfRef} className="w-full h-[75vh]">
            {tasks.map((task) => (
                <div key={task.task_id} className="mb-2">
                    <TaskCard task={task} />
                </div>
            ))}
        </div>
    )
};

export default StatusContainer;
