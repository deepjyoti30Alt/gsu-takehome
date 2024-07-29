import { getTask } from "@/app/networking/task";
import { Task } from "@/app/types/task";
import { useQuery } from "@tanstack/react-query";

export const useTaskDetails = (authToken: string | null, taskId: string) => {
    return useQuery<Task, Error>(
        {
            queryKey: ['task', taskId],
            queryFn: async () => {
                if (!authToken) throw new Error('Not authorized');
                if (!taskId) throw new Error('Task ID is invalid');
                return getTask(authToken, taskId);
            },

        }
    );
};
