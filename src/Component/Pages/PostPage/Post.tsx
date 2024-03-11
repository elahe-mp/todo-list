import { Paper, Box, Card, Typography } from "@mui/material";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
const Post: React.FC<{ currentPosts: IPost[] }> = ({ currentPosts }) => {
  return (
    <Paper sx={{ margin: 2, padding: 2 }}>
      <Box paddingX={2} paddingBottom={2} maxWidth="inherit">
        {currentPosts.map((post) => (
          <Card key={post.id} sx={{ marginBottom: 1, padding: 1 }}>
            <Typography variant="h6">{post.title}</Typography>
            <Typography variant="body1">{post.body}</Typography>
          </Card>
        ))}
      </Box>
    </Paper>
  );
};
export default Post;
