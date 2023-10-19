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
  selectedAlbums: IAlbum[] | null;
  jsonplaceholderAPI: AxiosInstance;
  handleEditAlbum: (data: IAlbum[] | null) => void;
  handleReset: (data: boolean) => void;
}

const SearchAlbumResult: React.FC<ISearchAlbumResult> = ({
  selectedAlbums,
  jsonplaceholderAPI,
  handleEditAlbum,
  handleReset,
}) => {
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
                          onClick={() => {
                            handleEditAlbum(selectedAlbums);
                            handleReset(false);
                          }}
                        />

                        <AlbumDelete
                          selectedAlbums={[selectedAlbum]}
                          selectedAlbumsId={selectedAlbum.id}
                          jsonplaceholderAPI={jsonplaceholderAPI}
                          handleSelectedAlbum={handleEditAlbum}
                        />
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
