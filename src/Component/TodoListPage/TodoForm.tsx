import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { useForm } from 'react-hook-form';
import { FormState } from "react-hook-form";


interface ITodoForm {
  list: string[]
  handleUpdateList: (data: string[]) => void 
  todo: string;
}

const TodoForm: FC<ITodoForm> = (props) => {
  const { list, handleUpdateList} = props;
  const [data, setData] = useState<string>("");
  const { register, handleSubmit, formState: {errors}} = useForm<ITodoForm>();

  const onSubmit= handleSubmit((data: ITodoForm) => {
    // console.log(data)
    handleUpdateList([data.todo, ...list]);
    setData("");
  });

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
              {...register("todo", { required: true, minLength: 2 })}
              type="text"
              name="todo"
              placeholder="Your to do list"
              id="todo"
              onChange={onChange}
              value={data}
            />
            {errors.todo && errors.todo.type === "required" && (
              <span className="error">This field is required</span>
            )}
            {errors.todo && errors.todo.type === "minLength" && (
              <span className="error">Must be at least 2 characters long</span>
            )}
          </label>
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
};
export default TodoForm;
