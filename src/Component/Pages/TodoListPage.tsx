import React, { useEffect, useState } from "react";
import TodoForm from "./TodoListPage/TodoForm";
import TodoList from "./TodoListPage/TodoList";
import { Typography, Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const TodoListPage: React.FC = () => {
  const [todoItems, setTodoItem] = useState<
    { todo: string; id: string; userName: string; completed: boolean }[]
  >(() => {
    const storedTodo = localStorage.getItem("todo-items");
    return storedTodo ? JSON.parse(storedTodo) : [];
  });

  const [currentId, setCurrentId] = useState(uuidv4());

  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem("todo-items", JSON.stringify(todoItems));
  }, [todoItems]);

  const handleUpdateDelete = (todoId: string) => {
    const newTodoItem = todoItems.filter((todo) => todo.id !== todoId);
    setTodoItem(newTodoItem);
  };

  const handleUpdateEdit = (todoId: string) => {
    setSelectedId(todoId);
  };

  const handleTodoCompletion = (index: number) => {
    const updatedTodoItems = [...todoItems];
    updatedTodoItems[index].completed = !updatedTodoItems[index].completed;
    setTodoItem(updatedTodoItems);
  };

  return (
    <React.Fragment>
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
          handleTodoCompletion={handleTodoCompletion}
        />
      </Box>
    </React.Fragment>
  );
};
export default TodoListPage;
