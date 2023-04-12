import { useEffect, useRef, useState } from 'react';
import { loadData, saveData } from '../DataHandler/DataHandler';

import TasksRenderer from '../TasksRenderer/TasksRenderer';
import TaskInput from '../TaskInput/TaskInput';
import RandomizerButton from '../RandomizerButton/RandomizerButton';
import Divider from '../Divider/Divider';

import ListSelector, { updateModificationDate } from '../ListSelector/ListSelector';

export interface ListData {
  id: number;
  title: string;
  lastModification: string;
  tasks: Task[];
}

export interface Task {
  id: number;
	text: string;
  done: boolean;
}

// Function that returns a new list after moving one item from it
function moveTask(tasks: Task[], fromIndex: number, toIndex: number): Task[] {
  const selectedTask = tasks[fromIndex];

  const newList = [...tasks];

  // Aborts if the destination is outside the array's scope
  if (toIndex < 0 || toIndex >= tasks.length) {
    return newList;
  }

  newList.splice(fromIndex, 1);
  newList.splice(toIndex, 0, selectedTask);

  return newList;
}

export default function TodoList() {
  const [ currentList, setCurrentList ] = useState<ListData | undefined>(undefined);

  // Declares and loads state data
  const taskRef = useRef<HTMLInputElement>(null);
  const [ tasks, setTasks ] = useState<Task[]>([]);
  
  // Creates a new tasks Task with a particular description
  function addTask(description: string) {
    // Encapsulates the Task object
    const newTask = {
      id: Date.now(),
      text: description.trim().length === 0 ? 'Empty note' : description,
      done: false,
      tasks: [],
    };
    
    // Adds the Task to the end of the tasks
    setTasks([...tasks, newTask]);
  }
  
  function deleteTask(task: Task) {
    const newtasks = tasks.filter((i) => i.id !== task.id);
    setTasks(newtasks);
  }

  // Edits an Task's text property via browser's prompt
  function editTask(task: Task) {
    const TaskIndex = tasks.findIndex((i) => i.id === task.id);
    const newtasks = [...tasks];
    newtasks[TaskIndex].text = prompt('Enter the new text for the selected Task',
      newtasks[TaskIndex].text) ?? newtasks[TaskIndex].text;
    setTasks(newtasks);
  }

  function onRandomize(index: number) {
    const newtasks = [...tasks];

    newtasks.map(task => task.done = false);
    newtasks[index].done = true;

    setTasks(newtasks);
  }

  function toggleDone(Task: Task) {
    setTasks(prevState => {
      return prevState.map(i => {
        if (i.id === Task.id) {
          return {
            ...i,
            done: !i.done
          }
        }
        return i;
      })
    });
  }

  function onMove(Task: Task, toRelativeIndex: number) {
    const TaskIndex = tasks.findIndex((i) => i.id === Task.id);
    
    setTasks(moveTask(tasks, TaskIndex, TaskIndex + toRelativeIndex));
  }

  // Auto save on every change
  useEffect(() => {
    if (currentList) {
      updateModificationDate(currentList.id);
      saveData(tasks, 'tasksData'+ currentList.id);
    }
  },[tasks])

  useEffect(() => {
    if (currentList) {
      console.log(currentList.title);
      setTasks(loadData<Task[]>('tasksData' + currentList.id) ?? []);
    }
    else {
      console.log('UNDEFINED');
    }
  },[currentList]);
  
  return (
    <div className='grid'>
      <ListSelector setCurrentList={setCurrentList}/>

      <div className='content container overflow simpleFlex screenTall'>
        <div className='content' hidden={!currentList}>
          <div className='flex gap'>
            <h1>{currentList?.title ?? ''}</h1>
            <TaskInput
              taskRef={taskRef}
              submitFunction={() => addTask(taskRef.current?.value ?? '')}/>

            <div className='flex gap'>
              <RandomizerButton 
                onRandomize={onRandomize}
                totalTasks={tasks.length}/>
            </div>
          </div>

          <Divider />

          <TasksRenderer
            toggleDone={toggleDone}
            moveTask={onMove}
            editTask={editTask}
            deleteTask={deleteTask}
            tasks={tasks}/>
        </div>
      </div>
    </div>
  );
}