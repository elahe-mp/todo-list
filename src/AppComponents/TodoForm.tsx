import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";

const TodoForm: FC = () => {
    const [data, setData] = useState<string>("");
    const [list, setList] = useState<string[]>([]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();
      setList([data, ...list]);
      setData("");
   }

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
      </>
    );    
};
export default TodoForm;