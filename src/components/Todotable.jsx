function Todotable(props) {
    return (
        <table>
            <tbody>
            <tr>
                <td><h3>Date</h3></td>
                <td><h3>Description</h3></td>
            </tr>
            {
            props.todos.map((todo, index) => 
              <tr key={index}>
                <td>{todo.date}</td>
                <td>{todo.description}</td>
                <td><button onClick={() => props.delete(index)}>Delete</button></td>
              </tr>
            )
          }
        </tbody>
      </table>
    );
}

export default Todotable;