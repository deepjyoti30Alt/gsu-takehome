'use client'

import { useEffect } from "react";
import { useTasks } from "./lib/hooks/useTasks";

export default function Home() {  
  const { tasks, loading: isLoading, error: isError } = useTasks();

  useEffect(() => {
    console.log(tasks, isLoading, isError);
  }, [isLoading, isError, tasks]);

  return (
    <div></div>
  );
}
