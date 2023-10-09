import React, { useEffect } from "react";
import { Box, Card, Paper, Typography } from "@mui/material";
import { AxiosInstance } from "axios";
import IAlbum from "../IAbum";

interface IGetAlbum {
  albums: IAlbum[];
  handleGetAlbum: (value: IAlbum[]) => void;
  handleGetAlbumError: (error: Error) => void;
  jsonplaceholderAPI: AxiosInstance;
}

const GetAlbum: React.FC<IGetAlbum> = ({
  handleGetAlbum,
  handleGetAlbumError,
  albums,
  jsonplaceholderAPI,
}) => {
  useEffect(() => {
    const getAlbums = async () => {
      try {
        const response = await jsonplaceholderAPI.get("/albums");
        handleGetAlbum(response.data);
      } catch (error: any) {
        handleGetAlbumError(error);
      }
    };
    getAlbums();
  }, [jsonplaceholderAPI, handleGetAlbum, handleGetAlbumError]);

  if (!albums) {
    return <div>"No Album!"</div>;
  }

  return (
    <>
      <Paper sx={{ margin: 2, padding: 2 }}>
        <Box paddingX={2} paddingBottom={2} maxWidth="inherit">
          {albums.map((album) => (
            <Card key={album.id} sx={{ marginBottom: 1, padding: 1 }}>
              <Typography variant="h6">{album.title}</Typography>
            </Card>
          ))}
        </Box>
      </Paper>
    </>
  );
};

export default GetAlbum;
