import {useState} from "react";
import TodoForm from "../Component/TodoListPage/TodoForm";
import TodoList from "../Component/TodoListPage/TodoList";

const TodoListPage: React.FC = () => {
  const [todoItem, setTodoItem] = useState<{ todo: string, id: string }[]>([]);
    return (
      <>
        <h1>Todo List page</h1>
        <TodoForm todoItem={todoItem} handleUpdateTodoItem={setTodoItem} todo="" />
        <TodoList todoItem={todoItem} />
      </>
    );
};
export default TodoListPage;
