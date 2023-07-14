interface ITodoList {
  todoItem: { todo: string; id: number; userName: string }[];
  handleUpdateDelete: (id: number) => void;
  currentId: number;
  handleUpdateEdit: (id: number) => void;
}

const TodoList: React.FC<ITodoList> = ({
  todoItem,
  handleUpdateDelete,
  handleUpdateEdit,
}) => {
  // const { todoItem, handleUpdateDelete, handleUpdateEdit } = props;
  return (
    <div className="todoItem">
      <fieldset className="todoItem">
        <legend className="todoItemTitle">Your todoList</legend>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Todo Task</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todoItem.map(
              (inputValue: { todo: string; id: number; userName: string }) => (
                <tr key={inputValue.id}>
                  <td>{inputValue.id}</td>
                  <td>{inputValue.userName}</td>
                  <td>{inputValue.todo}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => handleUpdateEdit(inputValue.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleUpdateDelete(inputValue.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </fieldset>
    </div>
  );
};
export default TodoList;
