import React, { useEffect, useState } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
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
  const {
    control,
    getValues,
    setValue,
    reset,
    formState: { errors, isDirty },
  } = useForm<IAlbum>();

  const [shouldReset, setShouldReset] = useState(false);
  const [searchResults, setSearchResults] = useState<IAlbum[]>([]);
  const [editingAlbum, setEditingAlbum] = useState<IAlbum | null>(null);

  useEffect(() => {
    if (editingAlbum !== null) {
      setValue("title", editingAlbum.title);
    }
    if (shouldReset) {
      reset();
    }
  }, [setValue, editingAlbum, reset, shouldReset]);

  const handleSearchClick = async (title: string) => {
    //edit/send data phase:
    // if (searchResults != null && searchResults.length > 0) {
    try {
      if (editingAlbum) {
        await jsonplaceholderAPI.put(`/albums/${editingAlbum?.id}`, {
          title: title,
        });
        console.log(
          "Album edited successfully with id of:",
          editingAlbum?.id,
          ", and title of:",
          editingAlbum?.title
        );
        // setEditingAlbum(null);
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
        console.log("responce.data is", filteredAlbums);
        if (filteredAlbums.length > 0) {
          setSearchResults(filteredAlbums);
        } else {
          setSearchResults([]);
        }
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
      setSearchResults((prevResults) =>
        prevResults.filter((album) => album.id !== deletedAlbum.id)
      );
    }
  };

  return (
    <>
      <Stack spacing={4} margin={2} padding={1} textAlign={"center"}>
        <form>
          <Stack marginBottom={2} alignItems={"center"}>
            <Controller
              name="title"
              control={control}
              defaultValue=""
              rules={{
                required: { value: true, message: "This field is required" },
              }}
              render={({ field }) => (
                <TextField
                  {...field}
                  helperText={errors ? errors.title?.message : null}
                  error={!!errors.title}
                  label="Album"
                  placeholder="Album's name or part of it"
                />
              )}
            />
          </Stack>

          <Stack display="block" margin={2}>
            <Button
              variant="contained"
              size="large"
              type="button"
              disabled={!isDirty}
              onClick={() => {
                handleSearchClick(getValues("title"));
              }}
            >
              {editingAlbum != null ? "Edit The Album " : "Search The Album"}
            </Button>
          </Stack>
        </form>
      </Stack>

      <SearchAlbumResult
        searchedAlbums={searchResults}
        jsonplaceholderAPI={jsonplaceholderAPI}
        handleEditAlbum={setEditingAlbum}
        handleReset={setShouldReset}
        handleDeleteSelectedAlbum={handleDeleteSelectedAlbum}
      />
    </>
  );
};

export default SearchAlbum;
