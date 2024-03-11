import React, { useEffect } from "react";
import { Button, Stack, TextField, Typography } from "@mui/material";
import { AxiosInstance } from "axios";
import { Controller, useForm } from "react-hook-form";
import IAlbum from "../IAbum";

interface IPostAlbum {
  handlePostAlbumError: (error: Error) => void;
  jsonplaceholderAPI: AxiosInstance;
}

const PostAlbum: React.FC<IPostAlbum> = ({
  handlePostAlbumError,
  jsonplaceholderAPI,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
  } = useForm<IAlbum>();

  useEffect(() => {
    if (isSubmitting) {
      reset();
    }
  }, [isSubmitting, reset]);

  const onSubmit = (data: IAlbum) => {
    jsonplaceholderAPI
      .post("/albums", data)
      .then((res) => console.log(res))
      .catch((error) => handlePostAlbumError(error));
  };

  return (
    <>
      <Stack spacing={4} margin={2} padding={1} textAlign={"center"}>
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  placeholder="Enter Album's name"
                />
              )}
            />
          </Stack>

          <Stack display="block" margin={2}>
            <Button
              variant="contained"
              size="large"
              type="submit"
              disabled={!isDirty || isSubmitting}
            >
              Post
            </Button>
          </Stack>
        </form>
        {isSubmitSuccessful && (
          <Typography variant="body1" align="center">
            Your album was succussfully registered
          </Typography>
        )}
      </Stack>
    </>
  );
};

export default PostAlbum;
