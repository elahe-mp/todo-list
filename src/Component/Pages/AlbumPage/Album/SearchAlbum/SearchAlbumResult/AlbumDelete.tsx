/* eslint-disable no-template-curly-in-string */
import React, { useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import IAlbum from "../../../IAbum";
import { AxiosInstance } from "axios";

interface IAlbumDelete {
  selectedAlbums: IAlbum[] | null;
  jsonplaceholderAPI: AxiosInstance;
  handleSelectedAlbum: (data: IAlbum[] | null) => void;
  selectedAlbumsId: number;
}

const AlbumDelete: React.FC<IAlbumDelete> = ({
  selectedAlbumsId,
  selectedAlbums,
  jsonplaceholderAPI,
  handleSelectedAlbum,
}) => {
  const [openModal, setOpenModal] = useState(false);

  if (selectedAlbums !== null) {
    console.log("the selected album is", selectedAlbums);
  }

  //How to be sure that this works as the API does not allow to really delete the record?
  const handleDeleteClick = (id: number) => {
    if (selectedAlbums) {
      jsonplaceholderAPI.delete("/albums/`${id}`").then(() => {
        console.log("selected.id is deleted:", selectedAlbums);
        handleSelectedAlbum(null);
      });
    }
  };

  return (
    <>
      <DeleteForeverOutlinedIcon onClick={() => setOpenModal(true)} />
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
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
                handleDeleteClick(selectedAlbumsId);
                setOpenModal(false);
              }}
            >
              Yes delete it
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};
export default AlbumDelete;
