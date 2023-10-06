import React from 'react'
import { AgGridReact } from 'ag-grid-react';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

function App() {
  const [newTodo, setNewTodo] = React.useState({description: "", date: "", priority: ""});
  const [todos, setTodos] = React.useState([]);
  const [columnDefs] = React.useState([
    { field: "description", sortable: true, filter: true, floatingFilter: true, valueFormatter: params => params.data.description},
    { field: "priority", sortable: true, filter: true,
      cellStyle: params => params.value === "High" ? {color: "red"} : {color: "black"},
      floatingFilter: true, valueFormatter: params => params.data.priority
    },
    { field: "date", sortable: true, filter: true, floatingFilter: true, valueFormatter: params => dayjs(params.data.date).format('DD-MM-YYYY')}
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
      setTodos(todos.filter((item, index) => row !== index));
    } else {
      alert("Select at least one row!");
    }
  }

  const changeDate = (date) => {
    const parsedDate = dayjs(date).toDate();
    setNewTodo({...newTodo, date: parsedDate})
  }

  return (
      <Container>
       <Stack 
          direction="row" 
          spacing={2} 
          alignItems="center" 
          justifyContent="center"
          mt={2}
        >
          <TextField 
            type="text"
            id="description"
            value={newTodo.description} 
            onChange={event => setNewTodo({...newTodo, description: event.target.value})}
            label="Description"
          />

          <TextField 
            type="text"
            id="priority"
            value={newTodo.priority} 
            onChange={event => setNewTodo({...newTodo, priority: event.target.value})}
            label="Priority"
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker value={newTodo.date} onChange={date => changeDate(date)} />
          </LocalizationProvider>

          <Button variant='contained' onClick={addTodo}>Add todo</Button>
          <Button variant='contained' color='error' onClick={deleteTodo}>Delete</Button>
        </Stack>

        <Stack alignItems="center" justifyContent="center">
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
        </Stack>
      </Container>
  )
}

export default App
