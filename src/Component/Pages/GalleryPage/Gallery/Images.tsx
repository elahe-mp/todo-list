import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import imageData from "../Gallery/imageData.json";
import { useNavigate } from "react-router-dom";

const Images: React.FC = () => {
  const navigate = useNavigate();

  return (
    <ImageList sx={{ width: 900, height: 850 }} cols={3} gap={8}>
      {imageData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
            onClick={() => navigate(`${item.title}`)}
          />
          <ImageListItemBar title={item.title} subtitle={item.author} />
        </ImageListItem>
      ))}
    </ImageList>
  );
};

export default Images;
