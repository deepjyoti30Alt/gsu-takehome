'use client'

import { useEffect } from "react";
import { useTasks } from "./lib/hooks/useTasks";
import Loading from "./components/common/loading/Loading";
import Board from "./components/common/tasks/Board";


export default function Home() {  
  const { tasks, loading: isLoading} = useTasks();

  return (
    <div>
      {isLoading && <Loading />}
      {!isLoading && <Board tasks={tasks} />}
    </div>
  );
}
