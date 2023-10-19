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
    formState: { errors, isDirty, isSubmitting },
  } = useForm<IAlbum>();

  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum[] | null>(null);
  const [shouldReset, setShouldReset] = useState(false);

  useEffect(() => {
    if (selectedAlbum !== null) {
      setValue("title", selectedAlbum[0].title); // here needs attention
    }
    if (shouldReset) {
      reset();
    }
  }, [setValue, selectedAlbum, reset, shouldReset]); // need sth to put here in the if so that when the edit button is pushed the data be shown in the form and when the  search or save button is pushed it resets.

  const handleSearchClick = async (title: string) => {
    //Is using async a better approach?->search on it
    //How to improve the search process? Now it just finds the first exact field-> search on it

    //edit/send data phase:
    if (selectedAlbum != null && selectedAlbum.length > 0) {
      try {
        await jsonplaceholderAPI.put(`/albums/${selectedAlbum[0].id}`, {
          // here needs attention
          title: title,
        }); // here there is another error
        console.log("Album edited successfully");
        setSelectedAlbum(null);
      } catch (error: any) {
        console.log("Error while editing album:", error);
      }
      setShouldReset(true);
      alert("The album was successfully registered!");
    } else {
      //search phase:
      try {
        const response = await jsonplaceholderAPI.get("/albums", {
          params: {
            title: title,
          },
        });
        console.log("responce.data is", response.data);
        if (Array.isArray(response.data) && response.data.length > 0) {
          setSelectedAlbum(response.data);
          setShouldReset(true);
        } else {
          setSelectedAlbum(null);
          setShouldReset(true);
        }
      } catch (error: any) {
        console.log("Error while searching for albums:", error);
        handleSearchAlbumError(error);
      }
      setShouldReset(true);
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
              disabled={!isDirty || isSubmitting}
              onClick={() => {
                handleSearchClick(getValues("title"));
              }}
            >
              {isSubmitting
                ? "In process"
                : selectedAlbum != null && selectedAlbum.length > 0
                ? "Edit The Album "
                : "Search The Album"}
            </Button>
          </Stack>
        </form>
      </Stack>
      {/* {selectedAlbum !== null && ( */}
      <SearchAlbumResult
        selectedAlbums={selectedAlbum}
        jsonplaceholderAPI={jsonplaceholderAPI}
        handleEditAlbum={setSelectedAlbum}
        handleReset={setShouldReset}
      />
    </>
  );
};

export default SearchAlbum;
