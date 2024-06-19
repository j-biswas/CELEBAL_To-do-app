import { useEffect, useState } from 'react'
import DoneRoundedIcon from '@mui/icons-material/DoneRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import './App.css'
import { Tooltip } from '@mui/material';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState({
    title: "",
    description: "",
  });
  const [AddToDo, setAddToDo] = useState(false);
  const handleChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }
  const addToDo = () => {

    if (input.title === "")
      setTodos([...todos, {
        title: "Untitled",
        description: input.description,
      }])
    else setTodos([...todos, input]);

    setInput({
      title: "",
      description: "",
    });
    document.getElementsByName('description')[0].innerText = "";
  }
  const removeTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  }

  const openAddToDo = () => {
    setAddToDo(!AddToDo);
    if(!AddToDo){
      setInput({
        title: "",
        description: "",
      });
      
    }
  }

  const onSpanChange = (e) => {
    setInput({
      ...input,
      description: e.target.innerText,
    });
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('todos'));
    if (data) 
      setTodos(data);
    
  },[])

  useEffect(() => { 
    if(todos.length != 0)
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos])


  return (
    < div className='full_wrap'>
      <h1 className='head'>TO DO APP</h1>
      <div className="to_do_con">
        {AddToDo &&
          <div className="add_to_do">
            <input type="text" placeholder='Title' name='title' onChange={handleChange} value={input.title} />
            <span placeholder='Description' name='description' onKeyUp={onSpanChange} contentEditable></span>
            <button onClick={addToDo}>ADD</button>
          </div>
        }
        {todos.map((todo, index) => {
          return (
            <div className="to_do" key={index}>
              <h3 className="to_to_head">{todo.title}</h3>
              <span>{todo.description}</span>
              <Tooltip title="Mark as done">
                <button onClick={(index) => removeTodo(index)}> <DoneRoundedIcon /></button>
              </Tooltip>

            </div>
          );
        })}
      </div>
      <button onClick={openAddToDo} className={`open_add_todo rounded-btn ${AddToDo?'close':''}`}><CloseRoundedIcon /></button>


    </div>
  )
}

export default App
