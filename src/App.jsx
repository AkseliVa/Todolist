import React from 'react'
import './App.css'
import Todotable from './components/Todotable';
import Todoform from './components/Todoform';

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

      <Todoform newTodo={newTodo} setNewTodo={setNewTodo} todos={todos} setTodos={setTodos} addTodo={addTodo} />

      <Todotable todos={todos} delete={deleteTodo}/>
    </>
  )
}

export default App
