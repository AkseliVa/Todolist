import React from 'react'
import './App.css'
import Todotable from './components/Todotable';

function App() {
  const [newTodo, setNewTodo] = React.useState({description: "", date: ""});
  const [todos, setTodos] = React.useState([]);

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo({description: "", date: ""});
  }

  const deleteTodo = (index) => {
    setTodos(todos.filter((item, i) => i !== index));
  }

  return (
    <>
      <h3>My Todos</h3>

      <input 
        type="text"
        id="description"
        value={newTodo.description} 
        onChange={event => setNewTodo({...newTodo, description: event.target.value})}
        placeholder="Description"
      />

      <input 
        type="date"
        id="date"
        value={newTodo.date} 
        onChange={event => setNewTodo({...newTodo, date: event.target.value})}
        placeholder="Date"
      />

      <button onClick={addTodo}>Add todo</button>

      <Todotable todos={todos} delete={deleteTodo}/>
    </>
  )
}

export default App
