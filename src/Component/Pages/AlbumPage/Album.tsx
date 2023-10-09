// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Button,
//   Card,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
// } from "@mui/material";
// import axios from "axios";
// import { Controller, useForm } from "react-hook-form";

// interface IAlbum {
//   id: number;
//   title: string;
// }

// const Album: React.FC = () => {
//   const [albums, setAlbums] = useState<IAlbum[]>([]);
//   const [error, setError] = useState(null);
//   const [action, setAction] = useState<
//     "add" | "search" | "seeAlbums" | "seeAlbums"
//   >("seeAlbums");

//   const [selectedAlbum, setSelectedAlbum] = useState<IAlbum | null>(null);

//   const {
//     control,
//     handleSubmit,
//     reset,
//     getValues,
//     formState: { errors, isDirty, isSubmitting, isSubmitSuccessful },
//   } = useForm<IAlbum>();

//   //creating an axios instanse
//   const jsonplaceholderAPI = axios.create({
//     baseURL: "https://jsonplaceholder.typicode.com",
//   });

//   useEffect(() => {
//     const getAlbums = async () => {
//       try {
//         const response = await jsonplaceholderAPI.get("/albums");
//         setAlbums(response.data);
//       } catch (error: any) {
//         setError(error);
//       }
//     };
//     getAlbums();

//     // jsonplaceholderAPI
//     //   .get("/")
//     //   .then((res) => {
//     //     // console.log(res.data);
//     //     setAlbums(res.data);
//     //   })
//     //   .catch((error) => setError(error));

//     if (isSubmitSuccessful) {
//       reset();
//     }
//   }, [isSubmitSuccessful, reset, jsonplaceholderAPI]);

//   const onSubmit = (data: IAlbum) => {
//     console.log(data);
//     jsonplaceholderAPI
//       .post("/albums", data)
//       .then((res) => console.log(res, isSubmitSuccessful))
//       .catch((error) => setError(error));
//   };

//   if (error) {
//     return <div> Error: {(error as Error).message} </div>;
//   }
//   if (!albums) {
//     return <div>"No Album!"</div>;
//   }

//   const handleAddingAlbumClick = () => {
//     setAction("add");
//   };

//   const handleSearchAlbumClick = () => {
//     setAction("search");
//     setSelectedAlbum(null);
//   };
//   const handleSeeAlbumsClick = () => {
//     setAction("seeAlbums");
//   };

//   const handleSearchClick = async (id: number, title: string) => {
//     //Is using async a better approach?->search on it
//     //How to improve the search process? Now it needs both of the fields to be written-> search on it
//     try {
//       const response = await jsonplaceholderAPI.get("/albums", {
//         params: {
//           title: title,
//           id: id,
//         },
//       });
//       setSelectedAlbum(response.data);
//     } catch (error: any) {
//       setError(error);
//     }
//     console.log("selectedAlbum", selectedAlbum);
//   };

//   const handleEditClick = () => {
//     if (selectedAlbum) {
//     }
//   };
//   const handleDeleteClick = () => {
//     if (selectedAlbum) {
//     }
//   };

//   return (
//     <>
//       <Typography variant="h3" component="h1" align="center">
//         Album
//       </Typography>
//       <Typography variant="body1" component="h6" align="center">
//         What do you want to do?
//       </Typography>
//       <Stack display="block" margin={2} textAlign={"center"}>
//         <Button
//           variant="contained"
//           size="large"
//           type="button"
//           onClick={handleAddingAlbumClick}
//         >
//           Post a new Album
//         </Button>
//         <Button
//           variant="contained"
//           size="large"
//           type="button"
//           onClick={handleSearchAlbumClick}
//         >
//           Search an album
//         </Button>
//         <Button
//           variant="contained"
//           size="large"
//           type="button"
//           onClick={handleSeeAlbumsClick}
//         >
//           See all the albums
//         </Button>
//       </Stack>
//       {action === "add" && (
//         <Stack spacing={4} margin={2} padding={1} textAlign={"center"}>
//           <form onSubmit={handleSubmit(onSubmit)}>
//             <Stack marginBottom={2} alignItems={"center"}>
//               <Controller
//                 name="title"
//                 control={control}
//                 defaultValue=""
//                 rules={{
//                   required: { value: true, message: "This field is required" },
//                 }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     helperText={errors ? errors.title?.message : null}
//                     error={!!errors.title}
//                     label="Album"
//                     placeholder="Enter Album's name"
//                   />
//                 )}
//               />
//             </Stack>

