import React, { useEffect, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import IAlbum from "../IAbum";
import { AxiosInstance } from "axios";
import SearchAlbumResult from "./SearchAlbum/SearchAlbumResult";

interface ISearchAlbum {
  handleSearchAlbumError: (error: Error) => void;
  jsonplaceholderAPI: AxiosInstance;
}

const SearchAlbum: React.FC<ISearchAlbum> = ({
  handleSearchAlbumError,
  jsonplaceholderAPI,
}) => {
  const [shouldReset, setShouldReset] = useState(false);
  const [searchResults, setSearchResults] = useState<IAlbum[]>([]);
  const [editingAlbum, setEditingAlbum] = useState<IAlbum | null>(null);
  const [title, setTitle] = useState("");
  useEffect(() => {
    if (editingAlbum !== null) {
      setTitle(editingAlbum.title);
    }
    if (shouldReset) {
      setTitle("");
    }
  }, [editingAlbum, shouldReset]);

  const handleSearchClick = async (title: string) => {
    //edit & send data phase:
    try {
      if (editingAlbum) {
        await jsonplaceholderAPI.put(`/albums/${editingAlbum?.id}`, {
          title: title,
        });
        //update the searchReasult
        const updatedSearchResults = searchResults.map((album) =>
          album.id === editingAlbum?.id
            ? {
                ...album,
                title: title,
              }
            : album
        );
        setSearchResults(updatedSearchResults);
        setEditingAlbum(null); //turn off edit mode
      } else {
        //search phase:
        const response = await jsonplaceholderAPI.get("/albums");
        const filteredAlbums = response.data.filter((album: IAlbum) =>
          album.title.includes(title)
        );
        if (filteredAlbums.length > 0) {
          setSearchResults(filteredAlbums);
        } else {
          setSearchResults([]);
        }
        // setTitle("");
      }
      setShouldReset(true);
    } catch (error: any) {
      console.error("Error while editin or searching for album:", error);
      setShouldReset(true);
      handleSearchAlbumError(error);
    }
  };

  const handleDeleteSelectedAlbum = (deletedAlbum: IAlbum | null) => {
    if (deletedAlbum) {
      jsonplaceholderAPI
        .delete(`/albums/${deletedAlbum?.id}`)
        .then(() => {
          // console.log("selected.id is deleted:", deletedAlbum?.id);
          setSearchResults((prevResults) =>
            prevResults.filter((album) => album.id !== deletedAlbum.id)
          );
        })
        .catch((error) => {
          // console.error("Error while deleting album:", error);
        });
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };
  return (
    <>
      <Stack spacing={4} margin={2} padding={1} textAlign={"center"}>
        <Stack marginBottom={2} alignItems={"center"}>
          <TextField
            value={title}
            onChange={handleTitleChange}
            label="Album"
            placeholder="Album's name or part of it"
          />
        </Stack>

        <Stack display="block" margin={2}>
          <Button
            variant="contained"
            size="large"
            type="button"
            onClick={() => {
              handleSearchClick(title);
            }}
          >
            {editingAlbum != null ? "Edit The Album " : "Search The Album"}
          </Button>
        </Stack>
      </Stack>

      <SearchAlbumResult
        searchedAlbums={searchResults}
        handleEditAlbum={setEditingAlbum}
        handleReset={setShouldReset}
        handleDeleteSelectedAlbum={handleDeleteSelectedAlbum}
      />
    </>
  );
};

export default SearchAlbum;
