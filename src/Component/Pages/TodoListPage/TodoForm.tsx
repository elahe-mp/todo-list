import { useEffect } from "react";
import { FieldValues, useForm, Controller } from "react-hook-form";
import {
  Button,
  Stack,
  Box,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import CreateTwoToneIcon from "@mui/icons-material/CreateTwoTone";

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
    control,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isDirty, isSubmitting },
    reset,
    setValue,
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
    console.log(todoItems);

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
      <Paper elevation={3}>
        <Box sx={{ display: "-webkit-inline-flex", alignItems: "center" }}>
          <CreateTwoToneIcon sx={{ width: 20 }} />
          <Typography variant="h6" component="h2" mt={2}>
            Your Todo Form
          </Typography>
        </Box>

        <Stack spacing={4} margin={2} padding={1}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack marginBottom={2}>
              <Controller
                name="userName"
                control={control}
                defaultValue=""
                rules={{
                  required: { value: true, message: "This field is required" },
                  minLength: { value: 2, message: "Min lenght is 2" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    helperText={errors ? errors.userName?.message : null}
                    error={!!errors.userName}
                    label="Your Name"
                    placeholder="Enter Your Name"
                  />
                )}
              />
            </Stack>
            <Stack>
              <Controller
                name="todo"
                control={control}
                defaultValue=""
                rules={{
                  required: "This field is required",
                  minLength: { value: 2, message: "Min lenght is 2" },
                }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    helperText={errors ? errors.todo?.message : null}
                    error={!!errors.todo}
                    label="Todo"
                    placeholder="Enter your TODO"
                  />
                )}
              />
            </Stack>

            <Stack display="block" marginTop={2} marginBottom={2}>
              <Button
                variant="contained"
                size="large"
                endIcon={<SendIcon />}
                type="submit"
                disabled={!isDirty || isSubmitting}
              >
                {selectedId !== null ? "Edit" : "Submit"}
              </Button>
            </Stack>
          </form>
        </Stack>
      </Paper>
    </>
  );
};
export default TodoForm;
