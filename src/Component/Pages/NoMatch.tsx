import { Paper, Box, Typography } from "@mui/material";
import PriorityHighOutlinedIcon from "@mui/icons-material/PriorityHighOutlined";
const NoMatch: React.FC = () => {
  return (
    <Paper sx={{ margin: 5, padding: 5 }}>
      <Box paddingX={3} paddingBottom={3} maxWidth="inherit">
        <Typography variant="h6" component="h1">
          <PriorityHighOutlinedIcon fontSize="small" /> Page not found.
        </Typography>
      </Box>
    </Paper>
  );
};
export default NoMatch;
