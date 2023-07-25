import { useState } from "react";
import TodoForm from "../Component/TodoListPage/TodoForm";
import TodoList from "../Component/TodoListPage/TodoList";

const TodoListPage: React.FC = () => {
  const [todoItems, setTodoItem] = useState<
    { todo: string; id: number; userName: string }[]
  >([]);
  const [currentId, setCurrentId] = useState(1);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleUpdateDelete = (todoId: number) => {
    const newTodoItem = todoItems.filter((todo) => todo.id !== todoId);
    setTodoItem(newTodoItem);
  };

  const handleUpdateEdit = (todoId: number) => {
    setSelectedId(todoId);
  };

  return (
    <>
      <h1>Todo List page</h1>
      <TodoForm
        todoItems={todoItems}
        handleUpdateTodoItems={setTodoItem}
        todo=""
        userName=""
        currentId={currentId}
        handleUpdateId={setCurrentId}
        selectedId={selectedId}
        handleUpdateEdit={setSelectedId}
      />
      <TodoList
        todoItems={todoItems}
        handleUpdateDelete={handleUpdateDelete}
        currentId={currentId}
        handleUpdateEdit={handleUpdateEdit}
      />
    </>
  );
};
export default TodoListPage;
