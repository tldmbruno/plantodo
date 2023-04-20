import { useEffect, useRef, useState } from 'react';
import { loadData, saveData } from '../DataHandler/DataHandler';

import TasksRenderer from '../TasksRenderer/TasksRenderer';
import TaskInput from '../TaskInput/TaskInput';
import RandomizerButton from '../RandomizerButton/RandomizerButton';
import Divider from '../Divider/Divider';
import ListSelector from '../ListSelector/ListSelector';

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

export function loadStorageData(): ListData[] {
  let newLists: ListData[] = [];

  // Loop through all keys in localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    
    // Check if the key starts with 'list-'
    if (key?.startsWith('list-')) {
      const data = loadData<ListData>(key);
      if (data) {
        newLists = [...newLists, data];
      }
    }
  }

  return newLists;
}

export default function TodoList() {
  
  // Declares and loads state data
  const taskRef = useRef<HTMLInputElement>(null);
  const [ lists, setLists ] = useState<ListData[]>(loadStorageData());
  
  const [ currentListId, setCurrentListId ] = useState(-1);
  const [ listIndex, setListIndex ] = useState(0);
  
  // Creates a new tasks Task with a particular description
  function addTask(description: string) {
    if (lists[listIndex]) {
      // Encapsulates the Task object
      const newTask: Task = {
        id: Date.now(),
        text: description.trim().length === 0 ? 'Empty note' : description,
        done: false,
      };
  
      const newList: ListData = {
        id: lists[listIndex].id,
        lastModification: getFormattedModificationDate(),
        title: lists[listIndex].title,
        tasks: [...lists[listIndex].tasks, newTask],
      }
      lists[listIndex] = newList;
      setLists(lists);
    }
  }
  
  function deleteTask(task: Task) {
    if (lists[listIndex]) {
      const newTasks = lists[listIndex].tasks.filter((i) => i.id !== task.id);
      
      const newList: ListData = {
        id: lists[listIndex].id,
        lastModification: getFormattedModificationDate(),
        title: lists[listIndex].title,
        tasks: newTasks,
      }
      lists[listIndex] = newList;
      setLists(lists);
    }
  }

  // Edits an Task's text property via browser's prompt
  function editTask(task: Task) {
    if (lists[listIndex]) {
      const taskIndex = lists[listIndex].tasks.findIndex((i) => i.id === task.id);
      const newTasks = [...lists[listIndex].tasks];
      newTasks[taskIndex].text = prompt('Enter the new text for the selected Task', newTasks[taskIndex].text) ?? newTasks[taskIndex].text;
  
      const newList: ListData = {
        id: lists[listIndex].id,
        lastModification: getFormattedModificationDate(),
        title: lists[listIndex].title,
        tasks: newTasks,
      }
      lists[listIndex] = newList;
      setLists(lists);
    }
  }

  function onRandomize(index: number) {
    if (lists[listIndex]) {
      const newTasks = [...lists[listIndex].tasks];
  
      newTasks.map(task => task.done = false);
      newTasks[index].done = true;
  
      const newList: ListData = {
        id: lists[listIndex].id,
        lastModification: getFormattedModificationDate(),
        title: lists[listIndex].title,
        tasks: newTasks,
      }
      lists[listIndex] = newList;
      setLists(lists);
    }
  }

  function toggleDone(task: Task) {
    if (lists[listIndex]) {
      const taskIndex = lists[listIndex].tasks.findIndex((i) => i.id === task.id);
      const newTasks = [...lists[listIndex].tasks];
  
      newTasks[taskIndex].done = !newTasks[taskIndex].done;
  
      const newList: ListData = {
        id: lists[listIndex].id,
        lastModification: getFormattedModificationDate(),
        title: lists[listIndex].title,
        tasks: newTasks,
      }
      lists[listIndex] = newList;
      setLists(lists);
    }
  }

  function onMove(task: Task, toRelativeIndex: number) {
    if (lists[listIndex]) {
      const taskIndex = lists[listIndex].tasks.findIndex((i) => i.id === task.id);
  
      const newList: ListData = {
        id: lists[listIndex].id,
        lastModification: getFormattedModificationDate(),
        title: lists[listIndex].title,
        tasks: moveTask(lists[listIndex].tasks, taskIndex, taskIndex + toRelativeIndex),
      }
      lists[listIndex] = newList;
      setLists(lists);
    }
  }

  function getFormattedModificationDate(): string {
    const currentDate = new Date();
    return currentDate.toLocaleString();
  }

  // Auto save on every change
  useEffect(() => {
    lists.map((list) => {
      saveData(list, 'list-' + list.id);
    });
  },[lists]);

  // Sync currentListId with listIndex
  useEffect(() => {
    setListIndex(lists.findIndex((i) => i.id === currentListId));
  },[currentListId]);

  return (
    <div className='grid'>
      <ListSelector lists={lists} setLists={setLists} setCurrentListId={setCurrentListId}/>
      <div className='content container overflow simpleFlex screenTall'>
        {lists[listIndex] && <div className='content'>
          <div className='grid gap'>
            <h1 className='breakableWord'>{lists[listIndex].title ?? ''}</h1>
            <TaskInput
              taskRef={taskRef}
              submitFunction={() => addTask(taskRef.current?.value ?? '')}/>

            <div className='flex gap'>
              <RandomizerButton 
                onRandomize={onRandomize}
                totalTasks={lists[listIndex].tasks.length}/>
            </div>
          </div>

          <Divider />

          <TasksRenderer
            toggleDone={toggleDone}
            moveTask={onMove}
            editTask={editTask}
            deleteTask={deleteTask}
            tasks={lists[listIndex].tasks}/>
        </div>}
      </div>
    </div>
  );
}