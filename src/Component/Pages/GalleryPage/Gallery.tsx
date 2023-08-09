import React from "react";
import { Container, Typography } from "@mui/material";
import Images from "./Gallery/Images";

const Gallery: React.FC = () => {
  return (
    <Container sx={{ width: 900 }}>
      <Typography variant="h3" component="h1" align="center">
        Photo Gallery
      </Typography>
      <Images />
    </Container>
  );
};

export default Gallery;
