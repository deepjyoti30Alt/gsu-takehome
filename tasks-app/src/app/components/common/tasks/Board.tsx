import { Status, Task } from "@/app/types/task";
import React, { useMemo } from "react";
import StatusContainer from "./StatusContainer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

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

    const handleDrop = (oldStatus: Status, newStatus: Status, task_id: string) => {
        console.log(oldStatus, newStatus, task_id);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="2xl:w-4/5 xl:w-11/12 mx-auto min-h-[90vh]">
            <div className="header mt-6">
                <div className="count--container text-2xl text-center font-semibold text-neutral-800">
                    {tasksLength} tasks
                </div>
            </div>
            <div className="status--container mt-6 flex items-center">
                {statusToShow.map((status) => (
                    <div key={status} className="w-1/4 border-r first:border-l min-h-[85vh] p-3">
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
    )
};

export default Board;
