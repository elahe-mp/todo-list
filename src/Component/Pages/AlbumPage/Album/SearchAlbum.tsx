import React from "react";
import { Button, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import IAlbum from "../IAbum";
import { AxiosInstance } from "axios";
import SearchAlbumResult from "./SearchAlbum/SearchAlbumResult";

interface ISearchAlbum {
  selectedAlbum: IAlbum[] | null;
  handleSearchAlbumError: (error: Error) => void;
  handleSelectedAlbum: (data: IAlbum[] | null) => void;
  jsonplaceholderAPI: AxiosInstance;
}

const SearchAlbum: React.FC<ISearchAlbum> = ({
  handleSearchAlbumError,
  handleSelectedAlbum,
  selectedAlbum,
  jsonplaceholderAPI,
}) => {
  const {
    control,
    getValues,
    formState: { errors, isDirty, isSubmitting },
  } = useForm<IAlbum>();

  const handleSearchClick = async (title: string) => {
    //Is using async a better approach?->search on it
    //How to improve the search process? Now it needs both of the fields to be written-> search on it
    try {
      const response = await jsonplaceholderAPI.get("/albums", {
        params: {
          title: title,
        },
      });
      console.log("responce.data is", response.data);
      if (Array.isArray(response.data) && response.data.length > 0) {
        handleSelectedAlbum(response.data);
      } else {
        handleSelectedAlbum(null);
      }
      // handleSelectedAlbum(response.data);
    } catch (error: any) {
      console.log("Error while searching for albums:", error);
      handleSearchAlbumError(error);
    }
    // console.log("selectedAlbum", selectedAlbum);
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
              disabled={!isDirty || isSubmitting}
              onClick={() => handleSearchClick(getValues("title"))}
            >
              Search The Album
            </Button>
          </Stack>
        </form>
      </Stack>
      {/* {selectedAlbum !== null && ( */}
      <SearchAlbumResult
        selectedAlbums={selectedAlbum}
        jsonplaceholderAPI={jsonplaceholderAPI}
      />
      {/* )} */}
    </>
  );
};

export default SearchAlbum;
