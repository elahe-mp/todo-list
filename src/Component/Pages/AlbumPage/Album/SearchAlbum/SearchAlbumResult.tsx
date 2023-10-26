import React from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import AlbumDelete from "./SearchAlbumResult/AlbumDelete";
import IAlbum from "../../IAbum";
import { AxiosInstance } from "axios";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

interface ISearchAlbumResult {
  searchedAlbums: IAlbum[] | null;
  jsonplaceholderAPI: AxiosInstance;
  handleEditAlbum: (data: IAlbum | null) => void;
  handleReset: (data: boolean) => void;
  handleDeleteSelectedAlbum: (deletedAlbum: IAlbum) => void;
}

const SearchAlbumResult: React.FC<ISearchAlbumResult> = ({
  searchedAlbums,
  jsonplaceholderAPI,
  handleEditAlbum,
  handleReset,
  handleDeleteSelectedAlbum,
}) => {
  return (
    <Paper elevation={3}>
      <Box paddingX={3} paddingBottom={3}>
        <Typography variant="h6" component="h2" mt={2} align="center">
          Your Requested Album
        </Typography>
        {searchedAlbums === null || searchedAlbums.length === 0 ? (
          <Typography variant="body1" align="center">
            Nothing here yet.
          </Typography>
        ) : (
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
                {searchedAlbums.map(
                  (selectedAlbum: { id: number; title: string }) => (
                    <TableRow key={selectedAlbum.id}>
                      <TableCell align="center">{selectedAlbum.id}</TableCell>
                      <TableCell align="center">
                        {selectedAlbum.title}
                      </TableCell>
                      <TableCell align="center">
                        <EditOutlinedIcon
                          onClick={() => {
                            handleEditAlbum(selectedAlbum);
                            handleReset(false);
                          }}
                        />

                        <AlbumDelete
                          selectedAlbums={[selectedAlbum]}
                          selectedAlbumsId={selectedAlbum.id}
                          jsonplaceholderAPI={jsonplaceholderAPI}
                          handleDeleteSelectedAlbum={handleDeleteSelectedAlbum}
                        />
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Paper>
  );
};
export default SearchAlbumResult;
