import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useMemo } from "react";

interface IPaginationRounded {
  postsPerPage: number;
  totalPosts: number;
  handleUpdatePage: (pageNo: number) => void;
  pageNo: number;
}

const PaginationRounded: React.FC<IPaginationRounded> = ({
  postsPerPage,
  totalPosts,
  handleUpdatePage,
  pageNo,
}) => {
  //useMemo helps recalculating the data only when its dependency changes, prevents unnecessary computation on each render
  const totalPageCount = useMemo(
    () => Math.ceil(totalPosts / postsPerPage),
    [totalPosts, postsPerPage]
  );

  const handleChange = (
    e: React.ChangeEvent<unknown>,
    currentPageNo: number
  ) => {
    handleUpdatePage(currentPageNo);
    console.log("page no:", currentPageNo);
  };

  return (
    <Stack spacing={2} sx={{ marginBottom: 3, alignItems: "center" }}>
      <Pagination
        count={totalPageCount}
        page={pageNo}
        variant="outlined"
        shape="rounded"
        onChange={handleChange}
      />
    </Stack>
  );
};
export default PaginationRounded;
