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
  const [ currentList, setCurrentList ] = useState<ListData>();

  // Declares and loads state data
  const taskRef = useRef<HTMLInputElement>(null);
  const [ list, setList ] = useState<ListData>();

  // Creates a new tasks Task with a particular description
  function addTask(description: string) {
    if (list) {
      // Encapsulates the Task object
      const newTask: Task = {
        id: Date.now(),
        text: description.trim().length === 0 ? 'Empty note' : description,
        done: false,
      };
  
      const newList: ListData = {
        id: list.id,
        lastModification: getFormattedModificationDate(),
        title: list.title,
        tasks: [...list.tasks, newTask],
      }
      setList(newList);
    }
  }
  
  function deleteTask(task: Task) {
    if (list) {
      const newTasks = list.tasks.filter((i) => i.id !== task.id);
      
      const newList: ListData = {
        id: list.id,
        lastModification: getFormattedModificationDate(),
        title: list.title,
        tasks: newTasks,
      }
      setList(newList);
    }
  }

  // Edits an Task's text property via browser's prompt
  function editTask(task: Task) {
    if (list) {
      const taskIndex = list.tasks.findIndex((i) => i.id === task.id);
      const newTasks = [...list.tasks];
      newTasks[taskIndex].text = prompt('Enter the new text for the selected Task', newTasks[taskIndex].text) ?? newTasks[taskIndex].text;
  
      const newList: ListData = {
        id: list.id,
        lastModification: getFormattedModificationDate(),
        title: list.title,
        tasks: newTasks,
      }
      setList(newList);
    }
  }

  function onRandomize(index: number) {
    if (list) {
      const newTasks = [...list.tasks];
  
      newTasks.map(task => task.done = false);
      newTasks[index].done = true;
  
      const newList: ListData = {
        id: list.id,
        lastModification: getFormattedModificationDate(),
        title: list.title,
        tasks: newTasks,
      }
      setList(newList);
    }
  }

  function toggleDone(task: Task) {
    if (list) {
      const taskIndex = list.tasks.findIndex((i) => i.id === task.id);
      const newTasks = [...list.tasks];
  
      newTasks[taskIndex].done = !newTasks[taskIndex].done;
  
      const newList: ListData = {
        id: list.id,
        lastModification: getFormattedModificationDate(),
        title: list.title,
        tasks: newTasks,
      }
      setList(newList);
    }
  }

  function onMove(task: Task, toRelativeIndex: number) {
    if (list) {
      const taskIndex = list.tasks.findIndex((i) => i.id === task.id);
  
      const newList: ListData = {
        id: list.id,
        lastModification: getFormattedModificationDate(),
        title: list.title,
        tasks: moveTask(list.tasks, taskIndex, taskIndex + toRelativeIndex),
      }
      setList(newList);
    }
  }

  function getFormattedModificationDate(): string {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  }

  // Auto save on every change
  useEffect(() => {
    if (list) {
      saveData(list, 'list-' + list.id);
    }
  },[list])

  useEffect(() => {
    if (currentList) {
      setList(loadData<ListData>('list-' + currentList.id));
    }
  },[currentList]);

  return (
    <div className='grid'>
      <ListSelector setCurrentList={setCurrentList}/>
      <div className='content container overflow simpleFlex screenTall'>
        {list && <div className='content'>
          <div className='flex gap'>
            <h1 className='breakableWord'>{currentList?.title ?? ''}</h1>
            <TaskInput
              taskRef={taskRef}
              submitFunction={() => addTask(taskRef.current?.value ?? '')}/>

            <div className='flex gap'>
              <RandomizerButton 
                onRandomize={onRandomize}
                totalTasks={list.tasks.length}/>
            </div>
          </div>

          <Divider />

          <TasksRenderer
            toggleDone={toggleDone}
            moveTask={onMove}
            editTask={editTask}
            deleteTask={deleteTask}
            tasks={list.tasks}/>
        </div>}
      </div>
    </div>
  );
}