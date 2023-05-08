import { useState, useEffect, useRef} from 'react';
import Bag from "./bag";
import Storage from './storage';
import AddForm from './addForm';
import './App.css'

function App() {
  const [bag, setBag] = useState([])
  const [storage, setStorage] = useState([])
  const [page, setPage] = useState("main")
  const dragOverItem = useRef();
  const [addOrEdit, setAddOrEdit] = useState(null)

  useEffect(() => {
    getBag()
    getStorage()
  }, [])

  function getBag() {
    fetch('http://localhost:3000/api/bag')
      .then((result) => result.json())
      .then((data) => {
          setBag(data)
      })
  }

  function getStorage() {
    fetch('http://localhost:3000/api/storage')
      .then((result) => result.json())
      .then((data) => {
          setStorage(data)
      })
  }

  function changePage(location, id) {
    setPage(location)
    setAddOrEdit(id);
  }

  const dragEnter = (e) => {
    dragOverItem.current = e.target.className;
  }

  let discProps = {
    bag,
    setBag,
    storage,
    setStorage,
    page,
    setPage,
    changePage,
    getBag,
    getStorage,
    dragOverItem,
    addOrEdit,
    setAddOrEdit
  }

  if (page === "main") {
    return (
      <div className='wholeContainer'>
        <div className='bagContainer' onDragEnter={(e) => dragEnter(e)}>Bag
          <button id='addToBag' className="button" onClick={() => changePage("bag")}>Add</button>
          <Bag {...discProps}/>
        </div>
        <div className='storageContainer' onDragEnter={(e) => dragEnter(e)}>Storage
          <button id='addToStorage' className="button" onClick={() => changePage("storage")}>Add</button>
          <Storage {...discProps}/>
        </div>
      </div>
    )
  } else {
    return (
      <>
        <AddForm {...discProps}/>
      </>
    )
  }
}

export default App
