import * as React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface IPagination {
  postsPerPage: number;
  totalPosts: number;
  handleUpdatePage: (inputValue: number) => void;
}

const PaginationRounded: React.FC<IPagination> = ({
  postsPerPage,
  totalPosts,
  handleUpdatePage,
}) => {
  const handleChange = (e: React.ChangeEvent<unknown>, inputValue: number) => {
    handleUpdatePage(inputValue);
  };

  return (
    <Stack spacing={2} sx={{ marginBottom: 3, alignItems: "center" }}>
      <Pagination
        count={Math.ceil(totalPosts / postsPerPage)}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Stack>
  );
};
export default PaginationRounded;