//             <Stack display="block" margin={2}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 type="submit"
//                 disabled={!isDirty || isSubmitting}
//               >
//                 Post
//               </Button>
//             </Stack>
//           </form>
//         </Stack>
//       )}
//       {action === "search" && (
//         <Stack spacing={4} margin={2} padding={1} textAlign={"center"}>
//           <form>
//             <Stack marginBottom={2} alignItems={"center"}>
//               <Controller
//                 name="id"
//                 control={control}
//                 rules={{
//                   required: { value: true, message: "This field is required" },
//                 }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     helperText={errors ? errors.id?.message : null}
//                     error={!!errors.id}
//                     label="Album id"
//                     placeholder="Enter Album's id"
//                   />
//                 )}
//               />
//             </Stack>
//             <Stack marginBottom={2} alignItems={"center"}>
//               <Controller
//                 name="title"
//                 control={control}
//                 defaultValue=""
//                 rules={{
//                   required: { value: true, message: "This field is required" },
//                 }}
//                 render={({ field }) => (
//                   <TextField
//                     {...field}
//                     helperText={errors ? errors.title?.message : null}
//                     error={!!errors.title}
//                     label="Album"
//                     placeholder="Enter Album's name"
//                   />
//                 )}
//               />
//             </Stack>

//             <Stack display="block" margin={2}>
//               <Button
//                 variant="contained"
//                 size="large"
//                 type="button"
//                 disabled={!isDirty || isSubmitting}
//                 onClick={() =>
//                   handleSearchClick(getValues("id"), getValues("title"))
//                 }
//               >
//                 Search The Album
//               </Button>
//             </Stack>
//           </form>
//         </Stack>
//       )}
//       {action === "seeAlbums" && (
//         <Paper sx={{ margin: 2, padding: 2 }}>
//           <Box paddingX={2} paddingBottom={2} maxWidth="inherit">
//             {albums.map((album) => (
//               <Card key={album.id} sx={{ marginBottom: 1, padding: 1 }}>
//                 <Typography variant="h6">{album.title}</Typography>
//               </Card>
//             ))}
//           </Box>
//         </Paper>
//       )}
//     </>
//   );
// };

// export default Album;

import React, { useState } from "react";
import { Button, Stack, Typography } from "@mui/material";
import axios from "axios";
import GetAlbum from "./Album/GetAlbum";
import IAlbum from "./IAbum";
import PostAlbum from "./Album/PostAlbum";
import SearchAlbum from "./Album/SearchAlbum";

const Album: React.FC = () => {
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [action, setAction] = useState<
    "add" | "search" | "seeAlbums" | "seeAlbums" | null
  >(null);
  const [selectedAlbum, setSelectedAlbum] = useState<IAlbum[] | null>(null);

  //creating an axios instanse
  const jsonplaceholderAPI = axios.create({
    baseURL: "https://jsonplaceholder.typicode.com",
  });

  if (error) {
    return <div> Error: {(error as Error).message} </div>;
  }

  const handleAddingAlbumClick = () => {
    setAction("add");
  };

  const handleSearchAlbumClick = () => {
    setAction("search");
    setSelectedAlbum(null);
  };
  const handleSeeAlbumsClick = () => {
    setAction("seeAlbums");
  };

  return (
    <>
      <Typography variant="h3" component="h1" align="center">
        Album
      </Typography>
      <Typography variant="body1" component="h6" align="center">
        What do you want to do?
      </Typography>
      <Stack display="block" margin={2} textAlign={"center"}>
        <Button
          variant="contained"
          size="large"
          type="button"
          onClick={handleAddingAlbumClick}
        >
          Post a new Album
        </Button>
        <Button
          variant="contained"
          size="large"
          type="button"
          onClick={handleSearchAlbumClick}
        >
          Search an album
        </Button>
        <Button
          variant="contained"
          size="large"
          type="button"
          onClick={handleSeeAlbumsClick}
        >
          See all the albums
        </Button>
      </Stack>

      {action === "add" && (
        <PostAlbum
          handlePostAlbumError={setError}
          jsonplaceholderAPI={jsonplaceholderAPI}
        />
      )}

      {action === "search" && (
        <SearchAlbum
          jsonplaceholderAPI={jsonplaceholderAPI}
          handleSearchAlbumError={setError}
          handleSelectedAlbum={setSelectedAlbum}
          selectedAlbum={selectedAlbum}
        />
      )}
      {action === "seeAlbums" && (
        <GetAlbum
          jsonplaceholderAPI={jsonplaceholderAPI}
          handleGetAlbum={setAlbums}
          handleGetAlbumError={setError}
          albums={albums}
        />
      )}
    </>
  );
};

export default Album;
