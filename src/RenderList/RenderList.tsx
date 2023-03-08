interface PropsRenderList {
	editListItem: (item: Item) => void;
  deleteListItem: (item: Item) => void;
  itemList: Item[];
}

export interface Item {
	id: number;
	text: string;
}

// Shows all items in a particular list
export function RenderList({editListItem, deleteListItem, itemList}: PropsRenderList) {
  return (
    <ul className='list'>
      {itemList.map(item =>
      <li key={item.id}>
        <div>
          <input type='checkbox' />
          <label>{item.text}</label>
        </div>
        <div>
          <button onClick={() => editListItem(item)}>Edit</button>
          <button className='danger' onClick={() => deleteListItem(item)}>Delete</button>
        </div>
      </li>
      )}
    </ul>
  );
}