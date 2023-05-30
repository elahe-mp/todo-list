import { useState } from "react";
import { useForm } from "react-hook-form";

interface ITodoForm {
  todoItem: {
    todo: string;
     id:string}[];
  handleUpdateTodoItem: (inputValue: { todo: string; id:string}[]) => void;
  todo: string;
}

const TodoForm: React.FC<ITodoForm> = (props) => {
  const { todoItem, handleUpdateTodoItem } = props;
  const [inputValue, setInputValue] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ITodoForm>();

  const onSubmit = handleSubmit((inputValue: ITodoForm) => {
    const newTodoItem = {
      todo: inputValue.todo,
      id: `todo-${todoItem.length}`,
    }
    handleUpdateTodoItem([...todoItem, newTodoItem]);
    reset();
  });

  return (
    <>
      <form
        className="form"
        action="http://localhost:3000/"
        onSubmit={onSubmit}
      >
        <fieldset className="todoForm">
          <legend> Your Todo Form</legend>
          <label htmlFor="todo">
            <input
              {...register("todo", { required: true, minLength: 2 })}
              type="text"
              placeholder="Enter your todo item here..."
              id="todo"
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
