import { useEffect, useState } from "react";
import Post from "./Post";
import PaginationRounded from "./PaginationRounded";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}
//the followig constants are fixed and won't be re-initialized on each component render
const startIndexInEachPage = 0;
const postsPerPage = 10;
const totalPosts = 100; // The mentioned api has 100 records of data

const PaginatedPosts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<null | string>(null);
  const [page, setPage] = useState(1); // manage the active page state

  const getPostsForEachPage = (startNo: number, postsPerPage: number) => {
    setLoadingData(true);
    fetch(
      `https://jsonplaceholder.typicode.com/posts?_start=${startNo}&_limit=${postsPerPage}`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network Response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoadingData(false);
      })
      .catch((error) => {
        setError(error.message); //capture and store the error message
      });
  };

  useEffect(() => {
    getPostsForEachPage(startIndexInEachPage, postsPerPage);
  }, []); //  Dependency array is empty to run once on initial load

  const handleUpdatePage = (pageNumber: number) => {
    const startNo = (pageNumber - 1) * postsPerPage;
    getPostsForEachPage(startNo, postsPerPage);
    setPage(pageNumber);
  };

  return (
    <div>
      {loadingData ? (
        <p>Loading Data ... </p>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <Post currentPosts={posts} />
          <PaginationRounded
            postsPerPage={postsPerPage}
            totalPosts={totalPosts}
            handleUpdatePage={handleUpdatePage}
            pageNo={page}
          />
        </>
      )}
    </div>
  );
};
export default PaginatedPosts;
