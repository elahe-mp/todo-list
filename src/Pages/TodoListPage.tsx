import { FC, useState} from "react";
import TodoForm from "../Component/TodoListPage/TodoForm";
import TodoList from "../Component/TodoListPage/TodoList";

const TodoListPage: FC = () => {
  const [list, setList] = useState<string[]>([]);
    return (
    <>
      <h1>Todo List page</h1>
          <TodoForm list={list} handleUpdateList={setList}/>
          <TodoList list={list} />
    </>
  );
};
export default TodoListPage;
