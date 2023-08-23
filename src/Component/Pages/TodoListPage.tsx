import { useEffect, useState } from "react";
import TodoForm from "./TodoListPage/TodoForm";
import TodoList from "./TodoListPage/TodoList";
import { Typography, Box } from "@mui/material";

const TodoListPage: React.FC = () => {
  const [todoItems, setTodoItem] = useState<
    { todo: string; id: number; userName: string }[]
  >(() => {
    const storedTodo = localStorage.getItem("todo-items");
    return storedTodo ? JSON.parse(storedTodo) : [];
  });

  const [currentId, setCurrentId] = useState(1);

  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(todoItems));
  }, [todoItems]);

  const handleUpdateDelete = (todoId: number) => {
    const newTodoItem = todoItems.filter((todo) => todo.id !== todoId);
    setTodoItem(newTodoItem);
  };

  const handleUpdateEdit = (todoId: number) => {
    setSelectedId(todoId);
  };

  return (
    <>
      <Box textAlign="center">
        <Typography variant="h3" component="h1" gutterBottom mt={2}>
          Todo List page
        </Typography>

        {/* <h1>Todo List page</h1> */}
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
      </Box>
    </>
  );
};
export default TodoListPage;
