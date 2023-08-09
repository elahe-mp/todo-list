import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import AcUnitIcon from "@mui/icons-material/AcUnit";

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
          {/* dont forget to complete the onclick events to route to the specific pages */}
          <Button color="inherit" onClick={() => {}}>
            Home
          </Button>
          <Button color="inherit" onClick={() => {}}>
            Gallery
          </Button>
          <Button color="inherit" onClick={() => {}}>
            About Me
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
};
export default NavBar;
