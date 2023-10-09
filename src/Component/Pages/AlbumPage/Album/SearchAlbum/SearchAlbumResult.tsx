import { AxiosInstance } from "axios";
import IAlbum from "../../IAbum";
import React, { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

interface ISearchAlbumResult {
  selectedAlbums: IAlbum[] | null;
  jsonplaceholderAPI: AxiosInstance;
}

const SearchAlbumResult: React.FC<ISearchAlbumResult> = ({
  selectedAlbums,
  jsonplaceholderAPI,
}) => {
  const [openModal, setOpenModal] = useState(false);

  if (selectedAlbums !== null) {
    console.log("the selected album is", selectedAlbums);
  }
  const handleEditClick = (id: number) => {
    if (selectedAlbums) {
    }
  };
  const handleDeleteClick = (id: number) => {
    if (selectedAlbums) {
    }
  };

  return (
    <Paper elevation={3}>
      <Box paddingX={3} paddingBottom={3}>
        <Typography variant="h6" component="h2" mt={2} align="center">
          Your Requested Album
        </Typography>
        {selectedAlbums ? (
          <TableContainer component={Paper}>
            <Table sx={{ border: "solid", borderColor: "lightblue" }}>
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "lightblue",
                  }}
                >
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Title</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {selectedAlbums.map(
                  (selectedAlbum: { id: number; title: string }) => (
                    <TableRow key={selectedAlbum.id}>
                      <TableCell align="center">{selectedAlbum.id}</TableCell>
                      <TableCell align="center">
                        {selectedAlbum.title}
                      </TableCell>
                      <TableCell align="center">
                        <EditOutlinedIcon
                          onClick={() => handleEditClick(selectedAlbum.id)}
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
                                  handleDeleteClick(selectedAlbum.id);
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
        ) : (
          <Typography variant="body1" align="center">
            No album
          </Typography>
        )}
      </Box>
    </Paper>
  );
};
export default SearchAlbumResult;
