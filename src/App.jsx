import React from 'react'
import './App.css'

import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

function App() {
  const [newTodo, setNewTodo] = React.useState({description: "", date: "", priority: ""});
  const [todos, setTodos] = React.useState([]);
  const [columnDefs] = React.useState([
    { field: "description", sortable: true, filter: true, floatingFilter: true},
    { field: "priority", sortable: true, filter: true,
      cellStyle: params => params.value === "High" ? {color: "red"} : {color: "black"},
      floatingFilter: true
    },
    { field: "date", sortable: true, filter: true, floatingFilter: true}
  ]);
  const gridRef = React.useRef();

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo({
      description: "", 
      date: "", 
      priority: ""
    });
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      const row = gridRef.current.getSelectedNodes()[0].id;
      setTodos(todos.filter((item, index) => row != index));
    } else {
      alert("Select at least one row!");
    }
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
        type="text"
        id="priority"
        value={newTodo.priority} 
        onChange={event => setNewTodo({...newTodo, priority: event.target.value})}
        placeholder="Priority"
      />

      <input 
        type="date"
        id="date"
        value={newTodo.date} 
        onChange={event => setNewTodo({...newTodo, date: event.target.value})}
        placeholder="Date"
      />

      <button onClick={addTodo}>Add todo</button>
      <button onClick={deleteTodo}>Delete</button>

      <div className='ag-theme-material' style={{height: 390, width:600}}>
        <AgGridReact
          ref={gridRef}
          onGridReady={params => gridRef.current = params.api}
          rowSelection='single'
          rowData={todos}
          columnDefs={columnDefs}
          animateRows={true}>
        </AgGridReact>
      </div>
    </>
  )
}

export default App
