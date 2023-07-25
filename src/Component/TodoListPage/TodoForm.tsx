import { useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";

interface ITodoForm {
  todoItems: {
    userName: string;
    todo: string;
    id: number;
  }[];

  handleUpdateTodoItems: (
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
  todoItems,
  handleUpdateTodoItems,
  currentId,
  handleUpdateId,
  selectedId,
  handleUpdateEdit,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty, isSubmitting },
    reset,
    setValue,
    // setError,
  } = useForm<ITodoForm>({
    defaultValues: {
      userName: "",
      todo: "",
    },
  });

  useEffect(() => {
    if (selectedId !== null) {
      const selectedTodo = todoItems.find((item) => item.id === selectedId);
      if (selectedTodo) {
        setValue("userName", selectedTodo.userName);
        setValue("todo", selectedTodo.todo);
      }
    }
    if (isSubmitSuccessful) {
      reset();
    }
  }, [setValue, selectedId, todoItems, isSubmitSuccessful, reset]);

  const onSubmit = (data: FieldValues) => {
    // Edit an existing item
    if (selectedId !== null) {
      const updateTodoItems = todoItems.map((item) =>
        item.id === selectedId
          ? { ...item, todo: data.todo, userName: data.userName }
          : item
      );
      handleUpdateTodoItems(updateTodoItems);
      handleUpdateEdit(null);
    }
    //Add a new item
    else {
      const newTodoItem = {
        todo: data.todo,
        id: currentId,
        userName: data.userName,
      };
      handleUpdateTodoItems([...todoItems, newTodoItem]);
      handleUpdateId(currentId + 1);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset className="todoForm">
          <legend> Your Todo Form</legend>
          <label htmlFor="todo">
            <input
              {...register("userName", {
                required: { value: true, message: "his field is required" },
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters long",
                },
              })}
              type="text"
              placeholder="Enter your name..."
              id="userName"
              autoComplete="off"
            />

            {errors.userName && errors.userName.type && (
              <span className="error">{errors.userName?.message}</span>
            )}

            <input
              {...register("todo", {
                required: { value: true, message: "his field is required" },
                minLength: {
                  value: 2,
                  message: "Must be at least 2 characters long",
                },
              })}
              type="text"
              placeholder="Enter your todo task..."
              id="todo"
              autoComplete="off"
            />

            {errors.todo && errors.todo.type && (
              <span className="error">{errors.todo?.message};</span>
            )}
          </label>
          <button type="submit" disabled={!isDirty || isSubmitting}>
            {selectedId !== null ? "Edit" : "Submit"}
          </button>
        </fieldset>
      </form>
    </>
  );
};
export default TodoForm;
