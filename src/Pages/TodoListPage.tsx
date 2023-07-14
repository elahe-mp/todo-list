import { useState } from "react";
import TodoForm from "../Component/TodoListPage/TodoForm";
import TodoList from "../Component/TodoListPage/TodoList";

const TodoListPage: React.FC = () => {
  const [todoItem, setTodoItem] = useState<
    { todo: string; id: number; userName: string }[]
  >([]);
  const [currentId, setCurrentId] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleUpdateDelete = (todoId: number) => {
    const newTodoItem = todoItem.filter((todo) => todo.id !== todoId);
    setTodoItem(newTodoItem);
  };

  const handleUpdateEdit = (todoId: number) => {
    setSelectedId(todoId);
    // console.log(selectedId);
  };

  return (
    <>
      <h1>Todo List page</h1>
      <TodoForm
        todoItem={todoItem}
        handleUpdateTodoItem={setTodoItem}
        todo=""
        userName=""
        currentId={currentId}
        handleUpdateId={setCurrentId}
        selectedId={selectedId}
        handleUpdateEdit={setSelectedId}
      />
      <TodoList
        todoItem={todoItem}
        handleUpdateDelete={handleUpdateDelete}
        currentId={currentId}
        handleUpdateEdit={handleUpdateEdit}
      />
    </>
  );
};
export default TodoListPage;
