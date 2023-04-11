import { useEffect, useRef, useState } from 'react';

import { RenderList, Task } from '../RenderList/RenderList';
import { loadData, saveData } from '../DataHandler/DataHandler';
import { TaskInput } from '../TaskInput/TaskInput';
import { useLocation } from 'react-router-dom';

import RandomizerButton from '../RandomizerButton/RandomizerButton';
import Divider from '../Divider/Divider';

import './TodoList.css';
import { updateModificationDate } from '../ListSelector/ListSelector';

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
  // LocalStorage identification
  const listFile = useLocation();
  const fileId: number = listFile.state.fetchId;
  const fileData: string = 'todoListData' + fileId;
  
  // Declares and loads state data
  const taskRef = useRef<HTMLInputElement>(null);
  const [ tasks, setTasks ] = useState<Task[]>(() => {
    const data = loadData<Task[]>(fileData);
		return data ? data : [];
  });
  
  // Creates a new tasks Task with a particular description
  function addTask(description: string) {
    // Encapsulates the Task object
    const newTask = {
      id: Date.now(),
      text: description.trim().length === 0 ? 'Empty note' : description,
      highlighted: false
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
  
    newtasks[TaskIndex].text = prompt('Enter the new text for the selected Task', newtasks[TaskIndex].text) ?? newtasks[TaskIndex].text;

    setTasks(newtasks);
  }

  function onRandomize(index: number) {
    const newtasks = [...tasks];

    newtasks.map(Task => Task.highlighted = false);
    newtasks[index].highlighted = true;

    setTasks(newtasks);
  }

  function toggleHighlighted(Task: Task) {
    setTasks(prevState => {
      return prevState.map(i => {
        if (i.id === Task.id) {
          return {
            ...i,
            highlighted: !i.highlighted
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
    updateModificationDate(listFile.state.fetchId);
    saveData(tasks, fileData);
  },[tasks])
  
  return (
    <>
      <div className='flex gap'>
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

      <RenderList
        toggleHighlighted={toggleHighlighted}
        moveTask={onMove}
        editTask={editTask}
        deleteTask={deleteTask}
        tasks={tasks}/>
    </>
  );
}