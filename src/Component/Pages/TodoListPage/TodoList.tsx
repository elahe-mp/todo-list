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
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useState } from "react";

interface ITodoList {
  todoItems: { todo: string; id: number; userName: string }[];
  handleUpdateDelete: (id: number) => void;
  currentId: number;
  handleUpdateEdit: (id: number) => void;
}

const TodoList: React.FC<ITodoList> = ({
  todoItems,
  handleUpdateDelete,
  handleUpdateEdit,
}) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
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
                    <TableCell align="center">Id</TableCell>
                    <TableCell align="center">Name</TableCell>
                    <TableCell align="center">Todo Task</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {todoItems.map(
                    (inputValue: {
                      todo: string;
                      id: number;
                      userName: string;
                    }) => (
                      <TableRow key={inputValue.id}>
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
                            onClick={() => setOpenModal(true)}
                          />
                          <Modal
                            open={openModal}
                            onClose={() => setOpenModal(false)}
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
                                    setOpenModal(false);
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
    </>
  );
};
export default TodoList;
