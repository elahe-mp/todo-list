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
import React, { useEffect, useState } from "react";

interface ITodoList {
  todoItems: {
    todo: string;
    id: string;
    userName: string;
    completed: boolean;
  }[];
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
  const [openModals, setOpenModals] = useState<boolean[]>(
    new Array(todoItems.length).fill(false)
  );

  const openModal = (index: number) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = true;
    setOpenModals(newOpenModals);
  };
  const closeModal = (index: number) => {
    const newOpenModals = [...openModals];
    newOpenModals[index] = false;
    setOpenModals(newOpenModals);
  };

  useEffect(() => {
    if (todoItems.length !== openModals.length) {
      setOpenModals(new Array(todoItems.length).fill(false));
    }
  }, [todoItems, openModals.length]);

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
                    <TableCell align="center">Unique UUId</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Todo Task</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todoItems.map(
                    (
                      inputValue: {
                        todo: string;
                        id: string;
                        userName: string;
                        completed: boolean;
                      },
                      index: number
                    ) => (
                      <TableRow key={inputValue.id}>
                        <TableCell align="center">
                          <Checkbox
                            checked={inputValue.completed}
                            onChange={() => handleTodoCompletion(index)}
                          />
                        </TableCell>
                        <TableCell align="center">{inputValue.id}</TableCell>
                        <TableCell align="center">
                          {inputValue.userName}
                        </TableCell>
                        <TableCell align="center">{inputValue.todo}</TableCell>
                        <TableCell align="center">
                          <EditOutlinedIcon
                            onClick={() => handleUpdateEdit(inputValue.id)}
                          />

                          <DeleteForeverOutlinedIcon
                            onClick={() => openModal(index)}
                          />
                          <Modal
                            open={openModals[index] ?? false}
                            onClose={() => closeModal(index)}
                          >
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
                                    handleUpdateDelete(inputValue.id);
                                    closeModal(index);
                                  }}
                                >
                                  Yes delete it
                                </Button>
                              </Box>
                            </Box>
                          </Modal>
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Paper>
      )}
    </React.Fragment>
  );
};
export default TodoList;
