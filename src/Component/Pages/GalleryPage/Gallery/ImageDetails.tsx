import { Paper, Box, Typography, Stack, Skeleton } from "@mui/material";
import imageData from "../Gallery/imageData.json";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const ImageDetails: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const { title } = useParams<{ title: string }>();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const image = imageData.find((item) => item.title === title);
  if (!image) {
    return (
      <Paper elevation={3}>
        <Box paddingX={3} paddingBottom={3}>
          return <Typography>Image not Found.</Typography>
        </Box>
      </Paper>
    );
  }
  return (
    <Stack>
      <Box
        paddingX={3}
        paddingBottom={3}
        marginTop={5}
        textAlign={"center"}
        alignSelf={"center"}
      >
        <Typography variant="h6" component="h2" mt={2}>
          {loading ? (
            <Skeleton width={900} height={600} variant="rectangular"></Skeleton>
          ) : (
            <img
              src={`${image?.img}?w=900&fit=crop&auto=format`}
              alt={image?.title}
            />
          )}
        </Typography>
      </Box>
      <Box paddingX={3} paddingBottom={3} textAlign={"center"}>
        <Typography variant="body1" component="p" mt={2}>
          Title of the photo is "{image?.title}""
        </Typography>
        <Typography variant="body2" component="p" mt={1}>
          Author is "{image?.author}"
        </Typography>
        <Typography variant="body2" component="p" mt={1}>
          Description: Lorem ipsum dolor sit amet consectetur, adipisicing elit.
          Cumque numquam ipsam nulla tempore alias, atque vero molestiae a unde
          corporis ipsum? Ratione voluptatem ipsa atque, repellendus nemo
          doloremque enim assumenda.
        </Typography>
      </Box>
    </Stack>
  );
};
export default ImageDetails;
