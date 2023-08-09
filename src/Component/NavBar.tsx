import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {
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
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/gallery">
            Gallery
          </Button>
          <Button color="inherit" component={Link} to="/about">
            About Me
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
