import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import GetAlbum from "./Album/GetAlbum";
import IAlbum from "./IAbum";
import PostAlbum from "./Album/PostAlbum";
import SearchAlbum from "./Album/SearchAlbum";

const Album: React.FC = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [action, setAction] = useState<
    "add" | "search" | "seeAlbums" | "seeAlbums" | null
  >(null);

  //creating an axios instanse
  const jsonplaceholderAPI = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  if (error) {
    return <div> Error: {(error as Error).message} </div>;
  }

  const handleAddingAlbumClick = () => {
    setAction("add");
  };

  const handleSearchAlbumClick = () => {
    setAction("search");
  };
  const handleSeeAlbumsClick = () => {
    setAction("seeAlbums");
  };

  return (
    <>
      <Typography variant="h3" component="h1" align="center">
        Album
      </Typography>
      <Typography variant="body1" component="h6" align="center">
        What do you want to do?
      </Typography>
      <Stack display="block" margin={2} textAlign={"center"}>
        <Button
          variant="contained"
          size="large"
          type="button"
          onClick={handleAddingAlbumClick}
        >
          Post a new Album
        </Button>
        <Button
          variant="contained"
          size="large"
          type="button"
          onClick={handleSearchAlbumClick}
        >
          Search an album
        </Button>
        <Button
          variant="contained"
          size="large"
          type="button"
          onClick={handleSeeAlbumsClick}
        >
          See all the albums
        </Button>
      </Stack>

      {action === "add" && (
        <PostAlbum
          handlePostAlbumError={setError}
          jsonplaceholderAPI={jsonplaceholderAPI}
        />
      )}

      {action === "search" && (
        <SearchAlbum
          jsonplaceholderAPI={jsonplaceholderAPI}
          handleSearchAlbumError={setError}
        />
      )}
      {action === "seeAlbums" && (
        <GetAlbum
          jsonplaceholderAPI={jsonplaceholderAPI}
          handleGetAlbum={setAlbums}
          handleGetAlbumError={setError}
          albums={albums}
        />
      )}
    </>
  );
};

export default Album;
