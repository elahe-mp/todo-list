import { Container, Box } from "@mui/material";
import TodoListPage from "../../Pages/TodoListPage";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>TodoList | MiniApp </title>
      </Helmet>
      <Container maxWidth="xl">
        <Box sx={{ marginY: 3 }}>
          <TodoListPage />
        </Box>
      </Container>
    </>
  );
};
export default Home;
