import React, { useMemo, useState } from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import IAlbum from "../../../IAbum";

interface IAlbumDelete {
  selectedAlbums: IAlbum[] | null;
  handleDeleteSelectedAlbum: (data: IAlbum) => void; //*
  selectedAlbumsId: number;
}

const AlbumDelete: React.FC<IAlbumDelete> = ({
  selectedAlbumsId,
  selectedAlbums,
  handleDeleteSelectedAlbum, //*
}) => {
  const [deletedAlbum, setDeletedAlbum] = useState<IAlbum[] | null>(null);
  const openModal = useMemo(() => !!deletedAlbum, [deletedAlbum]); // when there is a value in the deletedAlbum, !! shows "true" and makes openModal true which opens the modal
  const closeModal = () => setDeletedAlbum(null);

  const handleDeleteClick = (id: number) => {
    if (selectedAlbums) {
      const albumToDelete = selectedAlbums.find((album) => album.id === id);
      if (albumToDelete) {
        handleDeleteSelectedAlbum(albumToDelete);
      }
    }
  };

  return (
    <>
      <DeleteForeverOutlinedIcon
        onClick={() => setDeletedAlbum(selectedAlbums)}
      />
      {/* Modal should be called when it is needed to delete a record */}
      <Modal open={openModal} onClose={closeModal}>
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
                closeModal();
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
