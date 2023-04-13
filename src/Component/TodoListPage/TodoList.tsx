import { FC } from "react";

interface ITodoList {
  list: string[];
}

const TodoList: FC<ITodoList> = (props) => {
  const { list } = props;
  return (
    <div className="todoList">
      <fieldset className="list">
        <legend className="listTitle">Your List</legend>
        {list.map((data: string, index: number) => (
          <ul key={index}>
            <li>{data}</li>
          </ul>
        ))}
      </fieldset>
    </div>
  );
};
export default TodoList;
