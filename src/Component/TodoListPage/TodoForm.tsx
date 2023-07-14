import { useEffect } from "react";
import { useForm } from "react-hook-form";

interface ITodoForm {
  todoItem: {
    userName: string;
    todo: string;
    id: number;
  }[];


  handleUpdateTodoItem: (
    inputValue: { todo: string; id: number; userName: string }[]
  ) => void;

  handleUpdateId: (currentId: number) => void;
  todo: string;
  userName: string;
  currentId: number;

  selectedId: null | number;
  handleUpdateEdit: (selectedId: null | number) => void;
}

const TodoForm: React.FC<ITodoForm> = ({
  todoItem,
  handleUpdateTodoItem,
  currentId,
  handleUpdateId,
  selectedId,
  handleUpdateEdit,
}) => {
  // const {
  //   todoItem,
  //   handleUpdateTodoItem,
  //   currentId,
  //   handleUpdateId,
  //   selectedId,
  //   handleUpdateEdit,
  // } = props;
  // is it better to destructure the props in the funtion parameters instead of using props object?
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<ITodoForm>();

  useEffect(() => {
    if (selectedId !== null) {
      const selectedTodo = todoItem.find((item) => item.id === selectedId);
      if (selectedTodo) {
        setValue("userName", selectedTodo.userName);
        setValue("todo", selectedTodo.todo);
      }
    }
  }, [setValue, reset, selectedId, todoItem]);

  const onSubmit = handleSubmit((inputValue: ITodoForm) => {
    // edit an existing todo
    if (selectedId !== null) {
      const updateTodoItem = todoItem.map((item) =>
        item.id === selectedId
          ? { ...item, todo: inputValue.todo, userName: inputValue.userName }
          : item
      );
      handleUpdateTodoItem(updateTodoItem);
      handleUpdateEdit(null);
    }
    //add a new todo
    else {
      const newTodoItem = {
        todo: inputValue.todo,
        id: currentId,
        userName: inputValue.userName,
      };
      handleUpdateTodoItem([...todoItem, newTodoItem]);
      handleUpdateId(currentId + 1);
    }
    reset();
  });

  return (
    <>
      <form
        className="form"
        action="http://localhost:3001/"
        onSubmit={onSubmit}
      >
        <fieldset className="todoForm">
          <legend> Your Todo Form</legend>
          <label htmlFor="todo">
            <input
              {...register("userName", { required: true, minLength: 2 })}
              type="text"
              placeholder="Enter your name..."
              id="userName"
              autoComplete="off"
            />

            {errors.userName && errors.userName.type === "required" && (
              <span className="error">This field is required</span>
            )}
            {errors.userName && errors.userName.type === "minLength" && (
              <span className="error">Must be at least 2 characters long</span>
            )}

            <input
              {...register("todo", { required: true, minLength: 2 })}
              type="text"
              placeholder="Enter your todo task..."
              id="todo"
              autoComplete="off" // for turning off the autocompletion on form input
              //when using a react hook form we do not need name, inputValue and onChange here
            />

            {errors.todo && errors.todo.type === "required" && (
              <span className="error">This field is required</span>
            )}
            {errors.todo && errors.todo.type === "minLength" && (
              <span className="error">Must be at least 2 characters long</span>
            )}
          </label>
          <button type="submit">
            {selectedId !== null ? "Edit" : "Submit"}
          </button>
        </fieldset>
      </form>
    </>
  );
};
export default TodoForm;
