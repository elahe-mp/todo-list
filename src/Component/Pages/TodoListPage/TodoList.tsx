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
} from "@mui/material";
import ChecklistIcon from "@mui/icons-material/Checklist";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { TypeFormatFlags } from "typescript";

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
                            onClick={() => handleUpdateDelete(inputValue.id)}
                          />
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
