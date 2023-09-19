import { Paper, Box, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const Post: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        // console.log(posts);
      });
  }, []);

  return (
    <Paper sx={{ margin: 5, padding: 5 }}>
      <Box paddingX={3} paddingBottom={3} maxWidth="inherit">
        {posts.map((post) => (
          <Card key={post.id} sx={{ marginBottom: 2, padding: 5 }}>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body1">{post.body}</Typography>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};
export default Post;
