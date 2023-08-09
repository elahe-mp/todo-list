import { Paper, Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Paper sx={{ margin: 5, padding: 5 }}>
      <Box paddingX={3} paddingBottom={3} maxWidth="inherit">
        <Typography variant="h6" component="h1">
          About Me
        </Typography>

        <Typography variant="body1" component="p">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
          nam, molestias temporibus soluta quod totam recusandae sequi, qui
          debitis beatae amet corporis maiores, ratione minus odit nihil?
          Eligendi, eveniet corrupti? Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Itaque quasi explicabo dolore corrupti eius enim
          exercitationem! Eaque dolores, culpa reiciendis itaque quisquam saepe
          velit eos vitae minus neque quos veniam. Lorem ipsum dolor sit amet
          consectetur, adipisicing elit. Non mollitia odit iusto nobis doloribus
          facilis id quaerat similique doloremque eligendi ratione aliquam,
          quibusdam necessitatibus adipisci distinctio harum accusamus ipsa
          atque.
        </Typography>
      </Box>
    </Paper>
  );
};
export default About;
