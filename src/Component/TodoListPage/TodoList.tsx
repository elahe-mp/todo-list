
interface ITodoList {
  todoItem: {todo:string, id:string}[];
}

const TodoList: React.FC<ITodoList> = (props) => {
  const { todoItem } = props;
  return (
    <div className="todoItem">
      <fieldset className="todoItem">
        <legend className="todoItemTitle">Your todoList</legend>
        {todoItem.map((inputValue: { todo: string,  id:string}) => (
          <ul key={inputValue.id}>
            <li>Todo "{inputValue.todo}" with unique id of "{inputValue.id}"</li>
          </ul>
        ))}
      </fieldset>
    </div>
  );
};
export default TodoList;
