function Todoform(props) {
    return (
        <>
            <input 
                type="text"
                id="description"
                value={props.newTodo.description} 
                onChange={event => props.setNewTodo({...props.newTodo, description: event.target.value})}
                placeholder="Description"
            />

            <input 
                type="date"
                id="date"
                value={props.newTodo.date} 
                onChange={event => props.setNewTodo({...props.newTodo, date: event.target.value})}
                placeholder="Date"
            />

            <button onClick={props.addTodo}>Add todo</button>
        </>
    );
}

export default Todoform;