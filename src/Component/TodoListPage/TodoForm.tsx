import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

interface ITodoForm {
  list: string[]
  handleUpdateList:(data:string[]) =>void  
}

const TodoForm: FC<ITodoForm> = (props) => {
  const { list, handleUpdateList} = props;
  const [data, setData] = useState<string>("");

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleUpdateList([data, ...list]);
    setData("");
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setData(e.target.value);
  };

  return (
    <>
      <form
        className="form"
        action="http://localhost:3000/"
        onSubmit={onSubmit}
      >
        <fieldset className="todoForm">
          <legend> Your To do List</legend>
          <label htmlFor="todo">
            <input
              type="text"
              name="todo"
              placeholder="Your to do list"
              required
              id="todo"
              onChange={onChange}
              value={data}
            />
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
};
export default TodoForm;
