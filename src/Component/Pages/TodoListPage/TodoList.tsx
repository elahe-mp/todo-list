import {
  Paper,
  Typography,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Modal,
  Button,
  Checkbox,
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import React, { useMemo, useState } from "react";

interface ITODOItem {
  todo: string;
  id: string;
  userName: string;
  completed: boolean;
}

interface ITodoList {
  todoItems: ITODOItem[];
  handleUpdateDelete: (id: string) => void;
  currentId: string;
  handleUpdateEdit: (id: string) => void;
  handleTodoCompletion: (index: number) => void;
}

const TodoList: React.FC<ITodoList> = ({
  todoItems,
  handleUpdateDelete,
  handleUpdateEdit,
  handleTodoCompletion,
}) => {
  const [deletedTodo, setDeletedTodo] = useState<ITODOItem | undefined>(
    undefined
  );

  const openModal = useMemo(() => !!deletedTodo, [deletedTodo]);
  const closeModal = () => setDeletedTodo(undefined);

  return (
    <React.Fragment>
      {todoItems.length > 0 && (
        <Paper elevation={3}>
          <Box paddingX={3} paddingBottom={3}>
            <Typography variant="h6" component="h2" mt={2}>
              <ChecklistIcon />
              Your todoList
            </Typography>
            <TableContainer component={Paper}>
              <Table sx={{ border: "solid", borderColor: "lightblue" }}>
                <TableHead>
                  <TableRow
                    sx={{
                      backgroundColor: "lightblue",
                    }}
                  >
                    <TableCell align="center">Completed</TableCell>
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Todo Task</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todoItems.map((todo, index) => (
                    <TableRow key={`TodoList_todo_${todo.id}`}>
                      <TableCell align="center">
                        <Checkbox
                          checked={todo.completed}
                          onChange={() => handleTodoCompletion(index)}
                        />
                      </TableCell>
                      <TableCell align="center">{index}</TableCell>
                      <TableCell align="center">{todo.userName}</TableCell>
                      <TableCell align="center">{todo.todo}</TableCell>
                      <TableCell align="center">
                        <EditOutlinedIcon
                          onClick={() => handleUpdateEdit(todo.id)}
                        />

                        <DeleteForeverOutlinedIcon
                          onClick={() => setDeletedTodo(todo)}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      )}
      <Modal open={openModal} onClose={closeModal}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 300,
            bgcolor: "ButtonFace",
            boxShadow: 15,
            p: 3.5,
            textAlign: "center",
          }}
        >
          <Typography marginBottom={2} variant="subtitle2">
            Are you sure you want to delete the task?
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <Button
              color="warning"
              sx={{ textAlign: "center" }}
              variant="contained"
              onClick={() => {
                handleUpdateDelete(deletedTodo?.id ?? "");
                closeModal();
              }}
            >
              Yes delete it
            </Button>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
export default TodoList;
