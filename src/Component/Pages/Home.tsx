import { Container, Box } from "@mui/material";
import TodoListPage from "./TodoListPage";
import { Helmet } from "react-helmet";
import React from "react";

const Home = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>TodoList | MiniApp </title>
      </Helmet>
      <Container maxWidth="xl">
        <Box sx={{ marginY: 3 }}>
          <TodoListPage />
        </Box>
      </Container>
    </React.Fragment>
  );
};
export default Home;
