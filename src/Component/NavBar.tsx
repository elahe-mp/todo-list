import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Link, useNavigate } from "react-router-dom";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit">
          <AcUnitIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Eli's MINI Project
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate("/gallery")}>
            Gallery
          </Button>
          <Button color="inherit" component={Link} to="/post">
            Posts
          </Button>
          <Button color="inherit" onClick={() => navigate("/album")}>
            Album
          </Button>
          {/* which one is better the above code with onclick event or the below one? */}
          <Button color="inherit" component={Link} to="/about">
            About Me
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
