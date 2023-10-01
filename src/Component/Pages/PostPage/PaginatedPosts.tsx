import { useEffect, useState } from "react";
import Post from "./Post";
import PaginationRounded from "./PaginationRounded";

interface IPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const PaginatedPosts: React.FC = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [currentPageNo, setCurrentPageNo] = useState(1);
  const postsPerPage = 10;
  const [loadingData, setLoadingData] = useState(false);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    setLoadingData(true);
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network Response was not ok");
        }
        console.log(res);
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoadingData(false);
      })
      .catch((error) => {
        setError(error.message); //capture and store the error message
        console.log(error.message);
      });
  }, []);

  const handleUpdatePage = (inputValue: number) => {
    setCurrentPageNo(inputValue);
  };
  //Get current posts
  const indexOfLastPost = currentPageNo * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div>
      {loadingData ? (
        <p>Loading Data ... </p>
      ) : error ? (
        <div>Error: {error}</div>
      ) : (
        <>
          <Post currentPosts={currentPosts} />
          <PaginationRounded
            postsPerPage={postsPerPage}
            totalPosts={posts.length}
            handleUpdatePage={handleUpdatePage}
          />{" "}
        </>
      )}
    </div>
  );
};
export default PaginatedPosts;
