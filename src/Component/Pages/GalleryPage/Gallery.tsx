import React from "react";
import { Container, Typography } from "@mui/material";
import Images from "./Gallery/Images";
import { Outlet } from "react-router-dom";

const Gallery: React.FC = () => {
  return (
    <React.Fragment>
      <Container sx={{ width: 900 }}>
        <Typography variant="h3" component="h1" align="center">
          Photo Gallery
        </Typography>
        <Images />
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default Gallery;
